/**
 * @param selected
 * @param tabTitleElements
 * @returns Returns the corresponding index for a selected string
 */
export const getSelectedIndex = (
  selected: number | string,
  tabTitleElements: Array<HTMLElement>,
) => {
  if (typeof selected === 'number') return selected;

  return tabTitleElements.findIndex(
    element => element.dataset.text === selected,
  );
};
