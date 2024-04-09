/**
 * Copied from [dom-testing-library](https://github.com/testing-library/dom-testing-library/blob/main/src/helpers.ts#L21) since this function is not exported.
 * @returns Document
 */

export function getDocument() {
  if (typeof window === 'undefined') {
    return;
  }

  return window.document;
}
