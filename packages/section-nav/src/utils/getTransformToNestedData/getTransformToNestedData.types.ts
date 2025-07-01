// Types of data supported by the getTransformToNestedData function
export const TransformDataType = {
  FlatString: 'flatString',
} as const;

export type TransformDataType =
  (typeof TransformDataType)[keyof typeof TransformDataType];

// Flat data structure used for transformation
export type FlatData = Array<{
  level: number;
  id: string;
  label: string;
}>;

// The sturture of each item in the nested data
export interface NestedDataItem {
  id: string;
  label: string;
  children: Array<NestedDataItem>;
}

// Nested data structure resulting from the transformation
export type NestedData = Array<NestedDataItem>;

// If we introduce more data types, we can make this a discriminated union
export interface GetTransformToNestedDataArgs {
  data: FlatData;
  type: typeof TransformDataType.FlatString;
}

// Signature type that transforms flat data to nested data
export type GetTransformToNestedDataReturn = (
  args: GetTransformToNestedDataArgs,
) => NestedData;
