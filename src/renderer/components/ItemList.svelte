<script lang="ts">
    import EqualSectionItem from "./EqualSectionItem.svelte"
    import type { DropDown } from "./item-list/drop_down";
    import Button from "./Button.svelte";
    import HR from "./HR.svelte"
    import VR from "./VR.svelte"

    export let items: DropDown[] = [];
</script>
  
<div class="root">
    {#each items as item, index}
        <div class={`item ${(item.actions && item.actions.length == 0 || !item.actions) ? "" : "has-actions"}`} on:click={() => {
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

            {#if item.actions}
                <div class="actions">
                    {#if item.actions}
                        <EqualSectionItem>
                            {#each item.actions as action, index}
                                <Button text={action.label} />

                                {#if index != item.actions.length - 1}
                                    <VR />
                                {/if}
                            {/each}
                        </EqualSectionItem>
                    {/if}
                </div>
            {/if}
        </div>

        {#if index != items.length - 1}
            <HR />
        {/if}
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
            display: flex;
            flex: 1;
            gap: $stroke-width;
            padding: $padding;
            user-select: none;
            flex-direction: column;
            border-radius: $control-radius;

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

                &:active {
                    background: $control-clicked;
                }
            }

            &.has-actions {
                cursor: default;
                
                &:hover {
                    background: $control-irritated;
                }
            }
        }
    }
</style>