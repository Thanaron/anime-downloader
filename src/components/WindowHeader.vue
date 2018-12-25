<template>
    <div class="columns is-vcentered is-fullwidth">
        <div class="column is-narrow">
            <div class="has-text-weight-bold is-size-3">{{ title }}</div>
        </div>
        <slot></slot>
        <div class="column"/>
        <div class="column is-1 is-narrow" v-if="closable">
            <div class="close-button is-pulled-right">
                <a class="delete is-large" @click="closeWindow"></a>
                <span class="has-text-grey-lighter has-text-weight-semibold">ESC</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class WindowHeader extends Vue {
    @Prop({ type: String, required: true }) title!: string;
    @Prop({ type: Boolean, default: true }) closable!: boolean;
    @Prop({ type: Function, default: () => {} }) onClose!: () => void;

    mounted() {
        window.addEventListener('keyup', this.handleEscKey);
    }

    handleEscKey(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.closeWindow();
        }
    }

    closeWindow() {
        window.removeEventListener('keyup', this.handleEscKey);
        this.onClose();
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
</style>
