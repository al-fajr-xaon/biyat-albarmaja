<script lang="ts">
    export let direction: "row" | "column" = "row";
</script>
  
<div class={`root ${direction}`}>
    <slot />
</div>
  
<style lang="scss">
    @import "../assets/config";
  
    .root {
        display: flex;
        background: $surface-primary;
        border-radius: $control-radius;
        -webkit-app-region: no-drag;
        border: $stroke;

        &.row { 
            flex-direction: row;
            gap: $padding-horizontal; 
        }

        &.column { 
            flex-direction: column;
            gap: $padding-vertical;
        }

        &.start { justify-content: flex-start; }
        &.center { justify-content: center; }
        &.end { justify-content: flex-end; }
    }
</style>