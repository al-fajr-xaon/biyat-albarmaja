<script lang="ts">
    import type { TabPage } from "./tab_page"

    export let tabs: TabPage[] = [];
    export let active = "";

    let old_active = active;
    let old_index = 0;
    let new_index = 0;

    const animation_duration = 150; //ms
    let timeout_a;
    let timeout_b;
    let timeout_c;

    let leave = false;
    let join = false;
    let hide = false;
    let animations = false;
    let busy = false;

    let direction: "right" | "left" = "right";

    $: {
        if (!busy && old_active != active) {
            busy = true;
            animations = true;
            hide = false;
            join = false;
            leave = false;

            tabs.forEach((tab, index) => {
                if (tab.name == active) {
                    new_index = index;
                }
            });

            if (new_index > old_index) direction = "right";
            else direction = "left";

            clearTimeout(timeout_a);
            clearTimeout(timeout_b);
            clearTimeout(timeout_c);

            animations = true;
            
            if (direction == "left")
                leave = true;
            else 
                join = true;

            timeout_a = setTimeout(() => {
                hide = true;
                console.log("A")

                timeout_b = setTimeout(() => {
                    animations = false;

                    if (direction == "left")
                        leave = false;
                    else 
                        join = false;

                    if (direction == "left")
                        join = true;
                    else
                        leave = true;

                    old_active = active;
                    
                    tabs.forEach((tab, index) => {
                        if (tab.name == active) {
                            old_index = index;
                        }
                    });

                    timeout_c = setTimeout(() => {
                        animations = true;
                        hide = false;
                        busy = false;
                        join = false;
                        leave = false;
                    }, animation_duration / 3);
                }, animation_duration / 3);
            }, animation_duration / 3);
        }
    }
</script>

<div class={`root ${hide ? "hide" : ""} ${join ? "join" : ""} ${leave ? "leave" : ""} ${animations ? "enable-transition" : ""}`}>
    {#each tabs as _, index}
        {#if index == 0 && tabs[index].name == old_active}
            <slot name="tab-0" />
        {:else if index == 1 && tabs[index].name == old_active}
            <slot name="tab-1" />
        {:else if index == 2 && tabs[index].name == old_active}
            <slot name="tab-2" />
        {:else if index == 3 && tabs[index].name == old_active}
            <slot name="tab-3" />
        {:else if index == 4 && tabs[index].name == old_active}
            <slot name="tab-4" />
        {:else if index == 5 && tabs[index].name == old_active}
            <slot name="tab-5" />
        {:else if index == 6 && tabs[index].name == old_active}
            <slot name="tab-6" />
        {/if}
    {/each}
</div>

<style lang="scss">
    @import "../../assets/config";

    .root {
        width: 100%;

        &.enable-transition {
            transition-duration: calc($animation-duration / 3);
        }

        &.hide {
            opacity: 0;
        }

        &.leave {
            transform: translateX(-$padding-horizontal);
            opacity: 0;
        }

        &.join {
            transform: translateX($padding-horizontal);
            opacity: 0;
        }
    }
</style>