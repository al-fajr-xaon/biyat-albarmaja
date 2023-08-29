<script lang="ts">
    export let type: "paragraph" | "sub title" | "header" = "paragraph";
</script>

<div class="root">
    {#if type == "paragraph"}
        <p>
            <slot />
        </p>    
    {:else if type == "sub title"}
        <span>
            <slot />
        </span>
    {:else}
        <h1>
            <slot />
        </h1>
    {/if}
</div>
  
<style lang="scss">
    @import "../assets/config";
  
    .root {
        display: flex;
        padding: $padding;

        p, h1, span {
            margin: 0;
            padding: 0;
        }

        p {
            font: $font-primary;
            color: $text-primary;
        }

        span {
            font: $font;
            color: $text-secondary;
        }

        h1 {
            color: $text-primary;
            font: $font-primary;
            font-size: 18px;
        }
    }
</style>