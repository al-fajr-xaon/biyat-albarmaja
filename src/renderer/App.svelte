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
                        label: "Compile Main.QB",
                        actions: [
                            {
                                label: "Compile"
                            }
                        ]
                    },
                    {
                        label: "Run Main.QB"
                    }
                ]} />
            </DefinedContentArea>
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

        .window {
            width: 100%;
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