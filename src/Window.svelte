<script lang="ts">
  import App from "./App.svelte";

  const windowDecorator:boolean = true;
</script>

<div class="grid h-screen overflow-hidden" style="grid-template-rows: auto 1fr auto; grid-template-columns: auto 1fr auto;">
  <!-- Top Row -->
  <div class="border resize-handle"></div>
  <div class="border resize-handle"></div>
  <div class="border resize-handle"></div>

  <!-- Middle Row -->
  <div class="border resize-handle"></div>
  <div class="border flex flex-col overflow-hidden">
    <!-- Title Bar -->
    <div class="flex items-center justify-between bg-gray-800 text-white px-4 py-2">
      <div class="flex items-center">
        <img src="/path/to/icon.png" alt="App Icon" class="w-4 h-4 mr-2" />
        <span class="text-sm">App Title</span>
      </div>
      <div class="flex">
        <button class="border px-2 py-1 mx-1" onclick={() => window.electron.minimizeWindow()}>
          minimize
        </button>
        <button class="border px-2 py-1 mx-1" onclick={() => window.electron.maximizeWindow()}>
          maximize
        </button>
        <button class="border px-2 py-1 mx-1" onclick={() => window.electron.closeWindow()}>
          close
        </button>
      </div>
    </div>
    <!-- App Content -->
    <div class="flex-grow border overflow-auto">
      <App />
    </div>
  </div>
  <div class="border resize-handle"></div>

  <!-- Bottom Row -->
  <div class="border resize-handle"></div>
  <div class="border resize-handle"></div>
  <div class="border resize-handle"></div>
</div>


