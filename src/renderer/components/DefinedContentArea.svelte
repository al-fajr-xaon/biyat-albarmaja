<script lang="ts">
    export let flex = 1;
</script>
  
<div class="root" style={`flex: ${flex}`}>
    <slot />
</div>
  
<style lang="scss">
    @import "../assets/config";
  
    .root {
        display: flex;
        background: $surface-primary;
        width: 100%;
        height: 100%;
        flex-direction: column;
        outline: $stroke;
    }
</style>