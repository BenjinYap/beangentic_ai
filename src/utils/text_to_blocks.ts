export function parseTextToBlocks(text:string) {
  const blocks:Array = [];
  text.split('\n').forEach((line) => {
    blocks.push(line);
  });
  return blocks;
}