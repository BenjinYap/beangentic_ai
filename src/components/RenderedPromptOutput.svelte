<script lang="ts">
  import { parseTextToBlocks } from "../utils/text_to_blocks";

  let props = $props();
  let blocks = $derived(parseTextToBlocks(props.output.text));
</script>

{#each blocks as block}
  <p class="text-sm">{block}</p>
{/each}