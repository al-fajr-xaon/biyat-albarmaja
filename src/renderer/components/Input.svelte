<script lang="ts">
  import InputText from "./input/InputText.svelte"

    export let type: "search" | "text" = "text";

    let mode = produce_mode(type);

    function produce_mode(type) {
        switch (type) {
            case "search":
            case "text":
            default:
                return "text";
        }
    }
</script>

<div class="root">
    {#if mode == "text"}
        <InputText search={type == "search"} />
    {/if}
</div>
  
<style lang="scss">
    @import "../assets/config";
  
    .root {
        display: flex;
        outline: $stroke;
        flex: 1;
    }
</style>