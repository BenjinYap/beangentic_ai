type PromptUsage = {
  input_tokens: number,
  output_tokens: number,
}

export class PromptOutput {
  private text: string;
  private usage: PromptUsage;

  constructor(text:string, usage:PromptUsage) {
    this.text = text;
    this.usage = usage;
  }
}