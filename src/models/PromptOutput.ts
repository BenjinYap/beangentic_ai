type PromptUsage = {
  input_tokens: number,
  output_tokens: number,
}

export class PromptOutput {
  private output: string;
  private usage: PromptUsage;

  constructor(output:string, usage:PromptUsage) {
    this.output = output;
    this.usage = usage;
  }
}