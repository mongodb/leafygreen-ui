export function getEnabledIndices(tabTitleElements: Array<HTMLElement>) {
  return tabTitleElements
    .filter(tabTitleEl => !tabTitleEl.hasAttribute('disabled'))
    .map(tabTitleEl => tabTitleElements.indexOf(tabTitleEl));
}
