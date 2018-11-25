<template>
     <b-modal active has-modal-card :canCancel="['escape']" style="background-color: transparent">
        <div class="modal-card modal-window">
                <header class="modal-card-head click-on" style="-webkit-app-region: drag">
                    <div class="modal-card-title click-on">Update available - {{ version }}</div>
                    <a class="delete is-medium click-on" style="-webkit-app-region: no-drag" @click="cancelUpdate"></a>
                </header>
                <section class="modal-card-body click-on">
                    <div class="content" v-html="notes" />
                </section>
                <footer class="modal-card-foot click-on">
                    <button class="button" type="button" @click="cancelUpdate">Cancel</button>
                    <button class="button is-primary" v-if="!downloaded" @click="downloadUpdate">Download</button>
                    <button class="button is-primary" v-else @click="installUpdate">Quit and Install</button>
                </footer>
            </div>
    </b-modal>
</template>

<script>
const TransparencyMouseFix = require('electron-transparency-mouse-fix');
const { remote, ipcRenderer } = require('electron');

export default {
    name: 'UpdateModal',
    beforeCreate() {
        document.body.className = 'click-through';
        document.documentElement.style = 'background-color: transparent';
    },
    data() {
        return {
            version: '',
            notes: '',
            progress: 0,
            downloaded: false,
        };
    },
    mounted() {
        const bg = document.getElementsByClassName('modal-background')[0];
        bg.parentElement.removeChild(bg);

        ipcRenderer.on('updateInfo', (event, info) => {
            this.version = info.version;
            this.notes = info.notes;
        });

        ipcRenderer.on('updateDownloadProgress', (event, progress) => {
            this.progress = progress;
        });

        ipcRenderer.on('updateDownloaded', () => {
            this.progress = 100;
            this.downloaded = true;
        });

        const fix = new TransparencyMouseFix({
            electronWindow: remote.getCurrentWindow(),
            log: true,
            fixPointerEvents: 'auto',
        });
    },
    methods: {
        cancelUpdate() {
            remote.getCurrentWindow().close();
        },
        downloadUpdate() {
            ipcRenderer.send('downloadUpdate');
        },
        installUpdate() {
            ipcRenderer.send('installUpdate');
        },
    },
};
</script>
<style>
.click-on {
    pointer-events: all;
}
.click-through {
    pointer-events: none;
}

.modal-window {
    box-shadow: 2px 2px 15px 1px rgba(0, 0, 0, 0.75);
    border-radius: 6px;
}
</style>
