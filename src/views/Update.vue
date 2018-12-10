<template>
    <BModal :can-cancel="['escape']" active has-modal-card style="background-color: transparent">
        <div class="modal-card modal-window">
            <header class="modal-card-head click-on" style="-webkit-app-region: drag">
                <div class="modal-card-title click-on">Update available - {{ version }}</div>
                <a
                    @click="cancelUpdate"
                    class="delete is-medium click-on"
                    style="-webkit-app-region: no-drag"
                />
            </header>
            <section class="modal-card-body click-on">
                <div class="content" v-html="notes"/>
                <progress
                    :class="{ progress: true, 'is-small': true, 'is-success': downloaded }"
                    :value="progress"
                    v-if="progress > 0"
                    max="100"
                >{{ progress }}%</progress>
            </section>
            <footer class="modal-card-foot click-on">
                <button @click="skipUpdate" class="button" type="button">Skip update</button>
                <button
                    @click="downloadUpdate"
                    class="button is-primary"
                    v-if="!downloaded"
                >Download</button>
                <button @click="installUpdate" class="button is-primary" v-else>Quit and Install</button>
            </footer>
        </div>
    </BModal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { remote, ipcRenderer } from 'electron';

const TransparencyMouseFix = require('electron-transparency-mouse-fix');

@Component
export default class Update extends Vue {
    version: string = '';
    notes: string = '';
    progress: number = 0;
    downloaded: boolean = false;

    mounted() {
        const bg = document.getElementsByClassName('modal-background')[0]!;
        bg.parentElement!.removeChild(bg);

        ipcRenderer.on('updateInfo', (event: any, info: any) => {
            this.version = info.version;
            this.notes = info.notes;
        });

        ipcRenderer.on(
            'updateDownloadProgress',
            (event: any, progress: any) => {
                this.progress = progress;
            }
        );

        ipcRenderer.on('updateDownloaded', () => {
            this.progress = 100;
            this.downloaded = true;
        });

        const fix = new TransparencyMouseFix({
            electronWindow: remote.getCurrentWindow(),
            log: true,
            fixPointerEvents: 'auto',
        });
    }

    /* eslint-disable */

    beforeCreate() {
        document.body.className = 'click-through';
        document.documentElement.style.backgroundColor = 'transparent';
    }

    cancelUpdate() {
        remote.getCurrentWindow().close();
    }

    downloadUpdate() {
        ipcRenderer.send('downloadUpdate');
    }

    installUpdate() {
        ipcRenderer.send('installUpdate');
    }

    skipUpdate() {
        ipcRenderer.send('openMainWindow');
    }

    /* eslint-enable */
}
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
