<script lang="ts">
    import type { DropDown } from "./item-list/drop_down";

    export let items: DropDown[] = [];
</script>
  
<div class="root">
    {#each items as item}
        <div class="item">
            <div class="icon">
                <img src="https://www.nicepng.com/png/detail/343-3437509_black-office-icon-microsoft-office-icon-black.png" />
            </div>

            <div class="text">
                <span class="title">{ item.label }</span>
                {#if item.description } <span>{ item.description }</span> {/if}
            </div>
        </div>
    {/each}
</div>
  
<style lang="scss">
    @import "../assets/config";
  
    .root {
        display: flex;
        flex: 1;
        gap: $stroke-width;
        flex-direction: column;

        .item {
            transition-duration: $animation-duration;
            cursor: pointer;
            outline: $no-stroke;
            display: flex;
            flex: 1;
            gap: $stroke-width;

            .icon {
                align-items: center;
                justify-content: center;
                display: flex;
                align-self: flex-start;
                padding: $padding;

                img {
                    width: 30px;
                    height: 30px;
                }
            }

            .text {
                display: flex;
                flex-direction: column;
                gap: $padding-vertical;
                padding: $padding;
                color: $text-secondary;

                .title {
                    font: $font-primary;
                    color: $text-primary;
                }
            }

            &:hover {
                background: $control-irritated;
                outline: $stroke;

                &:active {
                    background: $control-clicked;
                }
            }
        }
    }
</style>