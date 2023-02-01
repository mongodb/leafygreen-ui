type ExcludeFromTypeInference<T> = [T][T extends any ? 0 : never];

export interface TsTestProps<T extends number> {
  value: ExcludeFromTypeInference<T>;
  options: Array<T>;
}
