import React, { ComponentType } from 'react';
import { UIResourceRenderer } from '@mcp-ui/client';
import { Decorator } from '@storybook/react';

import { createUIResourceFromMicroUI } from './DemoUIRenderer';
import { MCPUIStoryArgs } from './LeafyGreenMCPUIDecorator.types';

export const LeafyGreenMCPUIDecorator: Decorator<MCPUIStoryArgs> = (
  _StoryFn,
  context,
) => {
  const { args } = context;

  const µui: ComponentType | undefined =
    context.parameters.mcpui.component || context.component;

  if (!µui) {
    return <>No MicroUI component provided</>;
  }

  const uiResource = createUIResourceFromMicroUI(µui, args);

  // return <div>TBD {µui.displayName}</div>;
  return <UIResourceRenderer resource={uiResource.resource} />;
};
