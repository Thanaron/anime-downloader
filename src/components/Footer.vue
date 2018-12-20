<template>
    <footer class="bottombar">
        <div class="download-button">
            <RouterLink to="/settings">
                <button
                    class="button is-primary is-inverted has-background-white"
                    style="border: 0"
                >
                    <BIcon pack="fas" icon="cog" size="is-small"/>
                </button>
            </RouterLink>
        </div>
        <span class="has-text-info status-text">{{ statusText }}</span>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

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
    height: 32px;
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
