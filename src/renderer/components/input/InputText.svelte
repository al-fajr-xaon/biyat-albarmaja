<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import InputTextDropDown from "./text/InputTextDropDown.svelte";
    import { add_listener, remove_listener } from "../dx";
    import type { DropDown } from "../item-list/drop_down"

    export let search = false;
    export let placeholder = "";

    let virtual_focus = false;
    let self: HTMLElement | undefined = undefined;
    let mouse_on_alie = false;
    let value_raw = "";
    let result_items: DropDown[] = [
        {
            label: "First option search result",
            onOpen: () => {
                
            }
        },
        {
            label: "Second option search result"
        }
    ];

    function possible_focus_loss() {
        if (!mouse_on_alie) virtual_focus = false;
    }

    onMount(() => {
        add_listener("win_mouse_down", possible_focus_loss);
    });

    onDestroy(() => {
        remove_listener("win_mouse_down", possible_focus_loss);
    });
</script>

<div class="root" bind:this={self} on:mouseenter={() => mouse_on_alie = true} on:mouseleave={() => mouse_on_alie = false}>
    {#if self} 
        <InputTextDropDown for_element={self} items={result_items} show={virtual_focus} />
    {/if}
    <div class="input">
        <input type="text" placeholder={placeholder} on:focus={() => virtual_focus = true} on:input={(e) => {
            value_raw = e.target.value;
            console.log(value_raw)
        }} />
    </div>
</div>
  
<style lang="scss">
    @import "../../assets/config";
  
    .root {
        display: flex;
        color: $text-primary;
        padding: $padding;
        background: $surface-primary;
        position: relative;
        border-radius: $control-radius;
        -webkit-app-region: no-drag;
        border: $stroke;
        flex: 1;
        width: 400px;
        
        &:after {
            content: "";
            display: flex;
            position: absolute;
            bottom: 1px;
            left: 50%;
            height: 3px;
            background: $accent-primary;
            border-radius: 1.5px;
            transform: translate(-50%);
            transition-duration: $animation-duration;
            pointer-events: none;
            width: 0;
            opacity: 0;
        }

        &:hover {
            &:after {
                width: 25%;
                opacity: 1;
            }
        }

        &:focus-within {
            &:after {
                opacity: 1;
                width: 50%;
            }
        }

        .input {
            display: flex;
            flex: 1;

            input {
                margin: 0;
                padding: $padding;
                outline: none;
                border: none;
                display: flex;
                background: transparent;
                color: inherit;
                width: 100%;
                font: $font-primary;
            }
        }
    }
</style>