<script lang="ts">
    import type { SyntaxEngine } from "./editor/syntax_engine";
    import type { EditorFrame, EditorFrameException } from "./editor/editor_frame";
    import { onDestroy, onMount } from "svelte"
    import { add_listener, remove_listener } from "./dx"

    export let text_content = "";
    export let syntax_engine: SyntaxEngine<any, any, any>;

    let caret: HTMLElement | undefined = undefined;
    let lines: HTMLElement | undefined = undefined;
    let focused = false;
    let typing = false;

    let tokens_editor_raw: EditorFrame[] = []
    let errors: EditorFrameException[] = []
    let warnings: EditorFrameException[] = []

    function nest_new_line(tokens: EditorFrame[]) {
        let new_tokens: EditorFrame[][] = [[]];
        let index = 0;

        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].str_value == "\n") {
                new_tokens.push([
                    {
                        str_value: "\n"
                    }
                ]);
            } else {
                new_tokens[new_tokens.length - 1].push(tokens[i]);
                new_tokens[new_tokens.length - 1][new_tokens[new_tokens.length - 1].length - 1].index = index;
            }

            index += new_tokens[new_tokens.length - 1][new_tokens[new_tokens.length - 1].length - 1].str_value.length;
        }

        return new_tokens;
    }

    let tokens_editor = nest_new_line(tokens_editor_raw);
    let focused_line = 1;
    let current_cursor_pos = [0, 0];
    let mouseover = false;

    $: {
        tokens_editor = nest_new_line(tokens_editor_raw);
    }

    function has_error(char_index, line_index) {
        let error_exists = false;

        errors.forEach((error) => {
            if (line_index == error.start.y && char_index >= error.start.x && char_index <= error.end.x) {
                error_exists = true;
            } 
        });

        return error_exists;
    }

    function has_warning(char_index, line_index) {
        let warning_exists = false;

        warnings.forEach((warning, index) => {
            // compare lines
            if (line_index >= warning.start.y && line_index <= warning.end.y) {
                // some errors span multiple lines, so if the END is on the line after this, this means everything after the start charachter in this line should be returning true
                
            }
        });

        return warning_exists;
    }

    function move_cursor(x, y) {
        if (!lines) return;
        current_cursor_pos = [x, y];
        const lines_real = lines.children;
        const line = lines_real[y];
        const charachter = line.children[x];

        caret.style.left = "0px";
        caret.style.top = "0px";

        const char_bound = charachter.getBoundingClientRect();
        const caret_bound = caret.getBoundingClientRect();

        caret.style.height = `${char_bound.height}px`;
        caret.style.left = `${char_bound.left - caret_bound.left}px`;
        caret.style.top = `${char_bound.top - caret_bound.top}px`;
    }

    function to_char_list(tokens) {
        let chars = [];

        tokens.forEach((token) => {
            token.str_value.split("").forEach((char) => chars.push(char));
        });

        return chars;
    }

    function window_mouse_down() {
        if (!mouseover) focused = false;
    }

    function window_key_down(e) {
        if (e.key == "ArrowLeft") {
            move_cursor(current_cursor_pos[0] - 1, current_cursor_pos[1]);
        } else if (e.key == "ArrowRight") {
            move_cursor(current_cursor_pos[0] + 1, current_cursor_pos[1]);
        } else if (e.key == "ArrowUp") {
            move_cursor(current_cursor_pos[0], current_cursor_pos[1] + 1);
        } else if (e.key == "ArrowDown") {
            move_cursor(current_cursor_pos[0], current_cursor_pos[1] - 1);
        }
    }

    onMount(() => {
        add_listener("win_key_down", window_key_down);
        add_listener("win_mouse_down", window_mouse_down);
    });

    onDestroy(() => {
        remove_listener("win_key_down", window_key_down);
        remove_listener("win_mouse_down", window_mouse_down);
    });
</script>

<div class={`root ${focused ? "focused" : ""}`} on:mouseenter={() => mouseover = true} on:mouseleave={() => mouseover = false}>
    <div class="lines" bind:this={lines}>
        {#each tokens_editor as line, line_index}
            <div 
                class={`line ${focused_line == line_index ? "focused" : ""}`}
                on:mousedown={() => {
                    focused_line = line_index;
                }}
            >
                <!-- {#each line as token} -->
                    {#each to_char_list(line) as char, char_index}
                        <pre 
                            class={has_error(char_index, line_index) ? "has-error" : (has_warning(char_index, line_index) ? "has-warning" : "")}
                            on:mousedown={(e) => {
                                move_cursor(char_index, line_index);
                                focused = true;
                            }}
                        >{char}</pre>
                    {/each}
                <!-- {/each} -->
            </div>
        {/each}
    </div>

    <div class={`caret ${focused ? "" : "blurred"} ${typing ? "typing" : ""}`} bind:this={caret} />
</div>

<style lang="scss">
    @import "../assets/config";

    .root { 
        display: flex;
        flex-direction: column;
        user-select: none;
        width: 100%;
        height: 100%;
        overflow: auto;
        position: relative;

        &.focused {
            background: $surface-primary;
        }

        .caret {
            position: fixed;
            display: flex;
            width: 1px;
            background: $accent-primary;
            animation-name: flash;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            pointer-events: none;

            &.blurred {
                opacity: 0;
                animation-name: none;
            }

            &.typing {
                animation-name: none;
            }

            @keyframes flash {
                0% {
                    opacity: 0;
                }

                50% {
                    opacity: 1;
                }

                100% {
                    opacity: 0;
                }
            }
        }

        .line {
            display: flex;
            flex-direction: row;
            cursor: text;
            border: $no-stroke;
            transition-duration: $animation-duration;
        }

        &.focused {
            .line {
                &.focused {
                    background: $control-irritated;
                }
            }
        }

        pre {
            margin: 0;
            padding: 0;
            font: $font-primary;
            line-height: 30px;
            white-space: pre;

            &.has-error {
                text-decoration: underline;
                color: rgb(255, 0, 85);
            }

            &.has-warning {
                text-decoration: underline;
                color: rgb(0, 153, 255);
            }
        }
    }
</style>