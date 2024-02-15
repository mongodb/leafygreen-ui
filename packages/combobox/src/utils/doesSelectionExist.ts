import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';

import { SelectValueType } from '../types';

export const doesSelectionExist = <M extends boolean>(
  selection?: SelectValueType<M> | null,
): boolean => {
  return (
    !isUndefined(selection) &&
    !isNull(selection) &&
    (isString(selection) || (isArray(selection) && selection.length > 0))
  );
};
