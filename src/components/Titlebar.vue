<template>
    <header id="titlebar" class="has-text-black">
        <div id="drag-region">
            <div id="window-title">
                <span>HS Downloader - {{ version }}</span>
            </div>
            <div id="window-controls">
                <div class="win-button" ref="minButton" id="min-button" @click="minimize">
                    <span>&#xE921;</span>
                </div>
                <div class="win-button" ref="maxButton" id="max-button" @click="maximize">
                    <span>&#xE922;</span>
                </div>
                <div class="win-button" ref="restoreButton" id="restore-button" @click="restore">
                    <span>&#xE923;</span>
                </div>
                <div class="win-button" ref="closeButton" id="close-button" @click="close">
                    <span>&#xE8BB;</span>
                </div>
            </div>
        </div>
    </header>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const { app, getCurrentWindow } = require('electron').remote;

@Component
export default class Titlebar extends Vue {
    private version: string = app.getVersion();
    private window = getCurrentWindow();

    $refs!: {
        maxButton: HTMLElement;
        restoreButton: HTMLElement;
    };

    mounted() {
        this.toggleMaxRestoreButtons();
        this.window.on('maximize', this.toggleMaxRestoreButtons);
        this.window.on('unmaximize', this.toggleMaxRestoreButtons);
    }

    minimize() {
        this.window.minimize();
    }

    maximize() {
        this.window.maximize();
        this.toggleMaxRestoreButtons();
    }

    restore() {
        this.window.unmaximize();
        this.toggleMaxRestoreButtons();
    }

    close() {
        this.window.close();
    }

    toggleMaxRestoreButtons() {
        if (this.window.isMaximized()) {
            this.$refs.maxButton.style.display = 'none';
            this.$refs.restoreButton.style.display = 'flex';
        } else {
            this.$refs.restoreButton.style.display = 'none';
            this.$refs.maxButton.style.display = 'flex';
        }
    }
}
</script>
<style lang="scss" scoped>
#titlebar {
    display: block;
    position: fixed;
    height: 32px;
    width: 100%;
    padding: 4px;
}

#titlebar #drag-region {
    width: 100%;
    height: 100%;
    -webkit-app-region: drag;
    display: grid;
    grid-template-columns: auto 138px;
}

#window-controls {
    display: grid;
    grid-template-columns: repeat(3, 46px);
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    font-family: 'Segoe MDL2 Assets';
    font-size: 10px;
    -webkit-app-region: no-drag;
}
#window-controls .win-button {
    grid-row: 1 / span 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    user-select: none;
    cursor: default;
    opacity: 0.8;
}
#window-controls #min-button {
    grid-column: 1;
}
#window-controls #max-button,
#window-controls #restore-button {
    grid-column: 2;
}
#window-controls #close-button {
    grid-column: 3;
}

#window-controls #restore-button {
    display: none;
}

#window-title {
    grid-column: 1;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 400;
    margin-left: 8px;
    overflow-x: hidden;
}
#window-title span {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
}
</style>
