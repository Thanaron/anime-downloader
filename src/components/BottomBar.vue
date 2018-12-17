<template>
    <div class="columns">
        <div class="column">
            <a
                class="button is-primary is-inverted has-background-white download-button"
                style="border: 0"
                @click="openSettings"
            >
                <BIcon pack="fas" icon="cog" size="is-small"/>
            </a>
        </div>
        <div class="column">
            <p class="status-text">{{statusText}}</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SettingsModal from './SettingsModal.vue';

@Component
export default class BottomBar extends Vue {
    get statusText() {
        return this.$store.state.statusText;
    }

    openSettings() {
        this.$modal.open({
            parent: this,
            component: SettingsModal,
            hasModalCard: true,
        });
    }
}
</script>
<style lang="scss">
.download-button {
    position: fixed;
    bottom: 20px;
    left: -4px;
}

.status-text {
    position: fixed;
    bottom: 4px;
    right: 5px;
    font-size: 12px;
}
</style>
