<script lang="ts">
    import EqualSectionItem from "./EqualSectionItem.svelte"
    import type { DropDown } from "./item-list/drop_down";
    import Button from "./Button.svelte";

    export let items: DropDown[] = [];
</script>
  
<div class="root">
    {#each items as item}
        <div class={`item ${(item.actions && item.actions.length == 0) ? "" : "has-actions"}`} on:click={() => {
            if (item.on_click && (item.actions && item.actions.length == 0)) {
                item.on_click();
            }
        }}>
            <div class="info">
                {#if item.icon}
                    <div class="icon">
                        <img src="https://www.nicepng.com/png/detail/343-3437509_black-office-icon-microsoft-office-icon-black.png" />
                    </div>
                {/if}

                <div class="text">
                    <span class="title">{ item.label }</span>
                    {#if item.description } <span>{ item.description }</span> {/if}
                </div>
            </div>

            <div class="actions">
                {#if item.actions}
                    {#each item.actions as action}
                        <EqualSectionItem>
                            <Button text={action.label} />
                        </EqualSectionItem>
                    {/each}
                {/if}
            </div>
        </div>
    {/each}
</div>
  
<style lang="scss">
    @import "../assets/config";
  
    .root {
        display: flex;
        flex: 1;
        gap: $padding-vertical;
        flex-direction: column;

        .item {
            transition-duration: $animation-duration;
            cursor: pointer;
            outline: $no-stroke;
            display: flex;
            flex: 1;
            gap: $stroke-width;
            padding: $padding;
            user-select: none;
            flex-direction: column;

            .info {
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
            }

            .actions {
                display: flex;
                flex-direction: row;
                padding: $padding;
                justify-content: flex-end;
            }

            &:hover {
                background: $control-irritated;
                border: $stroke;

                &:active {
                    background: $control-clicked;
                }
            }

            &.has-actions {
                cursor: default;
                border: $no-stroke;
                background: transparent !important;
            }
        }
    }
</style>