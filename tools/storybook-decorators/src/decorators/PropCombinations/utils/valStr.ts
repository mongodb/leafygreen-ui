/**
 * @returns the provided value as a string
 */
export function valStr(val: any): string {
  const MAX_STR_LEN = 24;

  if (typeof val === 'object') {
    if (val.type) {
      if (typeof val.type === 'string') return `<${val.type} />`;
      return `<${val.type.displayName} />` ?? 'JSX Element';
    }

    if (Array.isArray(val)) return 'Array';
    else return 'Object';
  }

  if (typeof val === 'string') {
    return `"${
      val.length > MAX_STR_LEN ? val.slice(0, MAX_STR_LEN) + '…' : val
    }"`;
  }

  return `${val}`;
}
