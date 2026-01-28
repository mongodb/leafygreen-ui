import type { ComponentProps } from 'react';
import type { UIResourceRenderer as BaseUIResourceRenderer } from '@mcp-ui/client';

type BaseUIResourceRendererProps = ComponentProps<typeof BaseUIResourceRenderer>;

/** Props for configuring the HTML/iframe renderer */
export interface HTMLProps {
  /** URL for a proxy script to render external content */
  proxy?: string;
  /** Data passed to the iframe via postMessage on ready */
  iframeRenderData?: Record<string, unknown>;
  /** Whether to automatically resize the iframe based on content */
  autoResizeIframe?: boolean;
  /** Custom sandbox permissions for the iframe */
  sandboxPermissions?: string;
  /** Additional props passed to the iframe element */
  iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>;
}

export interface UIResourceRendererProps
  extends Partial<BaseUIResourceRendererProps> {
  /** The MCP UI resource to render */
  resource: BaseUIResourceRendererProps['resource'];
  /** Whether to render in dark mode. Passed to iframe via renderData. */
  darkMode?: boolean;
  /** Props passed to the underlying HTML/iframe renderer */
  htmlProps?: HTMLProps;
}

// Re-export useful types from @mcp-ui/client
export type { UIActionResult } from '@mcp-ui/client';
