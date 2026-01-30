import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import {
  color,
  fontFamilies,
  fontWeights,
  spacing,
} from '@leafygreen-ui/tokens';

import { UIResourceRenderer } from './UIResourceRenderer';
import { UIResourceRendererProps } from './UIResourceRenderer.types';

const CONTAINER_HEIGHT = 340;

function createMockUIResource(htmlContent: string) {
  return {
    uri: 'ui://mcp-server/example-resource',
    mimeType: 'text/html' as const,
    text: htmlContent,
  };
}

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: ${fontFamilies.default};
      font-weight: ${fontWeights.regular};
      margin: 0;
      padding: ${spacing[400]}px;
      background: ${color.light.background.secondary.default};
      color: ${color.light.text.primary.default};
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - ${spacing[400] * 2}px);
    }
    body.dark {
      background: ${color.dark.background.secondary.default};
      color: ${color.dark.text.primary.default};
    }
    .card {
      border: 1px solid ${color.light.border.primary.default};
      border-radius: ${spacing[200]}px;
      padding: ${spacing[400]}px;
      max-width: 400px;
    }
    .dark .card {
      border-color: ${color.dark.border.primary.default};
    }
    h2 {
      margin: 0 0 ${spacing[300]}px 0;
      font-size: 18px;
      font-weight: ${fontWeights.semiBold};
    }
    p { margin: 0 0 ${spacing[200]}px 0; font-size: 14px; }
    strong { font-weight: ${fontWeights.medium}; }
    pre {
      font-family: ${fontFamilies.code};
      background: ${color.light.background.secondary.default};
      padding: ${spacing[200]}px;
      border-radius: ${spacing[100]}px;
      font-size: 12px;
      overflow: auto;
    }
    .dark pre {
      background: ${color.dark.background.secondary.default};
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>MCP UI Resource</h2>
    <p>Dark mode: <strong id="darkMode">loading...</strong></p>
    <p>Render data received:</p>
    <pre id="renderData">loading...</pre>
  </div>
  <script>
    // Listen for render data from parent window
    window.addEventListener('message', (event) => {
      if (event.data?.type !== 'ui-lifecycle-iframe-render-data') {
        return;
      }
      const data = event.data.payload?.renderData;
      if (!data) return;
      
      document.getElementById('darkMode').textContent = String(data.darkMode);
      document.getElementById('renderData').textContent = JSON.stringify(data, null, 2);
      if (data.darkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    });

    // Signal to parent that iframe is ready to receive data
    window.parent.postMessage({ type: 'ui-lifecycle-iframe-ready' }, '*');
  </script>
</body>
</html>
`;

const meta: StoryMetaType<typeof UIResourceRenderer> = {
  title: 'MCP/UIResourceRenderer',
  component: UIResourceRenderer,
  argTypes: {
    darkMode: {
      control: 'boolean',
      description:
        'Render data is only sent once on mount. Changing this requires remounting the component to take effect.',
    },
  },
  parameters: {
    default: 'LiveExample',
  },
};

export default meta;

const Template: StoryFn<UIResourceRendererProps> = args => (
  <div style={{ width: '100%', height: CONTAINER_HEIGHT }}>
    <UIResourceRenderer {...args} />
  </div>
);

export const LiveExample = Template.bind({});
LiveExample.args = {
  resource: createMockUIResource(htmlContent),
  darkMode: false,
  iframeRenderData: {
    clusterName: 'my-cluster',
    databases: ['admin', 'local', 'config'],
  },
};
