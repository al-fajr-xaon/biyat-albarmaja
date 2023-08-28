<script lang="ts">
    export let type: "primary" | "secondary" = "secondary";
</script>

<div class={`root ${type}`}>
    <slot />
</div>

<style lang="scss">
    @import "../assets/config";

    .root {
        transition-duration: $animation-duration;
        cursor: pointer;
        padding: $padding;
        font: $font;
        display: flex;
        border-radius: $control-radius;
        align-items: center;
        justify-content: center;

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
                border: $stroke;

                &:active {
                    border: $stroke-secondary;
                    color: $text-secondary;
                    background: $control-clicked;
                }
            }
        }
    }
</style>