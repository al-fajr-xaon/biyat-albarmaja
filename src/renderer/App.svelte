<script lang="ts">
  import Button from "./components/Button.svelte"
  import DefinedRow from "./components/DefinedRow.svelte"
  import Input from "./components/Input.svelte"
  import Text from "./components/Text.svelte"
  import EqualSectionItem from "./components/EqualSectionItem.svelte";
  import Tabs from "./components/Tabs.svelte"
  import DefinedContentArea from "./components/DefinedContentArea.svelte"
  import ItemList from "./components/ItemList.svelte"
  import VR from "./components/VR.svelte"

  let active = "Project";
</script>

<div class="root">
    <DefinedRow titlebar={true}>
        <div>
            <Text>AQXENN {"<-"} Main AQxTP64</Text>
    
            <Tabs tabs={[
                {
                    name: "Project"
                },
                {
                    name: "Frames"
                },
                {
                    name: "Help"
                },
                {
                    name: "Settings"
                }
            ]} bind:active={active} />
        </div>
        
        <div>
            <Input type="search" />
        </div>

        <div>
            <EqualSectionItem>
                <Button text="Minimize" />
                <VR />
                <Button text="Size" />
                <VR />
                <Button text="Close" />
            </EqualSectionItem>
        </div>
    </DefinedRow>

    {#if active == "Project"}
        <div class="main">
            <div class="window">
                <DefinedContentArea>
                    <DefinedRow slot="header">
                        <Tabs tabs={[
                            { name: "Source" },
                            { name: "Design" },
                            { name: "Preview" }
                        ]} />
                    </DefinedRow>
    
                    Hello World
                </DefinedContentArea>
    
                <DefinedContentArea flex={3}>
                    <DefinedRow slot="header">
                        <Tabs tabs={[
                            { name: "Main.QB" },
                            { name: "Search = \"Theme\"" },
                        ]} />
                    </DefinedRow>
                </DefinedContentArea>
    
                <DefinedContentArea>
                    <DefinedRow slot="header">
                        <Tabs tabs={[
                            { name: "Tasks" },
                            { name: "Tests" },
                            { name: "Tools" }
                        ]} />
                    </DefinedRow>
    
                    <ItemList items={[
                        {
                            label: "Compile Main.QB"
                        },
                        {
                            label: "Run Main.QB"
                        },
                        {
                            label: "Emulation Host",
                            actions: [
                                {
                                    label: "Restart"
                                },
                                {
                                    label: "Terminate"
                                }
                            ]
                        }
                    ]} />
                </DefinedContentArea>
            </div>

            <div class="tools">
                <div class="tool">
                    <DefinedContentArea>
                        <DefinedRow slot="header">
                            <div>
                                <Text>Emulation Host</Text>
                            
                                <Tabs tabs={[
                                    { name: "General" },
                                    { name: "Serial Console" },
                                    { name: "Memory" }
                                ]} />
                            </div>

                            <EqualSectionItem>
                                <Button text="Close" />
                            </EqualSectionItem>
                        </DefinedRow>

                        <Text>Status = Running</Text>
                        <Text>Loaded = No</Text>
                    </DefinedContentArea>
                </div>
            </div>
        </div>
    {:else if active == "Frames"}
        <div>
            <Text type="header">Frames</Text>
        </div>
    {:else if active == "Help"}
        <div>
            <Text type="header">Help</Text>
        </div>
    {:else if active == "Settings"}
        <div>
            <Text type="header">Settings</Text>
        </div>
    {/if}
</div>

<style lang="scss">
    @import "./assets/config";

    .root {
        background: $surface-secondary;
        width: calc(100vw );
        height: calc(100vh);
        display: flex;
        flex-direction: column;
        align-items: flex-start; 
        position: fixed;
        gap: $padding-vertical;
        padding: $padding;

        .main {
            width: 100%;
            display: flex;
            flex-direction: column;

            .window {
                width: 100%;
                flex: 2;
            }

            .tools {
                width: 100%;
                display: flex;
                flex: 1;
                gap: $padding-horizontal;
                justify-content: flex-start;
                overflow: auto;

                .tool {
                    min-width: 500px;
                    max-width: 500px;
                }
            }
        }

        div {
            display: flex;
            gap: $padding-horizontal;
            flex: 1;

            &:nth-child(2) {
                justify-content: center;
            }

            &:nth-child(3) {
                justify-content: flex-end;
            }
        }
    }
</style>