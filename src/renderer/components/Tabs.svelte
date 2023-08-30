<script lang="ts">
    import type { TabPage } from "./tabs/tab_page";

    export let tabs: TabPage[] = [];
    export let active: string = tabs.length > 0 ? tabs[0].name : "";
</script>
  
<div class="root">
    {#each tabs as tab, index}
        <div class={`tab ${tab.name == active ? "active" : ""}`} on:click={() => {
            active = tab.name;
        }}>
            <span>{tab.name}</span>
        </div>

        {#if index != tabs.length - 1}
            <div class="vr"></div>
        {/if}
    {/each}
</div>
  
<style lang="scss">
    @import "../assets/config";
  
    .root {
        display: flex;
        background: $control-irritated;
        border-radius: $control-radius;
        -webkit-app-region: no-drag;
        border: $stroke;
        font: $font-primary;
        color: $text-secondary;
        align-items: center;
        justify-content: center;
        border-radius: $control-radius;
        gap: $padding-horizontal;
        user-select: none;

        .vr {
            width: 1px;
            height: calc(100% - $padding-vertical * 2);
            background: $stroke-color;
        }

        .tab {
            padding: $padding;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: $control-radius;
            cursor: pointer;
            transition-duration: $animation-duration;
            position: relative;

            &:after {
                content: "";
                position: absolute;
                bottom: 1px;
                height: 3px;
                width: 0;
                background: $accent-primary;
                border-radius: 1.5px;
                left: 50%;
                transform: translate(-50%);
                transition-duration: $animation-duration;
                opacity: 0;
                pointer-events: none;
            }

            &:hover {
                background: $control-irritated;
                color: $text-primary;

                &:after {
                    opacity: 1;
                    width: 25%;
                }
            }

            &.active {
                background: $surface-primary;
                color: $text-primary;

                &:after {
                    width: 50%;
                    opacity: 1;
                }
            }

            span {
                padding: $padding;
                white-space: nowrap;
            }
        }
    }
</style>