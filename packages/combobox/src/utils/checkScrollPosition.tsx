/**
 *
 * Checks if a bottom overflow shadow should be visible when overflow === expand-y
 *
 * @param element
 * @returns `boolean`
 * @internal
 */
export const checkScrollPosition = (element: HTMLElement) => {
  const { scrollHeight, scrollTop, clientHeight } = element;
  // Position when the container is scrolled all the way to the bottom
  const maxScrollPosition = scrollHeight - clientHeight;

  // If the scrollTop position is less than the maxScrollPosition then we will show the shadow.
  if (scrollTop < maxScrollPosition) {
    return true;
  }

  return false;
};
