<template>
    <div :class="{'fade-anim': loadingTheme}">
        <WindowHeader title="Settings" :onClose="onClose"/>
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
                    <BField label="Log level">
                        <BSelect v-model="logLevel">
                            <option value="debug">Debug</option>
                            <option value="info">Info</option>
                            <option value="warn">Warn</option>
                            <option value="error">Error</option>
                        </BSelect>
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
import { mapFields } from 'vuex-map-fields';
import generateRandomUsername from '@/common/utils/utils';
import { Theme, ConfigState } from '@/types/types';
import ApplicationTheme from '@/common/theme';
import WindowHeader from '@/components/WindowHeader.vue';
import { setLevel } from '@/common/utils/logger';

@Component({
    components: { WindowHeader },
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
            'selectedTheme',
            'logLevel',
        ]),
    },
})
export default class Settings extends Vue {
    showAdvanced: boolean = false;
    availableThemes: Theme[] = [];
    loadingTheme: boolean = false;

    @Watch('selectedTheme')
    /* eslint-disable-next-line */
    onThemeChanged(newTheme: Theme, oldTheme: Theme) {
        this.loadingTheme = true;
        setTimeout(() => {
            ApplicationTheme.set(newTheme);
            setTimeout(() => {
                this.loadingTheme = false;
            }, 500);
        }, 500);
    }

    @Watch('logLevel')
    /* eslint-disable-next-line */
    onLogLevelChanged(newLevel: string, oldLevel: string) {
        setLevel(newLevel);
    }

    mounted() {
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

    toggleAdvanced(event: KeyboardEvent) {
        if (event.keyCode === 85 && event.ctrlKey) {
            this.showAdvanced = !this.showAdvanced;
        }
    }

    onClose() {
        this.$store.dispatch('config/setSettings');
        window.removeEventListener('keyup', this.toggleAdvanced);
    }
}
</script>
<style scoped>
.comp-content {
    height: calc(100vh - 170px);
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
}

.fade-anim {
    animation-name: fade;
    animation-duration: 1s;
}

@keyframes fade {
    0% {
        opacity: 1;
    }
    40% {
        opacity: 0;
    }
    60% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
