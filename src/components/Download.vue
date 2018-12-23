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
                    >{{ entry.received || 0 }} MB / {{ entry.release.size }} MB</span>
                </div>

                <progress
                    :class="{ 'is-success': entry.finished, 'is-danger': entry.error }"
                    class="progress"
                    :value="entry.progress"
                    max="100"
                >{{ entry.progress }}%</progress>
                <div
                    style="margin-top: 5px"
                    class="is-size-6 has-text-danger"
                    v-if="entry.error"
                >{{ entry.error }}</div>
            </BField>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import IrcDownloader from '../irc-downloader';
import generateRandomUsername from '../utils/utils';
import { HSRelease, HSReleaseDownloadInfo } from '../types/types';

const log = require('electron-log');

@Component
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

        window.addEventListener('keyup', this.handleEscKey);
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

    handleEscKey(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.closeWindow();
        }
    }

    closeWindow() {
        window.removeEventListener('keyup', this.handleEscKey);
        if (this.downloader && this.downloader.isConnected) {
            this.downloader.disconnect();
        }

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

.progress {
    margin-bottom: 0 !important;
}
</style>
