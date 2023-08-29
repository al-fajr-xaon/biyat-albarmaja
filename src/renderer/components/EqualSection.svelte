<script lang="ts">
    export let direction: "row" | "column" = "row";
    export let align: "start" | "center" | "end" = "start";
</script>
  
<div class={`root ${direction} ${align}`}>
    <slot />
</div>
  
<style lang="scss">
    @import "../assets/config";
  
    .root {
        display: flex;
        flex: 1;
        gap: $stroke-width;
        width: 100%;

        &.row { flex-direction: row; }
        &.column { flex-direction: column; }
        &.start { justify-content: flex-start; }
        &.center { justify-content: center; }
        &.end { justify-content: flex-end; }
    }
</style>