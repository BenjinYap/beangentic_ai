import { PromptInput } from "./PromptInput";
import { PromptOutput } from "./PromptOutput";

const awd = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  
Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.`;

export class Conversation {
  public id:number = $state(0);
  public title:string = $state('');
  public messages:(PromptInput|PromptOutput)[] = $state([]);

  constructor(id:number, title:string) {
    this.id = id;
    this.title = title;
    this.messages.push(new PromptOutput(awd, {output_tokens:5, input_tokens:10}));
  }
}