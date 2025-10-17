import { type ComponentType, createElement, Fragment } from 'react';
import { renderToString } from 'react-dom/server';
import { createUIResource } from '@mcp-ui/server';

import { renderStylesToString } from '@leafygreen-ui/emotion';

export const DemoTwigUIRenderer = <P extends {} = {}>(
  microUI: ComponentType<P>,
  props?: P,
) => {
  // Super hacky—copy all styles from the storybook iframe to render in the mcp-ui iframe.
  // We'll want to embed the stylesheet in a better way
  const allStyleTags = Array.from(document.querySelectorAll('style'));
  const renderedStyles = createElement(
    'style',
    null,
    allStyleTags.map(s => s.innerHTML),
  );

  const renderedMicroUi = createElement<P>(microUI, props);
  const renderedFragment = createElement(Fragment, null, [
    renderedStyles,
    renderedMicroUi,
  ]);
  return renderStylesToString(renderToString(renderedFragment));
};

export const createUIResourceFromMicroUI = <P extends {} = {}>(
  microUI: ComponentType<P>,
  props?: P,
) => {
  const renderedResource = DemoTwigUIRenderer(microUI, props);
  return createUIResource({
    uri: `ui://twig-ui/${microUI.displayName}`,
    content: { type: 'rawHtml', htmlString: renderedResource },
    encoding: 'text',
  });
};
