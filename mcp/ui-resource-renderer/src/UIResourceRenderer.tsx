import React from 'react';
import { UIResourceRenderer as BaseUIResourceRenderer } from '@mcp-ui/client';

import { UIResourceRendererProps } from './UIResourceRenderer.types';

/**
 * Wrapper around @mcp-ui/client's UIResourceRenderer that provides
 * default configurations for rendering MCP UI resources.
 *
 * Features:
 * - Automatic iframe resizing enabled by default
 * - Passes darkMode to iframe via renderData
 * - Forwards all other props to the underlying component
 */
export function UIResourceRenderer({
  darkMode,
  htmlProps,
  ...props
}: UIResourceRendererProps) {
  return (
    <BaseUIResourceRenderer
      {...props}
      htmlProps={{
        autoResizeIframe: true,
        iframeRenderData: { darkMode },
        ...htmlProps,
      }}
    />
  );
}
