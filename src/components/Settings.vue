<template>
    <div>
        <div class="columns">
            <div class="column">
                <div class="has-text-weight-bold is-size-3">Settings</div>
            </div>
            <div class="column is-1 is-narrow">
                <div class="close-button is-pulled-right">
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
                    <BField label="Download path">
                        <BInput expanded v-model="downloadPath"/>
                    </BField>
                    <BField label="Theme">
                        <BSelect expanded v-model="selectedTheme">
                            <option
                                v-for="theme in availableThemes"
                                :key="theme.name"
                                :value="theme"
                            >{{ theme.name }}</option>
                        </BSelect>
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
                                v-model="bot"
                                :disabled="!uniqueEpisodesOnly"
                                native-value="bot"
                            >Bot</BCheckbox>
                        </BField>
                        <BField>
                            <BCheckbox v-model="name" native-value="name">Name</BCheckbox>
                        </BField>
                        <BField>
                            <BCheckbox v-model="episode" native-value="episode">Episode</BCheckbox>
                        </BField>
                        <BField>
                            <BCheckbox v-model="resolution" native-value="resolution">Resolution</BCheckbox>
                        </BField>
                        <BField>
                            <BCheckbox v-model="pack" native-value="pack">Pack</BCheckbox>
                        </BField>
                        <BField>
                            <BCheckbox v-model="size" native-value="size">Size</BCheckbox>
                        </BField>
                    </div>
                </div>
            </div>
            <div class="columns is-8" v-if="showAdvanced">
                <div class="column">
                    <p
                        class="has-text-weight-semibold is-size-5"
                        style="margin-bottom: 15px"
                    >Advanced</p>
                    <BField :label="`Current: ${username}`">
                        <Button
                            class="button is-primary"
                            @click="generateUsername"
                        >Generate username</Button>
                    </BField>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import generateRandomUsername from '../utils/utils';
import { Theme, ConfigState } from '../types/types';
import ApplicationTheme from '../theme';

const { mapFields } = require('vuex-map-fields');

@Component({
    computed: {
        ...mapFields('config', [
            'username',
            'autoDownload',
            'uniqueEpisodesOnly',
            'downloadPath',
            'autoCheckUpdate',
            'visibleColumns.bot',
            'visibleColumns.name',
            'visibleColumns.episode',
            'visibleColumns.resolution',
            'visibleColumns.pack',
            'visibleColumns.size',
            'availableThemes',
            'selectedTheme',
        ]),
    },
})
export default class Settings extends Vue {
    showAdvanced: boolean = false;
    availableThemes!: Theme[];

    @Watch('selectedTheme')
    /* eslint-disable-next-line */
    onThemeChanged(newTheme: Theme, oldTheme: Theme) {
        ApplicationTheme.set(newTheme);
    }

    mounted() {
        window.addEventListener('keyup', this.handleEscKey);
        window.addEventListener('keyup', this.toggleAdvanced);

        this.loadThemes();
    }

    loadThemes() {
        this.availableThemes = ApplicationTheme.getAvailableThemes();
    }

    /* eslint-disable-next-line */
    generateUsername() {
        generateRandomUsername();
    }

    handleEscKey(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.closeWindow();
        }
    }

    toggleAdvanced(event: KeyboardEvent) {
        if (event.keyCode === 85 && event.ctrlKey) {
            this.showAdvanced = !this.showAdvanced;
        }
    }

    closeWindow() {
        this.$store.dispatch('config/setSettings');
        window.removeEventListener('keyup', this.handleEscKey);
        window.removeEventListener('keyup', this.toggleAdvanced);
        this.$router.go(-1);
    }
}
</script>
<style scoped>
.close-button {
    width: 32px;
    text-align: center;
}

.close-button > span {
    font-size: 11px;
}

.comp-content {
    height: calc(100vh - 170px);
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
