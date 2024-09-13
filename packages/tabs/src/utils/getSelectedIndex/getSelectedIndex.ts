/**
 * If selected is a `string`, return the corresponding index, else return the index.s
 *
 * @param selected
 * @param tabTitleElements
 * @returns number
 */
export const getSelectedIndex = (
  selected: number | string,
  tabTitleElements: Array<HTMLElement>,
): number => {
  if (typeof selected === 'number') return selected;

  return tabTitleElements.findIndex(
    element => element.dataset.text === selected,
  );
};
