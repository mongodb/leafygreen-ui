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
