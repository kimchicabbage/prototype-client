export function pascalToSnake(pascalCaseString: string): string {
  return pascalCaseString
    .replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
    .slice(1);
}

export function pascalToKebab(pascalCaseString: string): string {
    return pascalCaseString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}