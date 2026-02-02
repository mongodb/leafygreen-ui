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

  /**
   * Data to pass to the iframe via renderData.
   * Use this to pass any data needed by the iframe content, including `darkMode`.
   */
  iframeRenderData?: Record<string, unknown>;
}

export type { UIActionResult } from '@mcp-ui/client';
