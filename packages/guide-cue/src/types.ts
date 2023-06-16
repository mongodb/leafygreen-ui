import { DarkModeProps } from '@leafygreen-ui/lib';
import { Align, Justify } from '@leafygreen-ui/popover';
import { TooltipProps } from '@leafygreen-ui/tooltip';

export const TooltipAlign = {
  Top: Align.Top,
  Bottom: Align.Bottom,
  Left: Align.Left,
  Right: Align.Right,
} as const;

export type TooltipAlign = typeof TooltipAlign[keyof typeof TooltipAlign];

export const TooltipJustify = {
  Start: Justify.Start,
  Middle: Justify.Middle,
  End: Justify.End,
} as const;

export type TooltipJustify = typeof TooltipJustify[keyof typeof TooltipJustify];

// Exclude these from tooltip (tooltip already extends popover props)
type ModifiedTooltipProps = Omit<
  TooltipProps,
  | 'usePortal'
  | 'justify'
  | 'align'
  | 'onClick'
  | 'trigger'
  | 'triggerEvent'
  | 'shouldClose'
  | 'className'
  | 'children'
  | 'onClose'
  | 'setOpen'
  | 'open'
  | 'refEl'
  | 'darkMode'
>;

interface StandaloneProps {
  /**
   * Used to determine which tooltip will be shown. If `numberOfSteps > 1` then the multi-step tooltip will be shown else the stand-alone tooltip will be shown. This number will only be displayed in the multi-step tooltip.
   */
  numberOfSteps: 1;

  /**
   * Used to display the current step. If `numberOfSteps === 1` this number will not display.
   */
  currentStep?: never;
}

interface MultistepProps {
  /**
   * Used to determine which tooltip will be shown. If `numberOfSteps > 1` then the multi-step tooltip will be shown else the stand-alone tooltip will be shown. This number will only be displayed in the multi-step tooltip.
   */
  numberOfSteps: number;

  /**
   * Used to display the current step. If `numberOfSteps === 1` this number will not display.
   */
  currentStep: number;
}

type ConditionalProps = StandaloneProps | MultistepProps;

export type GuideCueProps = ModifiedTooltipProps &
  ConditionalProps &
  DarkModeProps & {
    /**
     * Determines if the `Tooltip` will appear as open or close.
     * @default false
     */
    open: boolean;

    /**
     * Callback to change the open state of the Tooltip.
     */
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

    /**
     * Reference to an element that the tooltip should be positioned against.
     */
    refEl: React.RefObject<HTMLElement>;

    /**
     * Title to appear inside of Tooltip.
     */
    title: string;

    /**
     * Body content to appear inside the tooltip, under the title.
     */
    children: React.ReactNode;

    /**
     * ClassName to be applied to the tooltip element.
     */
    tooltipClassName?: string;

    /**
     * Text to appear inside the primary button. The default text for the stand-alone tooltip is `Got it`. The default text for the multi-step tooltip varies on the `numberOfSteps` and `currentStep`. If `numberOfSteps === currentStep` the text is `Got it` else it is `Next.
     */
    buttonText?: string;

    /**
     * Callback fired when the dismiss(X) button is clicked or when the `Esc` key is pressed. This only applies to the multi-step tooltip.
     */
    onDismiss?: () => void;

    /**
     * Callback fired when the primary button is clicked. This applies to both the stand-alone and multi-step tooltip. This is also fired when the `Esc` key is pressed in the stand-alone tooltip.
     */
    onPrimaryButtonClick?: () => void;

    /**
     * Determines the alignment of the tooltip.
     * @default 'top'
     */
    tooltipAlign?: TooltipAlign;

    /**
     * Determines the justification of the tooltip.
     * @default 'middle'
     */
    tooltipJustify?: TooltipJustify;

    /**
     * Determines the alignment of the beacon(animated pulsing circle that appears on top of the trigger element). This only applies to the multi-step tooltip.
     * @default 'center-horizontal'
     */
    beaconAlign?: Align;
  };
