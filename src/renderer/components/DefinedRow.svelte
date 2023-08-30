<script lang="ts">
    export let titlebar = false;
</script>
  
<div class={`root ${titlebar ? "drag" : ""}`}>
    <slot />
</div>
  
<style lang="scss">
    @import "../assets/config";
  
    .root {
        display: flex;
        flex-direction: row;
        gap: $padding-horizontal;
        width: 100%;
        justify-content: space-between;
        -webkit-app-region: no-drag;

        &.drag {
            -webkit-app-region: drag;
        }
    }
</style>