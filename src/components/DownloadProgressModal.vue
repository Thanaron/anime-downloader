<template>
    <b-modal active has-modal-card>
        <div class="modal-card">
            <header class="modal-card-head">
                <div class="modal-card-title">Downloading episodes</div>
            </header>
            <section class="modal-card-body">
                <b-field
                    v-for="entry in downloadList"
                    :label="entry.name + ' - ' + entry.episode"
                    :key="entry.pack"
                >
                    <progress
                        :class="{ progress: true, 'is-small': true, 'is-success': entry.finished }"
                        :value="entry.progress"
                        max="100"
                    >{{entry.progress}}%</progress>
                </b-field>
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
    </b-modal>
</template>

<script>
import IrcDownloader from '../irc-downloader';

export default {
    name: 'DownloadProgressModal',
    props: ['list'],
    data() {
        return {
            episodesToDownload: [],
            downloadStarted: false,
        };
    },
    created() {
        this.list.forEach(element => {
            this.downloadList.push({
                bot: element.bot,
                name: element.name,
                episode: element.episode,
                size: element.size,
                pack: element.pack,
                progress: 0,
                finished: false,
            });
        });
    },
    computed: {
        allFinished() {
            return this.episodesToDownload.every(
                element => element.finished === true
            );
        },
    },
    methods: {
        async performDownload() {
            this.downloadStarted = true;
            const downloader = new IrcDownloader(this.episodesToDownload);
            await downloader.connect();
            downloader.download();

            downloader.instance.on('xdcc-progress', xdccInstance => {
                const entry = this.episodesToDownload.find(
                    element =>
                        xdccInstance.xdccInfo.fileName.includes(element.name) &&
                        xdccInstance.xdccInfo.fileName.includes(element.episode)
                );
                entry.progress = xdccInstance.xdccInfo.progress;
            });

            downloader.instance.on('xdcc-complete', xdccInstance => {
                const entry = this.episodesToDownload.find(
                    element =>
                        xdccInstance.xdccInfo.fileName.includes(element.name) &&
                        xdccInstance.xdccInfo.fileName.includes(element.episode)
                );
                entry.progress = 100;
                entry.finished = true;
            });
        },
        cancelDownloads() {
            this.closeModal();
        },
        closeModal() {
            this.$parent.close();
        },
    },
};
</script>
