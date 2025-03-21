import { TooltipProps } from '@leafygreen-ui/tooltip';

export interface InlineDefinitionProps
  extends Partial<
    Omit<
      TooltipProps,
      | 'dismissMode'
      | 'popoverZIndex'
      | 'portalClassName'
      | 'portalContainer'
      | 'portalRef'
      | 'renderMode'
      | 'scrollContainer'
    >
  > {
  /**
   * Trigger element for the definition tooltip
   * @required
   */
  children: TooltipProps['children'];

  /**
   * ReactNode rendered inside the tooltip
   * @required
   */
  definition: React.ReactNode;

  /**
   * `className` prop passed to the Tooltip component instance
   */
  tooltipClassName?: string;
}
