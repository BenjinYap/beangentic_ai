type PromptUsage = {
  input_tokens: number,
  output_tokens: number,
}

export class PromptOutputSvelte {
  public text: string = $state('');
  public usage: PromptUsage|null = $state(null);

  // constructor(text:string, usage:PromptUsage) {
  //   this.text = text;
  //   this.usage = usage;
  // }
}