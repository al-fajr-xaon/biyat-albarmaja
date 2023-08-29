<script lang="ts">
    export let search = false;
</script>

<div class="root">
    <div class="input">
        <input type="text" />
    </div>
</div>
  
<style lang="scss">
    @import "../../assets/config";
  
    .root {
        display: flex;
        padding: $padding;
        color: $text-primary;

        input {
            margin: 0;
            padding: 0;
            border: none;
            outline: none;
            display: flex;
            background: transparent;
            color: inherit;
        }
    }
</style>