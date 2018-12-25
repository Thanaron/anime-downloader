<template>
    <footer class="bottombar">
        <div class="download-button">
            <RouterLink to="/settings">
                <a class="button is-primary is-inverted has-background-white" style="border: 0">
                    <BIcon pack="fas" icon="cog" size="is-small"/>
                </a>
            </RouterLink>
        </div>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Footer extends Vue {}
</script>
<style lang="scss">
.bottombar {
    position: fixed;
    bottom: 0;
    height: 32px;
    width: 100%;
}

.download-button {
    left: -5px;
    bottom: -5px;
}
</style>
