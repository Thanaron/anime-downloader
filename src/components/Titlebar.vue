<template>
    <header id="titlebar">
        <div id="drag-region">
            <div id="window-title">
                <span>HS Downloader - {{ version }}</span>
            </div>
            <div id="window-controls">
                <div class="win-button" id="min-button">
                    <span>&#xE921;</span>
                </div>
                <div class="win-button" id="max-button">
                    <span>&#xE922;</span>
                </div>
                <div class="win-button" id="restore-button">
                    <span>&#xE923;</span>
                </div>
                <div class="win-button" id="close-button">
                    <span>&#xE8BB;</span>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
const { app } = require('electron').remote;
require('../renderer');

export default {
    data() {
        return {
            version: app.getVersion(),
        };
    },
};
</script>
<style lang="scss" scoped>
#titlebar {
    display: block;
    position: fixed;
    height: 32px;
    width: 100%;
    padding: 4px;
    @extend .has-text-black;
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

#window-controls .win-button:hover {
    background: rgba($grey-darker, 0.2);
    opacity: 1;
}
#window-controls #close-button:hover {
    @extend .has-background-danger;
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
