<script lang="ts">
    import EqualSectionItem from "./EqualSectionItem.svelte"
    import type { DropDown } from "./item-list/drop_down";
    import Button from "./Button.svelte";
    import HR from "./HR.svelte"
    import VR from "./VR.svelte"
    import DefinedRow from "./DefinedRow.svelte"
    import HorizontalSection from "./HorizontalSection.svelte"
    import Text from "./Text.svelte"

    export let items: DropDown[] = [];
</script>
  
<div class="root">
    {#each items as item, index}
        <div class={`item ${false ? "" : "has-actions"}`} on:click={() => {
            if (item.on_click && (item.actions && item.actions.length == 0)) {
                item.on_click();
            }
        }}>
            <div class="info">
                <HorizontalSection>
                    {#if item.icon}
                        <div class="icon">
                            <img src="https://www.nicepng.com/png/detail/343-3437509_black-office-icon-microsoft-office-icon-black.png" />
                        </div>
                    {/if}

                    <div class="text">
                        <span class="title">{ item.label }</span>
                        {#if item.description } <span>{ item.description }</span> {/if}
                    </div>
                </HorizontalSection>

                {#if item.onDelete || item.onOpen}
                    <HorizontalSection align="right">
                        <EqualSectionItem>
                            {#if item.onDelete}
                                <Button text="Delete" on_click={item.onDelete} />
                            {/if}

                            {#if item.onDelete && item.onOpen}
                                <VR />
                            {/if}

                            {#if item.onOpen}
                                <Button text="Open" on_click={item.onOpen} />
                            {/if}
                        </EqualSectionItem>
                    </HorizontalSection>
                {/if}
            </div>

            {#if item.actions || item.tags}
                <div class="actions">
                    {#if item.tags}
                        <div class="tags">
                            <HorizontalSection>
                                <EqualSectionItem>
                                    {#each item.tags as tag, index}
                                        <div>
                                            <span>{tag}</span>
                                        </div>
                
                                        {#if index != item.tags.length - 1}
                                            <VR />
                                        {/if}
                                    {/each}
                                </EqualSectionItem>
                            </HorizontalSection>
                        </div>
                    {/if}

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
        width: 100%;

        .item {
            transition-duration: $animation-duration;
            cursor: pointer;
            display: flex;
            flex: 1;
            gap: $padding-vertical;
            padding: $padding;
            user-select: none;
            flex-direction: column;
            border-radius: $control-radius;

            .info {
                display: flex;
                flex-direction: row;

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
                justify-content: space-between;

                .tags {
                    display: flex;
                    font: $font;
                    color: $text-secondary;

                    div {
                        padding: $padding;
                        border-radius: $control-radius;
                        color: $text-primary;
                        display: flex;

                        span {
                            padding: $padding;
                        }
                    }
                }
            }

            &.has-actions {
                cursor: default;
            }
        }
    }
</style>