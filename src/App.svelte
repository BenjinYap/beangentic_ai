<script>

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

<p>{window.electron.chrome()} version</p>