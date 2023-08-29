<script lang="ts">
    import EqualSection from "./EqualSection.svelte";

    export { EqualSection }
</script>
  
<div class="root">
    <slot />
</div>
  
<style lang="scss">
    @import "../assets/config";
  
    .root {
        display: flex;
        flex-direction: row;
        gap: $stroke-width;
        outline: $stroke;
        width: 100%;
    }
</style>