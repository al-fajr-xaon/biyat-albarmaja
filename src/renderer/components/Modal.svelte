<script lang="ts">
    import DefinedContentArea from "./DefinedContentArea.svelte"

    let animation = false;
    let leave = false;
    let join = false;
    let render = false;

    export let show = false;
    let old_show = show;

    $: {
        if (show && !old_show) {
            render = false;
            animation = false;
            join = true;
            leave = false;

            setTimeout(() => {
                animation = true;
                render = true;
                old_show = show;
                join = false;
            }, 100);
        } else if (!show && old_show) {
            render = true;
            animation = true;
            join = false;
            leave = true;

            render = false;
            old_show = show;
        }
    }
</script>

<div class={`root ${animation ? "enable-animation" : ""} ${leave ? "leave" : ""} ${join ? "join" : ""} ${!old_show || !render ? "hide" : ""}`}>
    <DefinedContentArea>
        <slot name="header" slot="header" />
        <slot />
    </DefinedContentArea>
</div>

<style lang="scss">
    @import "../assets/config.scss";

    .root {
        position: fixed;
        z-index: 100;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 50px 0 $stroke-color;
        max-width: 60vw;
        max-height: 60vh;
        width: 500px;
        height: 300px;
        display: flex;
        align-items: flex-start;

        &.enable-animation {
            transition-duration: $animation-duration;
        }

        &.leave {
            transform: translate(-50%, -50%) scale(0.9);
        }

        &.join {
            transform: translate(-50%, -50%) scale(1.1);
        }

        &.hide {
            opacity: 0;
            pointer-events: none;
        }
    }
</style>