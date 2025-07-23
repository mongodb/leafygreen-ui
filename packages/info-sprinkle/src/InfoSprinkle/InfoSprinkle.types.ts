import { ComponentProps } from 'react';

import { Align, Justify, TooltipProps } from '@leafygreen-ui/tooltip';

export { Align, Justify };

type ModifiedTooltipProps = Omit<
  TooltipProps,
  | 'dismissMode'
  | 'onClick'
  | 'popoverZIndex'
  | 'portalClassName'
  | 'portalContainer'
  | 'portalRef'
  | 'refEl'
  | 'renderMode'
  | 'scrollContainer'
  | 'spacing'
  | 'trigger'
  | 'triggerEvent'
>;

export interface InfoSprinkleProps extends ModifiedTooltipProps {
  /**
   * Trigger props, excludes `ref`
   */
  triggerProps?: Omit<ComponentProps<'button'>, 'ref'>;
}
