<template>
    <div>
        <Titlebar/>
        <div id="content">
            <transition
                enter-active-class="viewTransitionIn"
                mode="out-in"
                leave-active-class="viewTransitionOut"
            >
                <keep-alive include="Home">
                    <RouterView/>
                </keep-alive>
            </transition>
        </div>
        <Footer/>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Titlebar from '@/components/Titlebar.vue';
import Footer from '@/components/Footer.vue';

@Component({
    components: {
        Titlebar,
        Footer,
    },
})
export default class Main extends Vue {}
</script>

<style lang="scss">
#content {
    height: calc(100% - 64px);
    padding: 50px 30px 30px 30px;
    overflow-y: auto;
    overflow-x: hidden;
}

.viewTransitionIn {
    animation: zoomIn, fadeIn;
    animation-duration: 350ms;
}

.viewTransitionOut {
    animation: zoomOut, fadeOut;
    animation-duration: 350ms;
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale3d(0.98, 0.98, 0.98);
    }

    70% {
        opacity: 1;
    }
}

@keyframes zoomOut {
    from {
        opacity: 1;
    }

    50% {
        opacity: 0;
        transform: scale3d(0.98, 0.98, 0.98);
    }

    to {
        opacity: 0;
    }
}
</style>
