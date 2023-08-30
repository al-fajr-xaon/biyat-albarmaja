<script lang="ts">
    export let flex = 1;
</script>
  
<div class="root" style={`flex: ${flex}`}>
    <div class="header">
        <slot name="header" />
    </div>

    <div class="main">
        <slot />
    </div>
</div>
  
<style lang="scss">
    @import "../assets/config";
  
    .root {
        display: flex;
        background: $surface-secondary;
        width: 100%;
        height: 100%;
        flex-direction: column;
        gap: $padding-vertical;
        font: $font-primary;
        color: $text-primary;

        .main {
            padding: $padding;
            background: $surface-primary;
            border-radius: $panel-radius;
            height: 100%;
            border: $stroke;
        }
    }
</style>