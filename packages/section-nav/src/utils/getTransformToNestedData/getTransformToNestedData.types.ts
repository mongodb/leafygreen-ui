// Types of data supported by the getTransformToNestedData function
export const DataType = {
  FlatString: 'flatString',
} as const;

export type Data = (typeof DataType)[keyof typeof DataType];

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
  type: typeof DataType.FlatString;
}

// Signature type that transforms flat data to nested data
export type GetTransformToNestedDataReturn = (
  args: GetTransformToNestedDataArgs,
) => NestedData;
