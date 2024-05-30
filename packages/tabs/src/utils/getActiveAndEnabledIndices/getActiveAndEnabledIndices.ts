export function getActiveAndEnabledIndices(
  tabTitleElements: Array<HTMLElement>,
  selected: number,
) {
  const enabledIndices = tabTitleElements
    .filter(tabTitleEl => !tabTitleEl.hasAttribute('disabled'))
    .map(tabTitleEl => tabTitleElements.indexOf(tabTitleEl));

  const activeIndex = enabledIndices.indexOf(selected);

  return { activeIndex, enabledIndices };
}
