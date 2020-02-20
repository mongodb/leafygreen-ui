import { Matcher, MatcherOptions } from '@testing-library/react';

type Nullable<T> = T | null;
type NullableArray<T> = Array<T> | null;

export type nullableElement = Nullable<HTMLElement>;
export type nullableElementArray = NullableArray<HTMLElement>;

type queryFn<T> = (text: Matcher, options?: MatcherOptions | undefined) => T;
type queryType = queryFn<nullableElement>;
type queryAllType = queryFn<nullableElementArray>;

export type Queries = {
  queryByTestId?: queryType;
  queryAllByTestId?: queryAllType;
};
