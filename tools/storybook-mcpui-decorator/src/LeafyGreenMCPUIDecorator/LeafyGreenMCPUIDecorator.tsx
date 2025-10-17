import React, { ComponentType, useEffect, useState } from 'react';
import {
  basicComponentLibrary,
  remoteButtonDefinition,
  UIActionResult,
  UIResourceRenderer,
} from '@mcp-ui/client';
import { Decorator } from '@storybook/react';

import {
  createUIResourceFromMicroUIAsEmbeddedUrl,
  createUIResourceFromMicroUIAsRemoteDom,
} from './DemoUIRenderer';
import { MCPUIStoryArgs } from './LeafyGreenMCPUIDecorator.types';

export const LeafyGreenMCPUIDecorator: Decorator<MCPUIStoryArgs> = (
  _StoryFn,
  context,
) => {
  const { args } = context;

  const [uiResource, setUiResource] = useState<any>();

  useEffect(() => {
    const fetchUIResource = async () => {
      const µui: ComponentType | undefined =
        context.parameters.mcpui.component || context.component;

      if (!µui) {
        setUiResource(undefined);
        return;
      }

      const uiResource = await createUIResourceFromMicroUIAsEmbeddedUrl(
        µui,
        args,
      );
      // const uiResource = createUIResourceFromMicroUIAsRemoteDom(µui, args);

      setUiResource(uiResource);
    };

    fetchUIResource();
  }, [args, context.component, context.parameters.mcpui.component]);

  // Get a MCP-UI object from ReactObject

  const handleUIAction = async (result: UIActionResult) => {
    // eslint-disable-next-line no-console
    console.log(result);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      // eslint-disable-next-line no-console
      console.log(event.data.source);
    };

    window.addEventListener('message', listener);

    return () => window.removeEventListener('message', listener);
  }, []);

  if (!uiResource) {
    return <>No MicroUI component provided</>;
  }

  return (
    <UIResourceRenderer
      resource={uiResource.resource}
      onUIAction={handleUIAction}
      remoteDomProps={{
        library: basicComponentLibrary,
        remoteElements: [remoteButtonDefinition],
      }}
    />
  );
};
