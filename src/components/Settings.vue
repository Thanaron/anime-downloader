<template>
    <div class="comp-wrapper">
        <div class="columns">
            <div class="column">
                <div class="has-text-weight-bold is-size-3">Settings</div>
            </div>
            <div class="column is-1 is-narrow">
                <div class="close-button delay-1_2s animated fadeIn fast">
                    <a class="delete is-large" @click="closeWindow"></a>
                    <span class="has-text-grey-lighter has-text-weight-semibold">ESC</span>
                </div>
            </div>
        </div>
        <div class="comp-content">
            <div class="columns is-8">
                <div class="column">
                    <p
                        class="has-text-weight-semibold is-size-5"
                        style="margin-bottom: 15px"
                    >Application</p>
                    <BField>
                        <BCheckbox v-model="autoDownload">Automatically start downloading</BCheckbox>
                    </BField>
                    <BField label="Download path"/>
                    <BField>
                        <BInput expanded v-model="downloadPath"/>
                    </BField>
                    <hr>
                    <p
                        class="has-text-weight-semibold is-size-5"
                        style="margin-bottom: 15px"
                    >Updates</p>
                    <BField>
                        <BCheckbox disabled v-model="autoCheckUpdate">Check for updates on startup</BCheckbox>
                    </BField>
                </div>
                <div class="column">
                    <p class="has-text-weight-semibold is-size-5" style="margin-bottom: 15px">Search</p>
                    <div style="margin-bottom: 10px">
                        <BField label="General">
                            <BTooltip
                                multilined
                                label="Disable if you want to choose the bot to download from"
                            >
                                <BCheckbox
                                    v-model="uniqueEpisodesOnly"
                                >Only show one result per episode</BCheckbox>
                            </BTooltip>
                        </BField>
                    </div>
                    <div>
                        <BField label="Visible columns">
                            <BCheckbox
                                v-model="visibleColumns"
                                :disabled="!uniqueEpisodesOnly"
                                native-value="bot"
                            >Bot</BCheckbox>
                        </BField>
                        <BField>
                            <BCheckbox v-model="visibleColumns" native-value="name">Name</BCheckbox>
                        </BField>
                        <BField>
                            <BCheckbox v-model="visibleColumns" native-value="episode">Episode</BCheckbox>
                        </BField>
                        <BField>
                            <BCheckbox v-model="visibleColumns" native-value="resolution">Resolution</BCheckbox>
                        </BField>
                        <BField>
                            <BCheckbox v-model="visibleColumns" native-value="pack">Pack</BCheckbox>
                        </BField>
                        <BField>
                            <BCheckbox v-model="visibleColumns" native-value="size">Size</BCheckbox>
                        </BField>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { AnyTxtRecord } from 'dns';

@Component
export default class Settings extends Vue {
    get visibleColumns(): string[] {
        return this.$store.state.config.visibleColumns;
    }
    set visibleColumns(value) {
        if (value.length === 0) {
            return;
        }
        this.updateItem('visibleColumns', value);
    }

    get autoDownload(): boolean {
        return this.$store.state.config.autoDownload;
    }

    set autoDownload(value) {
        this.updateItem('autoDownload', value);
    }

    get autoCheckUpdate(): boolean {
        return this.$store.state.config.autoCheckUpdate;
    }

    set autoCheckUpdate(value) {
        this.updateItem('autoCheckItem', value);
    }

    get uniqueEpisodesOnly(): boolean {
        return this.$store.state.config.uniqueEpisodesOnly;
    }
    set uniqueEpisodesOnly(value) {
        if (!value && !this.visibleColumns.includes('bot')) {
            this.visibleColumns.push('bot');
            this.updateItem('visibleColumns', this.visibleColumns);
        } else if (value && this.visibleColumns.includes('bot')) {
            const index = this.visibleColumns.indexOf('bot');
            this.visibleColumns.splice(index, 1);
            this.updateItem('visibleColumns', this.visibleColumns);
        }
        this.updateItem('uniqueEpisodesOnly', value);
    }

    get downloadPath(): string {
        return this.$store.state.config.downloadPath;
    }
    set downloadPath(value) {
        this.updateItem('downloadPath', value);
    }

    mounted() {
        window.addEventListener('keyup', this.handleEscKey);
    }

    updateItem(key: string, value: any) {
        this.$store.dispatch('set', { key, value });
    }

    handleEscKey(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.closeWindow();
        }
    }

    closeWindow() {
        window.removeEventListener('keyup', this.handleEscKey);
        this.$router.go(-1);
    }
}
</script>
<style>
.close-button {
    width: 32px;
    text-align: center;
}

.close-button > span {
    font-size: 11px;
}

.comp-wrapper {
    padding: 20px;
}

.comp-content {
    padding: 20px;
    overflow-y: scroll;
    height: calc(91vh - 100px);
}

.animated.delay-1_2s {
    animation-delay: 0.5s;
}
</style>
