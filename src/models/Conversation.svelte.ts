import { PromptInput } from "./PromptInput";
import { PromptOutputSvelte } from "./PromptOutput.svelte";

const awd = `**Thin Client vs. Thick Client**
**Thin Client:**
- A lightweight computing device that depends heavily on a server for processing and data storage.
- It primarily handles input/output functions and relies on centralized servers for application execution.
- Examples include terminal devices, some web-based workstations, or devices with minimal local resources.
- Advantages:
- Easier to manage and maintain because most data and applications reside on the server.
- Cost-effective due to less powerful hardware requirements.
- Enhanced security as data resides centrally.
- Disadvantages:
- Performance depends on network performance.
- Limited functionality compared to a thick client.
**Thick Client (also called Fat Client):**
- A powerful computer that performs most processing locally, with minimal reliance on the server.
- It runs applications locally and manages data locally or in a network.
- Examples include personal computers and desktops running full applications.
- Advantages:
- Better performance and responsiveness.
- Can function independently of network connectivity for many tasks.
- More flexibility to run complex applications.
- Disadvantages:
- More expensive hardware and maintenance.
- Data and application updates need to be managed individually.
- Difficult to centrally control or secure.
**Summary:**
| Aspect | Thin Client | Thick Client |
|---------|----------------|--------------|
| Processing | On server | On local machine |
| Dependency | High on server | Low |
| Maintenance | Easier (centralized) | More complex (distributed) |
| Cost | Lower hardware costs | Higher hardware costs |
| Performance | Network-dependent | Generally faster/local execution |
Would you like more detailed information or specific use cases?`;

export class Conversation {
  public id:number = $state(0);
  public title:string = $state('');
  public messages:(PromptInput|PromptOutputSvelte)[] = $state([]);

  constructor(id:number, title:string) {
    this.id = id;
    this.title = title;
    const dwa = new PromptOutputSvelte();
    dwa.text = awd;
    dwa.usage = {output_tokens:5, input_tokens:10};
    this.messages.push(dwa);
  }
}