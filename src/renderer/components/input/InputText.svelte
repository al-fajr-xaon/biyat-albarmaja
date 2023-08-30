<script lang="ts">
    import InputTextDropDown from "./text/InputTextDropDown.svelte";

    export let search = false;
    let self: HTMLElement | undefined = undefined;
</script>

<div class="root" bind:this={self}>
    {#if self} 
        <InputTextDropDown for_element={self} items={[
            { 
                label: "AL FAJR XAON",
                description: "A high-performance, heavily standardized and centeralized CPU and semiconductor company"
            },
            {
                label: "Microsoft",
                description: "Big bad company"
            },
            { 
                label: "Lorem DATA",
                description: "A high-performance, heavily standardized and centeralized CPU and semiconductor company"
            },
            {
                label: "LxDC",
                description: "Light Expansion Data Corrleation"
            }
        ]} />
    {/if}
    <div class="input">
        <input type="text" />
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
        border: $stroke;
        width: 500px;
        
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
                border: none;
                outline: none;
                display: flex;
                background: transparent;
                color: inherit;
                width: 100%;
                font: $font-primary;
            }
        }
    }
</style>