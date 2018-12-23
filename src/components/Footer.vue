<template>
    <footer class="bottombar">
        <div class="download-button">
            <RouterLink to="/settings">
                <a class="button is-primary is-inverted has-background-white" style="border: 0">
                    <BIcon pack="fas" icon="cog" size="is-small"/>
                </a>
            </RouterLink>
        </div>
        <span class="status-text" :class="statusText.type">{{ statusText.message }}</span>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import status from '../status';

@Component
export default class Footer extends Vue {
    get statusText() {
        return this.$store.state.app.status;
    }
}
</script>
<style lang="scss">
.bottombar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px !important;
    line-height: 1.5;
}

.download-button {
    position: fixed;
    left: -5px;
    bottom: -5px;
}

.status-text {
    position: fixed;
    right: 3px;
    bottom: 1px;
    font-size: 13px;
}
</style>
