<template>
    <b-modal active has-modal-card>
        <div class="modal-card">
            <header class="modal-card-head">
                <div class="modal-card-title">Downloading episodes</div>
            </header>
            <section class="modal-card-body">
                <b-field v-for="entry in downloadList" :label="entry.name" :key="entry.name">
                    <progress
                        :class="{ progress: true, 'is-small': true, 'is-success': entry.finished }"
                        :value="entry.progress"
                        max="100"
                    >{{entry.progress}}%</progress>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="cancelDownloads">Cancel</button>
                <button class="button is-primary" :disabled="!allFinished" @click="closeModal">OK</button>
            </footer>
        </div>
    </b-modal>
</template>

<script>
import Downloader from '../xdcc';

export default {
    name: 'DownloadModal',
    props: ['list'],
    data() {
        return {
            downloadList: [],
        };
    },
    created() {
        this.list.forEach(element => {
            this.downloadList.push({
                name: element.filename,
                progress: 0,
                finished: false,
            });
        });
    },
    computed: {
        allFinished() {
            return this.downloadList.every(
                element => element.finished === true
            );
        },
    },
    mounted() {
        this.performDownload();
    },
    methods: {
        async performDownload() {
            const downloader = new Downloader(this.list);
            await downloader.connect();
            downloader.download();

            downloader.instance.on(
                'xdcc-progress',
                (xdccInstance, received) => {
                    const entry = this.downloadList.find(
                        element =>
                            element.name === xdccInstance.xdccInfo.fileName
                    );
                    entry.progress = xdccInstance.xdccInfo.progress;
                }
            );

            downloader.instance.on('xdcc-complete', xdccInstance => {
                const entry = this.downloadList.find(
                    element => element.name === xdccInstance.xdccInfo.fileName
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
