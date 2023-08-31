<script lang="ts">
  import DefinedContentArea from "../../components/DefinedContentArea.svelte"
  import HorizontalSection from "../../components/HorizontalSection.svelte"
    import ItemList from "../../components/ItemList.svelte"
  import Tabs from "../../components/Tabs.svelte"
  import type { TabPage } from "../../components/tabs/tab_page"

    let tabs: TabPage[] = [
        { name: "Environments" },
        { name: "Services" },
        { name: "Tests" }
    ]

    let active = "Environments"
</script>

<div class="root">
    <DefinedContentArea>
        <HorizontalSection slot="header">
            <Tabs tabs={tabs} active={active} />
        </HorizontalSection>

        <ItemList items={[
            {
                label: "Emulation Service",
                description: "Started 2 minutes ago",
                image: "./assets/icons.svg"
            },
            {
                label: "Compiler & Build Tool",
                description: "Started 2 minutes ago",
            }
        ]} />
    </DefinedContentArea>
</div>

<style lang="scss">
    @import "../../assets/config";

    .root {
        height: 100%;
    }
</style>