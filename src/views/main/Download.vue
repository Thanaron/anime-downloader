<template>
    <div>
        <WindowHeader title="Download episodes" closable :onClose="onClose">
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
        </WindowHeader>
        <div class="comp-content">
            <div v-for="entry in episodesToDownload" :key="entry.pack" style="margin-bottom: 20px;">
                <div style="width: 100%;">
                    <span
                        class="label"
                        style="display: inline-block; float: left"
                    >{{ entry.release.name + ' - ' + entry.release.episode }}</span>
                    <span
                        class="label"
                        style="display: inline-block; float: right;"
                    >{{ entry.received || 0 }} MB / {{ entry.release.size }} MB</span>
                </div>

                <progress
                    :class="{ 'is-success': entry.finished, 'is-danger': entry.error }"
                    class="progress"
                    :value="entry.progress"
                    max="100"
                    style="margin-right: 20px;"
                >{{ entry.progress }}%</progress>
                <div
                    style="margin-top: 5px"
                    class="is-size-6 has-text-danger"
                    v-if="entry.error"
                >{{ entry.error }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import IrcDownloader from '@/common/irc';
import generateRandomUsername from '@/common/utils/utils';
import { HSRelease, HSReleaseDownloadInfo } from '@/types/types';
import WindowHeader from '@/components/WindowHeader.vue';

@Component({
    components: { WindowHeader },
})
export default class Download extends Vue {
    downloadStarted = false;
    downloader!: IrcDownloader;
    episodesToDownload: HSReleaseDownloadInfo[] = [];

    get selectedEpisodes(): HSRelease[] {
        return this.$store.state.app.selectedEpisodes;
    }

    created() {
        if (
            !this.$store.state.config.username ||
            this.$store.state.config.username.length === 0
        ) {
            generateRandomUsername();
        }

        this.downloader = new IrcDownloader(
            this.$store.state.config.downloadPath,
            this.$store.state.config.username
        );

        this.selectedEpisodes.forEach((element: HSRelease) => {
            this.episodesToDownload.push({
                release: element,
                progress: 0,
                received: 0,
                finished: false,
                error: '',
            });
        });
    }

    mounted() {
        if (this.$store.state.config.autoDownload) {
            this.performDownload();
        }
    }

    async performDownload() {
        this.downloadStarted = true;

        await this.downloader.connect();
        this.downloader.registerGenericEvents(this.episodesToDownload);
        this.downloader.downloadAll(this.episodesToDownload);
    }

    setUsername(username: string) {
        this.$store.dispatch('set', {
            key: 'username',
            value: username,
        });
    }

    onClose() {
        if (this.downloadStarted) {
            this.$dialog.confirm({
                title: 'Cancel download?',
                message: `You are about to close the download window while a download is still active. Do you want to continue?`,
                cancelText: 'Cancel',
                confirmText: 'Continue',
                type: 'is-primary',
                onConfirm: () => {
                    this.downloadStarted = false;
                    this.onClose();
                },
            });
        }

        if (this.downloader && this.downloader.isConnected) {
            this.downloader.disconnect();
        }
    }
}
</script>
<style lang="scss" scoped>
.comp-content {
    height: calc(100vh - 170px);
    box-sizing: border-box;
    overflow-y: auto;
    padding: 10px;
}

.progress {
    margin-bottom: 0 !important;
}
</style>
