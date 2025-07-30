import type { ObjectIterator } from 'lodash';
import mapValues from 'lodash/mapValues';

/**
 * Recursively maps the values of an object using a callback function.
 */
export const deepMapValues = <TObj extends object, TReturn>(
  obj: TObj | null | undefined,
  callback: ObjectIterator<any, TReturn>,
): { [K in keyof TObj]: any } => {
  const cb: ObjectIterator<TObj, TReturn | any> = (val, key, collection) => {
    if (typeof val === 'object') {
      return deepMapValues(val, callback);
    }

    return callback(val, key, collection);
  };

  return mapValues(obj, cb);
};
