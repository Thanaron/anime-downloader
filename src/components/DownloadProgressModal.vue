<template>
    <BModal active has-modal-card :can-cancel="allowedCloseOperations" :on-cancel="closeModal">
        <div class="modal-card">
            <header class="modal-card-head">
                <div class="modal-card-title">Downloading episodes</div>
            </header>
            <section class="modal-card-body">
                <BField v-for="entry in episodesToDownload" :key="entry.pack" :addons="false">
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
                        :class="{ progress: true, 'is-small': true, 'is-success': entry.finished }"
                        :value="entry.progress"
                        max="100"
                    >{{ entry.progress }}%</progress>
                </BField>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="cancelDownloads">Cancel</button>
                <button
                    class="button is-primary"
                    v-if="!allFinished"
                    :disabled="downloadStarted"
                    @click="performDownload"
                >Start</button>
                <button class="button is-primary" v-else @click="closeModal">OK</button>
            </footer>
        </div>
    </BModal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import IrcDownloader from '../irc-downloader';

@Component
export default class DownloadProgressModal extends Vue {
    @Prop(Array) list!: HSRelease[];
    episodesToDownload: HSReleaseDownloadInfo[] = [];
    downloadStarted = false;
    allowedCloseOperations = ['x', 'outside', 'escape'];

    created() {
        this.list.forEach((element: any) => {
            this.episodesToDownload.push({
                release: element,
                progress: 0,
                received: 0,
                finished: false,
            });
        });
    }

    get allFinished(): boolean {
        return this.episodesToDownload.every(element => element.finished);
    }

    mounted() {
        if (this.$store.state.autoDownload) {
            this.performDownload();
        }
    }

    async performDownload() {
        this.downloadStarted = true;
        this.allowedCloseOperations = [];

        const downloader = new IrcDownloader(
            this.episodesToDownload,
            this.$store.state.downloadPath,
            this.$store.state.username
        );
        await downloader.connect();
        downloader.download();

        downloader.instance.on(
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

        downloader.instance.on('xdcc-complete', (xdccInstance: any) => {
            const entry: any = this.episodesToDownload.find(
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
                entry.received = entry.size;
                entry.finished = true;
            }

            if (this.allFinished) {
                this.allowedCloseOperations = ['x', 'outside', 'escape'];
            }
        });
    }
    cancelDownloads() {
        // todo
        this.closeModal();
    }

    closeModal() {
        (this.$parent as any).close();
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
</style>
