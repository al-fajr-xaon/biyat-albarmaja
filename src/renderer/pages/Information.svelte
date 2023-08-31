<script>
    import { onMount } from "svelte";
    import Button from "../components/Button.svelte"
    import DefinedRow from "../components/DefinedRow.svelte"
    import EqualSectionItem from "../components/EqualSectionItem.svelte"
    import HorizontalSection from "../components/HorizontalSection.svelte"
    import Modal from "../components/Modal.svelte"
    import Text from "../components/Text.svelte"
  import Hr from "../components/HR.svelte"
</script>

<Text type="header">Al Fajr Xaon - Software Development Environment</Text>
<Text type="sub title">Version: 0.0.0</Text>
<Text type="sub title">Graphics Engine: Adrenaline</Text>

<Hr />
<EqualSectionItem>
    <Button text="Reset all settings" on_click={() => {
        localStorage.clear();
        location.reload();
    }} />
</EqualSectionItem>

<style lang="scss">
    @import "../assets/config";

    img {
        width: 100%;
        display: flex;
        border-radius: $control-radius;
        border: $stroke;
    }
</style>