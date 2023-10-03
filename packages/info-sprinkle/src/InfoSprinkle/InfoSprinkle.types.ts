import { Align, Justify, TooltipProps } from '@leafygreen-ui/tooltip';

export { Align, Justify };

type ModifiedTooltipProps = Omit<
  TooltipProps,
  'onClick' | 'trigger' | 'triggerEvent' | 'refEl' | 'children'
>;

export interface InfoSprinkleProps extends ModifiedTooltipProps {
  children: string;
}
