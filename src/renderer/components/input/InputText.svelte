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
        flex: 1;
        width: 100%;

        &:focus-within {
            background: $surface-primary;
        }

        input {
            margin: 0;
            padding: $padding;
            border: none;
            outline: none;
            display: flex;
            background: transparent;
            color: inherit;
            width: 100%;
        }
    }
</style>