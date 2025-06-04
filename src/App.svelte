<script>
  let prompt = $state('');
  let awd = $state('');

  async function sendPrompt() {
    await window.electron.sendPrompt(prompt);
    awd = 'hehehe';
  }
</script>

<h1>hi</h1>
<button class="border" onclick={() => window.electron.minimizeWindow()}>
  minimize
</button>
<button class="border" onclick={() => window.electron.maximizeWindow()}>
  maximize
</button>
<button class="border" onclick={() => window.electron.closeWindow()}>
  close
</button>

<p>version</p>

<input class="border" type="text" bind:value={prompt} />
<button class="border" onclick={sendPrompt}>Send</button>
<textarea class="border" bind:value={awd} />