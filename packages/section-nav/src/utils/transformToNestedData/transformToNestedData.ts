import { getFlatLevelDataToNestedData } from '../getFlatLevelDataToNestedData';

import {
  TransformDataType,
  TransformToNestedDataReturn,
} from './transformToNestedData.types';

/**
 * Converts data into a nested tree structure.
 *
 * @param data - The data to transform.
 * @returns A nested data structure where each item can have `children`, determined by its level.
 *
 */
export const transformToNestedData: TransformToNestedDataReturn = ({
  type,
  data,
}) => {
  switch (type) {
    case TransformDataType.FlatLevel:
      return getFlatLevelDataToNestedData(data);
    default:
      throw new Error(`Unsupported data type: ${type}`);
  }
};
