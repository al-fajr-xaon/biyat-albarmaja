<script lang="ts">
    export let flex = 1;

    export let header: HTMLElement | undefined = undefined;
</script>
  
<div class="root" style={`flex: ${flex}`}>
    <div class={`header ${header?.innerHTML == "" ? "hide" : ""}`} bind:this={header}>
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
        font: $font-primary;
        color: $text-primary;
        border: $stroke;
        border-radius: $control-radius;
        overflow: hidden;

        .header {
            padding: $padding;
        }

        .main {
            display: flex;
            padding: $padding;
            background: $surface-primary;
            height: 100%;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;
            gap: $padding-vertical;
        }

        .header.hide {
            opacity: 0;
            pointer-events: none;
            position: fixed;
        }
    }
</style>