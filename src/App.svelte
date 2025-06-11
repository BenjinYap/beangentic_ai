<script lang="ts">
  import { Conversation } from "./models/Conversation.svelte";
  import { PromptInput } from "./models/PromptInput";
  import { PromptOutputSvelte } from "./models/PromptOutput.svelte";
  import RenderedPromptOutput from "./components/RenderedPromptOutput.svelte";

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

    const pendingOutput = new PromptOutputSvelte();
    current_conversation.messages.push(pendingOutput);

    const result = await window.electron.sendPrompt({ prompt: the_prompt });
    pendingOutput.text = result.output;
    pendingOutput.usage = result.usage;
  }

  function selectConversation(conversation) {
    current_conversation = conversation;
    prompt = '';
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendPrompt();
    }
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
          class:bg-gray-700={current_conversation?.id === conversation.id}
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
      <div class="flex-grow overflow-y-auto p-4 space-y-4">
        {#each current_conversation.messages as message}
          <div class="p-2 rounded-lg relative" 
               class:ml-auto={message instanceof PromptInput}
               class:bg-blue-600={message instanceof PromptInput}
               class:bg-gray-700={message instanceof PromptOutputSvelte}
          >
            {#if message instanceof PromptInput}
              <p class="text-sm text-white">{message.text}</p>
            {:else}
              {#if !message.text}
                <div class="flex items-center justify-center">
                  <span class="typing-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                </div>
              {:else}
                <RenderedPromptOutput output={message} />
              {/if}
              {#if message.usage}
                <div class="absolute top-2 right-2 text-xs text-gray-300 flex flex-col items-end">
                  <div class="flex items-center">
                    <span class="mr-1">⬆</span>
                    <span class="text-right w-8">{message.usage.input_tokens}</span>
                  </div>
                  <div class="flex items-center">
                    <span class="mr-1">⬇</span>
                    <span class="text-right w-8">{message.usage.output_tokens}</span>
                  </div>
                </div>
              {/if}
            {/if}
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
          onkeydown={handleKeyPress}
        ></textarea>
        <button class="border px-4 py-2 bg-blue-500 text-white" onclick={sendPrompt}>
          Send
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .typing-dots span {
    display: inline-block;
    animation: blink 1.5s infinite;
  }

  .typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0%, 20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>