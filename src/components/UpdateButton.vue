<template>
    <div>
        <BTooltip
            v-if="updateAvailable && isDownloading"
            active
            position="is-left"
            :label="`Downloading update: ${progress}%`"
            size="is-small"
        >
            <a
                class="button is-primary is-inverted has-background-white is-medium is-paddingless"
                :class="{downloading: isDownloading}"
                style="border: 0"
            >
                <BIcon pack="fas" icon="sync-alt" size="is-small"/>
            </a>
        </BTooltip>
        <BTooltip
            v-else-if="updateAvailable && !isDownloading"
            active
            position="is-left"
            label="Click to install update"
            size="is-small"
        >
            <a
                class="button is-primary is-inverted has-background-white is-medium is-paddingless"
                :class="{downloading: isDownloading}"
                style="border: 0"
                @click="showInstallDialog"
            >
                <BIcon pack="fas" icon="exclamation-circle" size="is-small"/>
            </a>
        </BTooltip>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { remote, ipcRenderer } from 'electron';

@Component
export default class UpdateButton extends Vue {
    updateAvailable: boolean = false;
    isDownloading: boolean = false;

    version: string = '';
    releaseNotes: string = '';
    progress: number = 0;

    mounted() {
        ipcRenderer.on('updateAvailable', (event: any, info: any) => {
            console.log('updateAvailable');
            this.version = info.version;
            this.releaseNotes = info.notes;
            this.isDownloading = true;
            this.updateAvailable = true;
        });

        ipcRenderer.on(
            'updateDownloadProgress',
            (event: any, progress: any) => {
                this.progress = progress;
            }
        );

        ipcRenderer.on('updateDownloaded', () => {
            this.progress = 100;
            this.isDownloading = false;
        });
    }

    showInstallDialog() {
        this.$dialog.confirm({
            title: `Install update ${this.version}`,
            message: `<div class="content">${this.releaseNotes}</div>`,
            cancelText: 'Cancel',
            confirmText: 'Install',
            type: 'is-primary',
            onConfirm: () => ipcRenderer.send('installUpdate'),
        });
    }
}
</script>
<style scoped>
.downloading {
    animation-name: rotate;
    animation-duration: 4000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.tooltip:after {
    padding: 2px 6px !important;
}

.dialog .modal-card {
    max-width: 75% !important;
    max-height: calc(100vh - 100px) !important;
}
</style>
