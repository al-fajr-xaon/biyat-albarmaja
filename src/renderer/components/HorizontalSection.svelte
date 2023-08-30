<script lang="ts">
  import { onDestroy, onMount } from "svelte"

    export let align: "left" | "center" | "right" = "left";

    let can_scroll = false;
    let resize_observer: ResizeObserver | undefined = undefined;
    let frame: HTMLDivElement | undefined = undefined;

    let scroll_left = 0;
    let scroll_right = 0;

    function check_scroll() {
        const old = can_scroll;
        can_scroll = frame.scrollWidth > frame.clientWidth;

        if (!old && can_scroll) {
            if (align == "left") {
                scroll_left = 0;
                frame.scrollLeft = 0;
            }

            else if (align == "right") {
                scroll_right = 0;
                frame.scrollLeft = frame.scrollWidth;
            }
        } else if (old && !can_scroll) {
            scroll_left = 0;
            scroll_right = 0;
            frame.scrollLeft = 0;
        }
    }

    function set_scroll_pos(e) {
        scroll_left = e.target.scrollLeft;
        scroll_right = e.target.scrollWidth - e.target.clientWidth - scroll_left;
    }

    onMount(() => {
        resize_observer = new ResizeObserver(() => {
            check_scroll();
        });

        resize_observer.observe(frame);
    });

    onDestroy(() => {
        resize_observer.disconnect();
        resize_observer = undefined;
    });
</script>

<div class="root">
    <div class={`button f-start ${(can_scroll && scroll_left > 0) || (scroll_left == 0 && scroll_right == 0 && can_scroll) ? "" : "hide"}`} on:click={() => {
        frame.scrollLeft -= 100;
    }}>
        {#if scroll_left == 0 && scroll_right == 0}
            <span>?</span>
        {:else}
            <span>Left</span>
        {/if}
    </div>

    <div class={`frame ${align}`} bind:this={frame} on:scroll={(e) => {
        can_scroll = true;
        set_scroll_pos(e);
    }}>
        {#if align == "right"}
            <div class="sub">
                <slot />
            </div>
        {:else}
            <slot />
        {/if}
    </div>

    <div class={`button f-end ${(can_scroll && scroll_right > 0) || (scroll_left == 0 && scroll_right == 0 && can_scroll) ? "" : "hide"}`} on:click={() => {
        frame.scrollLeft += 100;
    }}>
        {#if scroll_left == 0 && scroll_right == 0}
            <span>?</span>
        {:else}
            <span>Right</span>
        {/if}
    </div> 
</div>

<style lang="scss">
    @import "../assets/config";

    .root {
        display: flex;
        flex-direction: row;
        flex: 1;
        position: relative;
        overflow: hidden;
        align-items: center;
        border-radius: $control-radius;

        .button {
            position: absolute;
            top: 50%;
            z-index: 100;
            transform: translateY(-50%);
            padding: $padding;
            transition-duration: $animation-duration;
            cursor: pointer;
            color: $text-primary;
            border-radius: $control-radius;
            display: flex;
            background: $surface-primary;
            border: $stroke;
            -webkit-app-region: no-drag;
            box-shadow: 0 0 10px 0 $stroke-color;

            &.hide {
                opacity: 0;
                pointer-events: none;
            }

            &:hover {
                background: $surface-secondary;
            }

            span {
                padding: $padding;
            }
            
            &.f-start { left: 0; }
            &.f-end { right: 0; }
        }

        .frame {
            display: flex;
            flex-direction: row;
            gap: $padding-horizontal;
            flex: 1;
            overflow: auto;

            &::-webkit-scrollbar {
                width: 0;
                height: 0;
                background: transparent;
            }

            &.left { justify-content: flex-start; }
            &.center { justify-content: center; }
            &.right { flex-direction: row-reverse; }

            .sub {
                display: flex;
                flex-direction: row;
                gap: $padding-horizontal;
                justify-content: flex-end;
                flex: 1;
            }
        }
    }
</style>