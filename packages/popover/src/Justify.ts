/**
 * Options to determine the justification of the popover relative to
 * the other component
 * @param Start will justify content against the start of other element
 * @param Middle will justify content against the middle of other element
 * @param Bottom will justify content against the end of other element
 */
const Justify = {
  Start: 'start',
  Middle: 'middle',
  End: 'end',
} as const;

type Justify = typeof Justify[keyof typeof Justify];

export default Justify;
