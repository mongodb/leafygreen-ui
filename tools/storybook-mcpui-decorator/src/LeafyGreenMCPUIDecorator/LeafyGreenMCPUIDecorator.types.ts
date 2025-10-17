import { ComponentType } from 'react';
import { type UIResource } from '@mcp-ui/server';
import { Decorator, Meta, StoryObj } from '@storybook/react';

export interface MCPStoryMetaType extends Omit<Meta, 'decorators'> {
  decorators?: Array<Decorator | Decorator<MCPUIStoryArgs>>;
}

export interface MCPUIStoryArgs {
  uiResource: UIResource;
}
export interface MCPUIResourceStoryObj extends StoryObj {
  /** @deprecated */
  render?: StoryObj['render'];
  parameters?: {
    mcpui?: {
      component: ComponentType;
    };
  } & StoryObj['parameters'];
}
