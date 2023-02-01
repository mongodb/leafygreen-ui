import { HTMLElementProps } from '@leafygreen-ui/lib';

type ExcludeFromTypeInference<T> = [T][T extends any ? 0 : never];

export interface TsTestProps<T extends number> extends HTMLElementProps<'div'> {
  value: ExcludeFromTypeInference<T>;
  options: Array<T>;
}
