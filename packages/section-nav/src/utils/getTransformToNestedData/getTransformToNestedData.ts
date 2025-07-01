import { getFlatStringDataToNestedData } from '../getFlatStringDataToNestedData';

import {
  GetTransformToNestedDataReturn,
  TransformDataType,
} from './getTransformToNestedData.types';

/**
 * Converts data into a nested tree structure.
 *
 * @param data - The data to transform.
 * @returns A nested data structure where each item can have `children`, determined by its level.
 *
 */
export const getTransformToNestedData: GetTransformToNestedDataReturn = ({
  type,
  data,
}) => {
  switch (type) {
    case TransformDataType.FlatString:
      return getFlatStringDataToNestedData(data);
    default:
      throw new Error(`Unsupported data type: ${type}`);
  }
};
