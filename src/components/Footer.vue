<template>
    <footer class="bottombar">
        <div class="download-button">
            <RouterLink to="/settings">
                <a
                    class="button is-primary is-inverted has-background-white is-medium is-paddingless"
                    style="border: 0"
                >
                    <BIcon pack="fas" icon="cog" size="is-small"/>
                </a>
            </RouterLink>
        </div>
        <div class="update-button">
            <UpdateButton/>
        </div>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import UpdateButton from './UpdateButton.vue';

@Component({
    components: { UpdateButton },
})
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
    position: fixed;
    left: 7px;
    bottom: -10px;
}

.update-button {
    position: fixed;
    right: 8px;
    bottom: -7px;
}
</style>
