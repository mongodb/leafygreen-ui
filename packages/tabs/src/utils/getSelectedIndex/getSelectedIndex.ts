/**
 * If value is a `string`, return the corresponding index, else return the index.
 *
 * @param value
 * @param tabTitleElements
 * @returns number
 */
export const getSelectedIndex = (
  value: number | string | undefined,
  tabTitleElements: Array<HTMLElement>,
): number => {
  if (typeof value === 'number') return value;

  return tabTitleElements.findIndex(element => element.dataset.text === value);
};
