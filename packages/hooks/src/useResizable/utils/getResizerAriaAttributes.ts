/**
 * Generates ARIA attributes for the resizer element
 */
export const getResizerAriaAttributes = (
  size: number,
  minSize: number,
  maxSize: number,
  isVertical: boolean,
) => {
  return {
    role: 'separator', // Defines the element as an interactive divider that separates content regions.
    'aria-valuenow': size, // Represents the current position of the separator as a value between aria-valuemin and aria-valuemax.
    'aria-valuemin': minSize, //The minimum value of the separator's range.
    'aria-valuemax': maxSize, // The maximum value of the separator's range.
    'aria-orientation': isVertical ? 'vertical' : 'horizontal', // The visual orientation of the separator bar.
    'aria-label': `${isVertical ? 'Vertical' : 'Horizontal'} resize handle`, // Descriptive label
    'aria-valuetext': `${size} pixels`, // Provide size in a more readable format
  };
};
