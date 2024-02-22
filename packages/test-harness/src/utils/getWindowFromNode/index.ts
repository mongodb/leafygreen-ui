export function getWindowFromNode(node: any) {
  if (node.defaultView) {
    // node is document
    return node.defaultView;
  } else if (node.ownerDocument && node.ownerDocument.defaultView) {
    // node is a DOM node
    return node.ownerDocument.defaultView;
  } else if (node.window) {
    // node is window
    return node.window;
  } else if (node.ownerDocument && node.ownerDocument.defaultView === null) {
    throw new Error(
      `It looks like the window object is not available for the provided node.`,
    );
  } else if (node.then instanceof Function) {
    throw new Error(
      `It looks like you passed a Promise object instead of a DOM node. Did you do something like \`fireEvent.click(screen.findBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`, or await the findBy query \`fireEvent.click(await screen.findBy...\`?`,
    );
  } else if (Array.isArray(node)) {
    throw new Error(
      `It looks like you passed an Array instead of a DOM node. Did you do something like \`fireEvent.click(screen.getAllBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`?`,
    );
  } else if (
    typeof node.debug === 'function' &&
    typeof node.logTestingPlaygroundURL === 'function'
  ) {
    throw new Error(
      `It looks like you passed a \`screen\` object. Did you do something like \`fireEvent.click(screen, ...\` when you meant to use a query, e.g. \`fireEvent.click(screen.getBy..., \`?`,
    );
  } else {
    // The user passed something unusual to a calling function
    throw new Error(
      `The given node is not an Element, the node type is: ${typeof node}.`,
    );
  }
}
