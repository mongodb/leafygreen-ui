/**
 * Copied from [dom-testing-library](https://github.com/testing-library/dom-testing-library/blob/bd04cf95a1ed85a2238f7dfc1a77d5d16b4f59dc/src/helpers.ts#L65) since this function is not exported.
 * @param container
 */

export function checkContainerType(container: unknown) {
  if (
    !container ||
    !(typeof (container as any).querySelector === 'function') ||
    !(typeof (container as any).querySelectorAll === 'function')
  ) {
    throw new TypeError(
      `Expected container to be an Element, a Document or a DocumentFragment but got ${getTypeName(
        container,
      )}.`,
    );
  }

  function getTypeName(object: unknown) {
    if (typeof object === 'object') {
      return object === null ? 'null' : object.constructor.name;
    }

    return typeof object;
  }
}
