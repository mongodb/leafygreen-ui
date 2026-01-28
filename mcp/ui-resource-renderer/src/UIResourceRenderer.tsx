import React from 'react';
import { UIResourceRenderer as BaseUIResourceRenderer } from '@mcp-ui/client';

import { UIResourceRendererProps } from './UIResourceRenderer.types';

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
