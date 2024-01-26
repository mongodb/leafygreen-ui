export type InvalidDate = Omit<
  Date,
  // | 'getUTCDate'
  // | 'getUTCDay'
  // | 'getUTCFullYear'
  // | 'getUTCHours'
  // | 'getUTCMilliseconds'
  // | 'getUTCMinutes'
  // | 'getUTCMonth'
  // | 'getUTCSeconds'
  // | 'getDate'
  // | 'getDay'
  // | 'getFullYear'
  // | 'getHours'
  // | 'getMilliseconds'
  // | 'getMinutes'
  // | 'getMonth'
  // | 'getSeconds'
  | 'toLocaleDateString'
  | 'toLocaleString'
  | 'toLocaleTimeString'
  | 'toString'
  | 'toTimeString'
  | 'toUTCString'
  | 'toISOString'
  | 'toJSON'
> & {
  // getUTCDate: () => number | undefined;
  // getUTCDay: () => number | undefined;
  // getUTCFullYear: () => number | undefined;
  // getUTCHours: () => number | undefined;
  // getUTCMilliseconds: () => number | undefined;
  // getUTCMinutes: () => number | undefined;
  // getUTCMonth: () => number | undefined;
  // getUTCSeconds: () => number | undefined;
  // getDate: () => number | undefined;
  // getDay: () => number | undefined;
  // getFullYear: () => number | undefined;
  // getHours: () => number | undefined;
  // getMilliseconds: () => number | undefined;
  // getMinutes: () => number | undefined;
  // getMonth: () => number | undefined;
  // getSeconds: () => number | undefined;
  toLocaleDateString: () => 'Invalid Date';
  toLocaleString: () => 'Invalid Date';
  toLocaleTimeString: () => 'Invalid Date';
  toString: () => 'Invalid Date';
  toTimeString: () => 'Invalid Date';
  toUTCString: () => 'Invalid Date';
  toISOString: () => Error;
  toJSON: () => null;
};
