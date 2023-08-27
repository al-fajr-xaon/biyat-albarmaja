<script lang="ts">
    import { Fetcher } from "./server/fetcher"
</script>

<div>
  { new Fetcher().get_test() } Response from RUST
</div>