<script lang="ts">
  import Button from "./components/Button.svelte"
</script>

<div class="root">
    <div class="row">
        <Button>Hello test radius</Button>
        <Button type="primary">Important</Button>
    </div>

    <div class="primary">
        <div class="row m tx">
            Amazing App 
            <div class="space"></div>
            <div class="space"></div>
            Waiting...
        </div>
        <div class="primary s">
            Hi
            <div class="space-x"></div>
            <div class="space-x"></div>
        </div>
        
        <div class="row r">
            <Button>Cancel</Button>
            <Button>Apply</Button>
            <Button type="primary">Finish</Button>
        </div>
    </div>
</div>

<style lang="scss">
    @import "./assets/config";

    .tx {
        padding: $padding;
    }

    .m {
        font: $font;
    }

    .r {
        justify-content: flex-end;
    }

    .primary {
        background: $surface-secondary;
        border-radius: $window-radius;
        font: $font-primary;
        padding: $padding;
        // width: 100%;
        // height: 100%;
        display: flex;
        flex-direction: column;
        border: $stroke;
        gap: $padding-vertical;

        &.s {
            background: $surface-primary;
            // margin-left: -9px;
            // margin-right: -9px;
        }
    }

    .space {
        display: flex;
        height: 1px;
        width: 200px;
    }

    .space-x {
        display: flex;
        height: 100px;
        width: 1px;
    }

    .root {
        background: $surface-secondary;
        width: calc(100vw + ($window-radius * 2));
        height: calc(100vh + ($window-radius * 2));
        border-radius: $window-radius;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: fixed;
        top: -$window-radius;
        left: -$window-radius;
        padding-left: calc($window-radius + $padding-horizontal);
        padding-right: calc($window-radius + $padding-horizontal);
        padding-top: calc($window-radius + $padding-vertical);
        padding-bottom: calc($window-radius + $padding-vertical);
        gap: $padding-vertical;
    }

    .row {
            display: flex;
            flex-direction: row;
            gap: $padding-horizontal;
        }

        p {
            padding: $padding;
            margin: 0;
            display: flex;
        }
</style>