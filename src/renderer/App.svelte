<script lang="ts">
  import Button from "./components/Button.svelte"
  import DefinedRow from "./components/DefinedRow.svelte"
  import Text from "./components/Text.svelte"
  import EqualSectionItem from "./components/EqualSectionItem.svelte";
  import Tabs from "./components/Tabs.svelte"
  import DefinedContentArea from "./components/DefinedContentArea.svelte"
  import VR from "./components/VR.svelte"
  import HorizontalSection from "./components/HorizontalSection.svelte"
  import InputText from "./components/input/InputText.svelte"
  import ServiceHost from "./components/tabs/ServiceHost.svelte"
  import Settings from "./pages/Settings.svelte"
  import Project from "./pages/Project.svelte"
  import Frames from "./pages/Frames.svelte"
  import Information from "./pages/Information.svelte"
  import VersionControl from "./pages/VersionControl.svelte"

    let active = "Project";
    let tabs = [
        { name: "Project" },
        { name: "Frames" },
        { name: "Settings" },
        { name: "Information" },
        { name: "Version Control" }
    ]
</script>

<div class="root">
    <DefinedContentArea>
        <DefinedRow slot="header" titlebar={true}>
            <HorizontalSection>
                <img src="./assets/icons.svg" width="15px" />
                <Text line={true}>Integrated Development Environment</Text>
            </HorizontalSection>

            <HorizontalSection>
                <Tabs tabs={tabs} bind:active={active} />
            </HorizontalSection>

            <HorizontalSection align="center">
                <InputText search={true} placeholder={"App-wide search"} />
            </HorizontalSection>

            <HorizontalSection align="right">
                <EqualSectionItem>
                    <Button text="Minimize" />
                    <VR />
                    <Button text="Rescale" />
                    <VR />
                    <Button text="Close" />
                </EqualSectionItem>
            </HorizontalSection>
        </DefinedRow>

        <ServiceHost active={active} tabs={tabs}>
            <Project slot="tab-0" />
            <Frames slot="tab-1" />
            <Settings slot="tab-2" />
            <Information slot="tab-3" />
            <VersionControl slot="tab-4" />
        </ServiceHost>
    </DefinedContentArea>
</div>

<style lang="scss">
    @import "./assets/config";

    .root {
        background: $surface-secondary;
        width: calc(100vw);
        height: calc(100vh);
        display: flex;
        flex-direction: column;
        align-items: flex-start; 
        position: fixed;
        gap: $padding-vertical;
    }
</style>