<script lang="ts">
    export let flex = 1;

    export let header: HTMLElement | undefined = undefined;
    export let clear_bk = false;
</script>
  
<div class="root" style={`flex: ${flex}`}>
    <div class={`header ${header?.innerHTML == "" ? "hide" : ""}`} bind:this={header}>
        <slot name="header" />
    </div>

    <div class="main" style={clear_bk ? "background: transparent;" : ""}>
        <slot />
    </div>
</div>
  
<style lang="scss">
    @import "../assets/config";
  
    .root {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        font: $font-primary;
        color: $text-primary;
        border-radius: $control-radius;
        overflow: hidden;
        gap: $padding-vertical;

        .main {
            display: flex;
            background: $surface-primary;
            height: calc(100% - 1px);
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;
            gap: $padding-vertical;
            overflow-y: auto;
            overflow-x: hidden;
            border-radius: $control-radius;
            border: $stroke;
            padding: $padding;
        }

        .header.hide {
            opacity: 0;
            pointer-events: none;
            position: fixed;
        }
    }
</style>