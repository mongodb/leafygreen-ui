import isObject from 'lodash/isObject';
import omit from 'lodash/omit';

export function deepOmit(obj: Record<string, any>, paths: Array<string>) {
  const omittedObject: Record<string, any> = omit(obj, paths);

  for (const key in omittedObject) {
    const value = omittedObject[key];

    if (isObject(value)) {
      omittedObject[key] = deepOmit(omittedObject[key], paths);
    }
  }

  return omittedObject;
}
