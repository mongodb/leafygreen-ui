/**
 * Focuses the body element by temporarily setting the tabindex to -1.
 * @returns void
 */
export const focusBodyElement = () => {
  const originalTabIndex = document.body.getAttribute('tabindex');
  document.body.setAttribute('tabindex', '-1');
  document.body.focus();

  // Restore original tabindex
  if (originalTabIndex === null) {
    document.body.removeAttribute('tabindex');
  } else {
    document.body.setAttribute('tabindex', originalTabIndex);
  }
};
