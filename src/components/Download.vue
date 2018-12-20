<template>
    <div class="comp-wrapper">
        <div class="columns is-vcentered">
            <div class="column is-narrow">
                <div class="has-text-weight-bold is-size-3">Download episodes</div>
            </div>
            <div class="column">
                <BTooltip label="Start download">
                    <button
                        class="button is-inverted is-primary has-background-white"
                        style="border: 0"
                        v-if="!downloadStarted"
                        @click="performDownload"
                    >
                        <BIcon pack="fa" icon="download" size="is-medium"/>
                    </button>
                </BTooltip>
            </div>
            <div class="column is-1 is-narrow">
                <div class="close-button is-pulled-right delay-1_2s animated fadeIn fast">
                    <a class="delete is-large" @click="closeWindow"></a>
                    <span class="has-text-grey-lighter has-text-weight-semibold">ESC</span>
                </div>
            </div>
        </div>
        <div class="comp-content">
            <BField
                v-for="entry in episodesToDownload"
                :key="entry.pack"
                :addons="false"
                style="margin-bottom: 20px;"
            >
                <div style="width: 100%">
                    <span
                        class="label"
                        style="display: inline-block; float: left"
                    >{{ entry.release.name + ' - ' + entry.release.episode }}</span>
                    <span
                        class="label"
                        style="display: inline-block; float: right"
                    >{{ entry.received }} MB / {{ entry.release.size }} MB</span>
                </div>

                <progress
                    :class="{ progress: true, 'is-success': entry.finished }"
                    :value="entry.progress"
                    max="100"
                >{{ entry.progress }}%</progress>
            </BField>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import log from 'electron-log';
import IrcDownloader from '../irc-downloader';

@Component
export default class Download extends Vue {
    episodesToDownload: HSReleaseDownloadInfo[] = [];
    downloadStarted = false;

    get selectedEpisodes(): HSRelease[] {
        return this.$store.state.app.selectedEpisodes;
    }

    created() {
        this.updateList();
    }

    mounted() {
        if (this.$store.state.config.autoDownload) {
            this.performDownload();
        }

        window.addEventListener('keyup', this.handleEscKey);
    }

    updateList() {
        this.episodesToDownload = [];
        this.selectedEpisodes.forEach((element: HSRelease) => {
            this.episodesToDownload.push({
                release: element,
                progress: 0,
                received: 0,
            });
        });
    }

    async performDownload() {
        this.downloadStarted = true;

        const downloadInstance = await IrcDownloader.connect(
            this.$store.state.config.downloadPath,
            this.$store.state.config.username
        );
        IrcDownloader.download(downloadInstance, this.episodesToDownload);

        downloadInstance.on(
            'xdcc-progress',
            (xdccInstance: any, received: number) => {
                const entry = this.episodesToDownload.find(
                    element =>
                        xdccInstance.xdccInfo.fileName.includes(
                            element.release.name
                        ) &&
                        xdccInstance.xdccInfo.fileName.includes(
                            element.release.episode
                        )
                );
                if (entry) {
                    entry.progress = xdccInstance.xdccInfo.progress;
                    entry.received = (received / 1024 / 1024).toFixed(0);
                }
            }
        );

        downloadInstance.on('xdcc-complete', (xdccInstance: any) => {
            const entry = this.episodesToDownload.find(
                element =>
                    xdccInstance.xdccInfo.fileName.includes(
                        element.release.name
                    ) &&
                    xdccInstance.xdccInfo.fileName.includes(
                        element.release.episode
                    )
            );
            if (entry) {
                entry.progress = 100;
                entry.received = entry.release.size;
            }
        });
    }

    handleEscKey(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.closeWindow();
        }
    }

    closeWindow() {
        window.removeEventListener('keyup', this.handleEscKey);
        this.$router.go(-1);
    }

    onCancel() {
        this.$dialog.confirm({
            title: 'Cancel download?',
            message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Fusce id fermentum quam. Proin sagittis,
                        nibh id hendrerit imperdiet, elit sapien laoreet elit,
                        ac scelerisque diam velit in nisl. Nunc maximus ex non
                        laoreet semper. Nunc scelerisque, libero sit amet pretium dignissim,
                        augue purus placerat justo,
                        sit amet porttitor dui metus in nisl.`,
            cancelText: 'Cancel',
            confirmText: 'Start',
            type: 'is-primary',
            onConfirm: () => this.performDownload(),
        });
    }
}
</script>
<style lang="scss" scoped>
.field-label {
    @extend .has-text-black;
    margin-bottom: 0.5em;
    font-weight: 600;
    display: block;
}

.comp-content {
    padding: 20px;
    overflow-y: scroll;
    height: calc(89vh - 100px);
}
</style>
