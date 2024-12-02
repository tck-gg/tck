export function camelCase(input: string) {
  const output = input.toLowerCase();
  return output.split(' ').reduce((s, c) => {
    return s + (c.charAt(0).toUpperCase() + c.slice(1));
  });
}

export function censor(input: string, visibleLength: number) {
  return input.replace(/./g, (_, i) => {
    return i < visibleLength ? input[i] : '*';
  });
}
