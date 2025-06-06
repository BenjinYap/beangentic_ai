<script>
  let conversations = $state([
    { id: 1, title: "Conversation 1" },
    { id: 2, title: "Conversation 2" },
    { id: 3, title: "Conversation 3" },
  ]);
  let currentConversation = $state(conversations[0]?.title || ''); // Auto-select Conversation 1
  let prompt = $state('');
  let response = $state('');
  let messages = $state([]); // Array to store conversation messages

  async function sendPrompt() {
    if (prompt.trim() === '') return;
    messages.push({ sender: 'user', text: prompt });
    const result = await window.electron.sendPrompt({ prompt: prompt });
    messages.push({ sender: 'ai', text: result.output_text || 'No response' });
    prompt = '';
  }

  function selectConversation(conversation) {
    currentConversation = conversation.title;
    prompt = '';
    response = '';
    messages = []; // Reset messages for the new conversation
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
  <div class="w-3/4 flex flex-col">
    <h2 class="text-lg font-bold p-4 border-b">{currentConversation || 'Select a conversation'}</h2>
    {#if currentConversation}
      <!-- Messages Area -->
      <div class="flex-grow overflow-y-auto p-4 space-y-4">
        {#each messages as message}
          <div class="p-2 rounded-lg" 
               class:ml-auto={message.sender === 'user'} 
               class:bg-blue-600={message.sender === 'user'} 
               class:bg-gray-700={message.sender === 'ai'}
          >
            <p class="text-sm">{message.text}</p>
          </div>
        {/each}
      </div>

      <!-- Input Area -->
      <div class="p-4 border-t flex items-center space-x-2">
        <textarea
          class="border w-full p-2 resize-none"
          rows="2"
          bind:value={prompt}
          placeholder="Type your message..."
        ></textarea>
        <button class="border px-4 py-2 bg-blue-500 text-white" onclick={sendPrompt}>
          Send
        </button>
      </div>
    {/if}
  </div>
</div>