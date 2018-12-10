<template>
    <BModal active has-modal-card :on-cancel="closeModal" :can-cancel="['x', 'outside', 'escape']">
        <div class="modal-card">
            <header class="modal-card-head">
                <div class="modal-card-title">Settings</div>
            </header>
            <section class="modal-card-body">
                <div class="columns">
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
                            <BCheckbox
                                disabled
                                v-model="autoCheckUpdate"
                            >Check for updates on startup</BCheckbox>
                        </BField>
                    </div>
                    <div class="column">
                        <p
                            class="has-text-weight-semibold is-size-5"
                            style="margin-bottom: 15px"
                        >Search</p>
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
                                <BCheckbox
                                    v-model="visibleColumns"
                                    native-value="resolution"
                                >Resolution</BCheckbox>
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
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="closeModal">Close</button>
            </footer>
        </div>
    </BModal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class SettingsModal extends Vue {
    get visibleColumns(): string[] {
        return this.$store.state.visibleColumns;
    }
    set visibleColumns(value) {
        if (value.length === 0) {
            return;
        }
        this.updateItem('visibleColumns', value);
    }

    get autoDownload(): boolean {
        return this.$store.state.autoDownload;
    }

    set autoDownload(value) {
        this.updateItem('autoDownload', value);
    }

    get autoCheckUpdate(): boolean {
        return this.$store.state.autoCheckUpdate;
    }

    set autoCheckUpdate(value) {
        this.updateItem('autoCheckItem', value);
    }

    get uniqueEpisodesOnly(): boolean {
        return this.$store.state.uniqueEpisodesOnly;
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
        return this.$store.state.downloadPath;
    }
    set downloadPath(value) {
        this.updateItem('downloadPath', value);
    }

    closeModal() {
        (this.$parent as any).close();
    }

    updateItem(key: string, value: any) {
        this.$store.dispatch('set', { key, value });
    }
}
</script>
