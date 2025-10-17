import { ChartHelloWorldMicroUI, HelloWorldMicroUI } from './HelloWorldMicroUI';
import { LeafyGreenMCPUIDecorator } from './LeafyGreenMCPUIDecorator';
import {
  MCPStoryMetaType,
  MCPUIResourceStoryObj,
} from './LeafyGreenMCPUIDecorator.types';

export default {
  title: 'MCP/MCPUI Demo',
  component: HelloWorldMicroUI,
  decorators: [LeafyGreenMCPUIDecorator],
  parameters: {
    default: null,
  },
} satisfies MCPStoryMetaType;

export const HelloWorld: MCPUIResourceStoryObj = {
  parameters: {
    mcpui: {
      component: HelloWorldMicroUI,
    },
  },
};

export const ChartHelloWorld: MCPUIResourceStoryObj = {
  parameters: {
    mcpui: {
      component: ChartHelloWorldMicroUI,
    },
  },
};
