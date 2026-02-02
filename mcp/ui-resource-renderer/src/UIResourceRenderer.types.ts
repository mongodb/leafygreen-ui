import type { ComponentProps } from 'react';
import type { UIResourceRenderer as BaseUIResourceRenderer } from '@mcp-ui/client';

type BaseUIResourceRendererProps = ComponentProps<
  typeof BaseUIResourceRenderer
>;

export interface UIResourceRendererProps
  extends Omit<
    Partial<BaseUIResourceRendererProps>,
    'supportedContentTypes' | 'remoteDomProps'
  > {
  /** The MCP UI resource to render */
  resource: BaseUIResourceRendererProps['resource'];

  /** Whether to render in dark mode. Passed to iframe via renderData. */
  darkMode?: boolean;

  /**
   * Additional data to pass to the iframe via renderData.
   * This is merged with `darkMode` (which cannot be overridden here).
   */
  iframeRenderData?: Record<string, unknown>;
}

export type { UIActionResult } from '@mcp-ui/client';
