// Types of data supported by the getTransformToNestedData function
export const TransformDataType = {
  FlatLevel: 'flatLevel',
} as const;

export type TransformDataType =
  (typeof TransformDataType)[keyof typeof TransformDataType];

// Flat data structure used for transformation
export type FlatLevelData = Array<{
  level: number;
  [key: string]: any; // Allows for additional properties
}>;

// The sturture of each item in the nested data
export interface NestedDataItem {
  children: Array<NestedDataItem>;
  [key: string]: any; // Allows for additional properties
}

// Nested data structure resulting from the transformation
export type NestedData = Array<NestedDataItem>;

// If we introduce more data types, we can make this a discriminated union
export interface GetTransformToNestedDataArgs {
  data: FlatLevelData;
  type: typeof TransformDataType.FlatLevel;
}

// Signature type that transforms flat data to nested data
export type GetTransformToNestedDataReturn = (
  args: GetTransformToNestedDataArgs,
) => NestedData;
