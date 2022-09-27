import { Align, Justify } from '@leafygreen-ui/popover';
import { TooltipProps } from '@leafygreen-ui/tooltip';

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

export type GuidecueProps = {
  /**
   * Determines if the `Tooltip` will appear as open or close.
   * @default false
   */
  open: boolean;
  /**
   * Callback to change the open state of the Tooltip in consuming applications.
   */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Pass a reference to an element that the beacon or tooltip(if stand-alone) should be centered against.
   */
  refEl: React.RefObject<HTMLElement>;
  /**
   * Determines whether the `Tooltip` will appear in dark mode.
   * @default false
   */
  darkMode?: boolean;
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
  tooltipAlign?: Exclude<Align, 'center-vertical' | 'center-horizontal'>;
  /**
   * Determines the justification of the tooltip.
   * @default 'middle'
   */
  tooltipJustify?: Exclude<Justify, 'fit'>;
  /**
   * Determines the alignment of the beacon. This only applies to the multi-step tooltip.
   * @default 'center-horizontal'
   */
  beaconAlign?: Align;
} & ModifiedTooltipProps &
  ConditionalProps;
