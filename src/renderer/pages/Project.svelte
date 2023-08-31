<script>
    import { onMount } from "svelte"
    import Modal from "../components/Modal.svelte"
    import DefinedRow from "../components/DefinedRow.svelte"
    import HorizontalSection from "../components/HorizontalSection.svelte"
    import EqualSectionItem from "../components/EqualSectionItem.svelte"
    import Text from "../components/Text.svelte"
    import Button from "../components/Button.svelte"
    import DefinedContentArea from "../components/DefinedContentArea.svelte"
    import ProjectSourceSBar from "./project/ProjectSourceSBar.svelte"
    import ProjectJobSBar from "./project/ProjectJobSBar.svelte"
    import Editor from "../components/Editor.svelte"
    import Tabs from "../components/Tabs.svelte"

    let introductory_modal = false;

    onMount(() => {
        setTimeout(() => {
            if (localStorage.getItem("introductory_modal") == null) {
                introductory_modal = true;
                console.log("Welcome user, this appears to be your first time using this program");
            } else console.log("Welcome back user");
        }, 500);
    });
</script>

<div class="root">
    <Modal bind:show={introductory_modal}>
        <DefinedRow slot="header">
            <HorizontalSection>
                <img src="./assets/icons.svg" width="15px" />
                <Text line={true}>Al Fajr Xaon Welcome</Text>
            </HorizontalSection>

            <EqualSectionItem>
                <Button text="Dismiss" on_click={() => {
                    introductory_modal = false;
                    localStorage.setItem("introductory_modal", "true");
                }} />
            </EqualSectionItem>
        </DefinedRow>

        <Text type="header">Welcome</Text>
        <Text>Welcome to the Al Fajr Xaon Integrated Development Environment</Text>

        <div style={`display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;`}>
            <img src="./assets/icons.svg" width="100px" />
        </div>
    </Modal>
    
    <div class="flex flex-vertical">
        <div class="flex flex-2">
            <div class="flex-1">
                <ProjectSourceSBar />
            </div>
    
            <div class="flex-3">
                <DefinedContentArea>
                    <HorizontalSection slot="header">
                        <Tabs tabs={[
                            { name: "Main.QB" },
                            { name: "AFxTA774"}
                        ]} />
                    </HorizontalSection>
                    
                    <Editor />
                </DefinedContentArea>
            </div>
    
            <div class="flex-1">
                <ProjectJobSBar />
            </div>
        </div>

        <div class="flex flex-1">
            <Text>Tool Engine is partially implemented! Please drag a frame down to this region</Text>
        </div>
    </div>
</div>

<style lang="scss">
    @import "../assets/config";

    .root {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    .flex {
        flex: 1;
        display: flex;
        flex-direction: row;
        gap: $padding-horizontal;
        height: 100%;

        &.flex-vertical {
            flex-direction: column;
        }

        .flex-1 {
            flex: 1;
            height: 100%;
        }

        .flex-2 {
            flex: 2;
            height: 100%;
        }

        .flex-3 {
            flex: 3;
            height: 100%;
            display: flex;
        }
    }
</style>