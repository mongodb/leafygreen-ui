import { type ComponentType, createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createUIResource } from '@mcp-ui/server';

export const DemoTwigUIRenderer = <P extends {} = {}>(
  microUI: ComponentType<P>,
  props?: P,
) => {
  return renderToString(createElement<P>(microUI, props));
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
