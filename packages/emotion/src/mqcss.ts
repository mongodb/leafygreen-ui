import { ObjectInterpolation } from 'create-emotion';
import { breakpoints } from '@leafygreen-ui/tokens';
import emotion, { LGInterpolation } from './emotion';

export type LGCSSInterpolation<MP = undefined> = Exclude<
  LGInterpolation<MP>,
  Array<ObjectInterpolation<MP>>
>;

type BreakpointsTuple = [
  Mobile: number,
  Tablet: number,
  Desktop: number,
  XLDesktop: number,
];

const breakpointsArray = Object.values(breakpoints) as BreakpointsTuple;

// AllSubTuples<BreakpointsTuple> =
//   | [Mobile: number]
//   | [Mobile: number, Tablet: number]
//   | ... ;
// Change this to use recursive conditional types when we upgrade to TS 4.1
type AllSubTuples<SubTuple> =
  | SubTuple
  | {
      0: SubTuple;
      1: SubTuple extends [...infer Rest, infer Last]
        ? AllSubTuples<Rest>
        : never;
    }[SubTuple extends [unknown] ? 0 : 1];

type MapTuple<Tuple extends Array<unknown>, Value> = {
  [K in keyof Tuple]: Value;
};

type StyleValues<T> = MapTuple<AllSubTuples<BreakpointsTuple>, T>;

function getValueByBreakpointIndex<T>(
  index: number,
  values: StyleValues<T>,
): T {
  return values[Math.min(values.length - 1, index)];
}

function computeClassName(
  index: number,
  strings: TemplateStringsArray,
  args: Array<LGCSSInterpolation | StyleValues<LGCSSInterpolation>>,
) {
  return emotion.css(
    strings,
    ...args.map(arg => {
      if (arg instanceof Array) {
        return getValueByBreakpointIndex(index, arg);
      } else {
        return arg;
      }
    }),
  );
}

export default function mqcss(
  strings: TemplateStringsArray,
  ...args: Array<LGCSSInterpolation | StyleValues<LGCSSInterpolation>>
) {
  // use this so we don't bother generating media queries for unused breakpoints
  const maxBreakpointsUsed = Math.max(
    ...args.map(arg => (arg instanceof Array ? arg.length - 1 : 0)),
  );

  return emotion.css(
    computeClassName(maxBreakpointsUsed, strings, args),
    ...breakpointsArray
      .slice(0, maxBreakpointsUsed)
      .map((breakpoint, index) => ({
        [`@media only screen and (max-width: ${breakpoint}px)`]: computeClassName(
          index,
          strings,
          args,
        ),
      }))
      .reverse(),
  );
}
