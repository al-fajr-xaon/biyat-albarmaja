<script lang="ts">
  import Button from "./components/Button.svelte"
  import DefinedRow from "./components/DefinedRow.svelte"
  import EqualSection from "./components/EqualSection.svelte";
  import Input from "./components/Input.svelte"
</script>

<div class="root">
    <DefinedRow>
        <EqualSection>
            <EqualSection>
                <Button text="Hello World" />
                <Button text="Mute Speaker" icon="🔇" />
            </EqualSection>
            
            <EqualSection align="center">
                <Input type="search" />
            </EqualSection>

            <EqualSection align="end">
                <Button text="Hello World" />
                <Button text="Mute Speaker" icon="🔇" />
            </EqualSection>
        </EqualSection>
    </DefinedRow>
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