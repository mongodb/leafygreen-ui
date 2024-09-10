/**
 * Returns whether ElementA precedes ElementAB in the DOM
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
 *
 * @internal
 */
export function isElementPreceding(elemA: HTMLElement, elemB: HTMLElement) {
  return Boolean(
    elemB.compareDocumentPosition(elemA) & Node.DOCUMENT_POSITION_PRECEDING,
  );
}
