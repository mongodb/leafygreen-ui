interface TruncateStartOptions {
  length: number;
  // TODO: Match this interface with lodash options
  // https://lodash.com/docs/4.17.15#truncate
}

const defaultTruncateStartOptions = {
  length: 30,
} as const;

/** Truncates a string to a given length, starting from the front */
export const truncateStart = (
  str: string,
  { length }: TruncateStartOptions = defaultTruncateStartOptions,
): string => {
  if (str.length <= length) return str;
  return str.substring(str.length - length);
};
