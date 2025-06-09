import { PromptInput } from "./PromptInput";
import { PromptOutput } from "./PromptOutput";

export class Conversation {
  private id:number = $state(0);
  private title:string = $state('');
  private messages:(PromptInput|PromptOutput)[] = $state([]);

  constructor(id:number, title:string) {
    this.id = id;
    this.title = title;
  }
}