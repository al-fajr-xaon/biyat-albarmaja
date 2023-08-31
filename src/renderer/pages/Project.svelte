<script>
    import { onMount } from "svelte"
    import Modal from "../components/Modal.svelte"
    import DefinedRow from "../components/DefinedRow.svelte"
    import HorizontalSection from "../components/HorizontalSection.svelte"
    import EqualSectionItem from "../components/EqualSectionItem.svelte"
    import Text from "../components/Text.svelte"
    import Button from "../components/Button.svelte"

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
    </Modal>
  <Text type="header"></Text>
</div>