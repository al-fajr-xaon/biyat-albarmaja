<script lang="ts">
  import Button from "./components/Button.svelte"
  import DefinedContentArea from "./components/DefinedContentArea.svelte"
  import DefinedRow from "./components/DefinedRow.svelte"
  import Dragger from "./components/Dragger.svelte"
  import EqualSection from "./components/EqualSection.svelte";
  import Input from "./components/Input.svelte"
  import Text from "./components/Text.svelte"
</script>

<div class="root">
    <DefinedRow>
        <EqualSection>
            <EqualSection>
                <Text>AFxTD64</Text>

                <Button text="Project" />
                <Button text="Settings" />
            </EqualSection>
            
            <EqualSection align="center">
                <Input type="search" />
            </EqualSection>

            <EqualSection align="end">
                <Dragger />

                <Button text="Minimize" />
                <Button text="Close" type="primary" />
            </EqualSection>
        </EqualSection>
    </DefinedRow>

    <EqualSection>
        <DefinedContentArea flex={1}>
            Side Bar
        </DefinedContentArea>

        <DefinedContentArea flex={2}>
            Side Bar
        </DefinedContentArea>

        <DefinedContentArea flex={1}>
            Side Bar
        </DefinedContentArea>
    </EqualSection>
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
        gap: $stroke-width;
    }
</style>