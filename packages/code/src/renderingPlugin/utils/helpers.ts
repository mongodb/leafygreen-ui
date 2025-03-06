import { TokenObject } from '../../highlight';

export function childrenAsKeywords(...children: Array<string>) {
  const keywords = ['function', 'class'];
  return children.filter(child => keywords.includes(child));
}

export function isArray(item: any): item is Array<any> {
  return item != null && item instanceof Array;
}

export function isObject(item: any): item is object {
  return item != null && typeof item === 'object' && !(item instanceof Array);
}

export function isString(item: any): item is string {
  return item != null && typeof item === 'string';
}

export function isNumber(item: any): item is number {
  return item != null && typeof item === 'number';
}

export function isTokenObject(item: any): item is TokenObject {
  if (item == null || typeof item !== 'object') {
    return false;
  }

  return typeof item.kind === 'string' && item.children instanceof Array;
}
