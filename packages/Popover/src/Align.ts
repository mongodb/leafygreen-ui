/**
 * Options to determine the alignment of the popover relative to
 * the other component
 * @param Top will align content above other element
 * @param Bottom will align content below other element
 * @param Left will align content to the left of other element
 * @param Right will align content to the right of other element
 */
const Align = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
} as const;

type Align = typeof Align[keyof typeof Align];

export default Align;
