<script>
  let conversations = $state([
    { id: 1, title: "Conversation 1" },
    { id: 2, title: "Conversation 2" },
    { id: 3, title: "Conversation 3" },
  ]);
  let currentConversation = $state('');
  let prompt = $state('');
  let response = $state('');

  async function sendPrompt() {
    const result = await window.electron.sendPrompt({prompt: prompt});
    response = result.output_text || 'No response';
  }

  function selectConversation(conversation) {
    currentConversation = conversation.title;
    prompt = '';
    response = '';
  }
</script>

<div class="flex h-full">
  <!-- Conversation List -->
  <div class="w-1/4 border-r p-4">
    <h2 class="text-lg font-bold mb-4">Conversations</h2>
    <ul>
      {#each conversations as conversation}
        <li
          class="cursor-pointer p-2 hover:bg-gray-200"
          onclick={() => selectConversation(conversation)}
        >
          {conversation.title}
        </li>
      {/each}
    </ul>
  </div>

  <!-- Current Conversation -->
  <div class="w-3/4 p-4">
    <h2 class="text-lg font-bold mb-4">{currentConversation || 'Select a conversation'}</h2>
    {#if currentConversation}
      <div class="mb-4">
        <textarea
          class="border w-full p-2 mb-2"
          rows="4"
          bind:value={prompt}
          placeholder="Type your message..."
        ></textarea>
        <button class="border px-4 py-2 bg-blue-500 text-white" onclick={sendPrompt}>
          Send
        </button>
      </div>
      <div class="border p-2">
        <h3 class="font-bold mb-2">Response:</h3>
        <p>{response}</p>
      </div>
    {/if}
  </div>
</div>