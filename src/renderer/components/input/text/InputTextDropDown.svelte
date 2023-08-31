<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type { DropDown } from "../../item-list/drop_down";
    import ItemList from "../../ItemList.svelte"
    import Text from "../../Text.svelte";
    import Hr from "../../HR.svelte"
    import DefinedContentArea from "../../DefinedContentArea.svelte"
    import Tabs from "../../Tabs.svelte"
    import DefinedRow from "../../DefinedRow.svelte"
    import HorizontalSection from "../../HorizontalSection.svelte"

    export let items: DropDown[] = [];
    export let for_element: HTMLElement;
    export let show = false;

    let client_rect = for_element.getBoundingClientRect();
    let res_observer: ResizeObserver | undefined = undefined;

    onMount(() => {
        res_observer = new ResizeObserver(() => client_rect = for_element.getBoundingClientRect());
        res_observer.observe(for_element);
    });

    onDestroy(() => {
        res_observer.disconnect();
        res_observer = undefined;
    });
</script>
  
<div class={`root ${!show ? "hide" : ""}`} style={[
    `left: ${client_rect.left}px; top: ${client_rect.bottom + 5}px`,
    `width: ${client_rect.width}px`
].join(";")}>
    <DefinedContentArea clear_bk={false}>
        <DefinedRow slot="header">
            <HorizontalSection>
                <Tabs tabs={[
                    { name: "Sources" },
                    { name: "Plugins" }
                ]} />
            </HorizontalSection>

            <HorizontalSection align="right">
                {#if items.length == 0} 
                    <Text>No results</Text>
                {:else}
                    <Text>{items.length} results</Text>
                {/if}
            </HorizontalSection>
        </DefinedRow>

        <ItemList items={items} />
    </DefinedContentArea>
</div>
  
<style lang="scss">
    @import "../../../assets/config";
  
    .root {
        display: flex;
        position: fixed;
        flex-direction: column;
        gap: $padding-vertical;
        font: $font;
        transition: opacity $animation-duration ease-in-out, transform $animation-duration ease-in-out;
        z-index: 100;
        border: $stroke;
        border-radius: $control-radius;
        background: $surface-secondary;
        padding: $padding;

        &.hide {
            opacity: 0;
            pointer-events: none;
            transform: translateY($padding-horizontal);
        }
    }
</style>