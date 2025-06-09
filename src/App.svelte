<script lang="ts">
  import { Conversation } from "./models/Conversation.svelte";
  import { PromptInput } from "./models/PromptInput";
  import { PromptOutput } from "./models/PromptOutput";

  let conversations:Conversation[] = $state([
    new Conversation(1, 'Conversation 1'),
    new Conversation(2, 'Conversation 2'),
  ]);
  let current_conversation:Conversation|null = $state(conversations[0]);
  let prompt = $state('');

  async function sendPrompt() {
    if (prompt.trim() === '') {
      return;
    }
    const the_prompt = prompt;
    current_conversation.messages.push(new PromptInput(the_prompt));
    prompt = '';
    const result = await window.electron.sendPrompt({ prompt: the_prompt });
    current_conversation.messages.push(new PromptOutput(result.output, result.usage));
  }

  $effect(() => {
    console.log(conversations);
  });

  function selectConversation(conversation) {
    current_conversation = conversation;
    prompt = '';
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
    <h2 class="text-lg font-bold p-4 border-b">{current_conversation.title || 'Select a conversation'}</h2>
    {#if current_conversation}
      <!-- Messages Area -->
      <div class="flex-grow overflow-y-auto p-4 space-y-4">
        {#each current_conversation.messages as message}
          <div class="p-2 rounded-lg" 
               class:ml-auto={message instanceof PromptInput}
               class:bg-blue-600={message instanceof PromptInput}
               class:bg-gray-700={message instanceof PromptOutput}
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