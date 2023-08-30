<script lang="ts">
    export let type: "primary" | "secondary" = "secondary";
    export let on_click: () => void = () => {};
    export let text: string | undefined = undefined;
    export let icon: string | undefined = undefined;
</script>

<div class={`root ${type}`} on:click={on_click}>
    {#if icon} 
        <div class="icon">{icon}</div>
    {/if}
    {#if text} 
        <div class="text">{text}</div>
    {/if}
</div>

<style lang="scss">
    @import "../assets/config";

    .root {
        transition-duration: $animation-duration;
        cursor: pointer;
        font: $font-primary;
        display: flex;
        align-items: center;
        padding: $padding;
        justify-content: center;
        gap: $padding-horizontal;
        border-radius: $control-radius;
        user-select: none;

        .text, .icon {
            padding: $padding;
            white-space: nowrap;
        }

        &.primary {
            color: $accent-text-primary;
            background: $accent-primary;

            &:hover {
                background: $accent-secondary;

                &:active {
                    color: $accent-text-secondary;
                }
            }
        }

        &.secondary {
            color: $text-secondary;
            border: $no-stroke;

            &:hover {
                background: $control-irritated;
                color: $text-primary;

                &:active {
                    color: $text-secondary;
                    background: $control-clicked;
                }
            }
        }
    }
</style>