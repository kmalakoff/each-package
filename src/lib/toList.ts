// string | string[] | undefined -> trimmed, non-empty entries split on commas
export default function toList(value: unknown): string[] {
  if (value === undefined || value === null || value === true || value === false) return [];
  const items = Array.isArray(value) ? value : [value];
  const result: string[] = [];
  for (let i = 0; i < items.length; i++) {
    const parts = String(items[i]).split(',');
    for (let j = 0; j < parts.length; j++) {
      if (parts[j] !== '') result.push(parts[j]);
    }
  }
  return result;
}
