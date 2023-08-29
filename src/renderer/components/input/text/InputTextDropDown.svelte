<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type { DropDown } from "../../item-list/drop_down";
    import ItemList from "../../ItemList.svelte"

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
    `left: ${client_rect.left}px; top: ${client_rect.bottom + 1}px`,
    `width: ${client_rect.width}px`
].join(";")}>
    <ItemList items={items} />
</div>
  
<style lang="scss">
    @import "../../../assets/config";
  
    .root {
        display: flex;
        position: fixed;
        outline: $stroke;
        font: $font;
        background: $surface-primary;
        transition-duration: $animation-duration;

        &.hide {
            opacity: 0;
            pointer-events: none;
        }
    }
</style>