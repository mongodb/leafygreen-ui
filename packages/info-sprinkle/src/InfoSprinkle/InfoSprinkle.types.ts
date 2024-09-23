import { ComponentProps } from 'react';

import { Align, Justify, TooltipProps } from '@leafygreen-ui/tooltip';

export { Align, Justify };

type ModifiedTooltipProps = Omit<
  TooltipProps,
  'onClick' | 'trigger' | 'triggerEvent' | 'refEl' | 'spacing'
>;

export interface InfoSprinkleProps extends ModifiedTooltipProps {
  /**
   * Trigger props, excludes `ref`
   */
  triggerProps?: Omit<ComponentProps<'button'>, 'ref'>;
}
