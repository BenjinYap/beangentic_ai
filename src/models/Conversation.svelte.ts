import { PromptInput } from "./PromptInput";
import { PromptOutput } from "./PromptOutput";

export class Conversation {
  public id:number = $state(0);
  public title:string = $state('');
  public messages:(PromptInput|PromptOutput)[] = $state([]);

  constructor(id:number, title:string) {
    this.id = id;
    this.title = title;
  }
}