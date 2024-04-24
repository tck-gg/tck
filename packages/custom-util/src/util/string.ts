export function camelCase(input: string) {
  const output = input.toLowerCase();
  return output.split(' ').reduce((s, c) => {
    return s + (c.charAt(0).toUpperCase() + c.slice(1));
  });
}
