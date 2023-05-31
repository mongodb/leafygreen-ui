import { InputType } from '@storybook/csf';
import IntrinsicElements from './IntrinsicElements';

export interface StoryArgType extends InputType {
  /**
   * Identify an arg to determine where the control is defined
   */
  displayedPlatforms?: 'storybookOnly' | 'websiteOnly';

  /**
   * Define the control type
   *
   * Avoid using this property to exclude a control.
   * Use `parameters.controls.exclude` for this.
   */
  control?:
    | string
    | {
        type: string;
        [key: string]: any;
      };
}

type BaseArgTypes = 'boolean' | 'number' | 'range' | 'text' | 'color' | 'date';
type ArgTypeWithOptions = 'radio' | 'check' | 'select' | 'multi-select';

function argType(
  type: BaseArgTypes,
): (description?: string, config?: Record<string, any>) => StoryArgType;
function argType(
  type: ArgTypeWithOptions,
): (
  options: Array<any>,
  description?: string,
  config?: Record<string, any>,
) => StoryArgType;
function argType(
  type: BaseArgTypes | ArgTypeWithOptions,
): (...args: any) => StoryArgType {
  if (['radio', 'check', 'select', 'multi-select'].includes(type)) {
    return (
      options: Array<any>,
      description?: string,
      config?: Record<string, any>,
    ) =>
      ({
        description,
        options,
        control: { type, ...config },
      } as StoryArgType);
  } else
    return (description?: string, config?: Record<string, any>) =>
      ({
        description,
        control: { type, ...config },
      } as StoryArgType);
}

export const StorybookArgTypes = {
  Boolean: argType('boolean'),
  Number: argType('number'),
  Range: argType('range'),
  Select: argType('select'),
  Radio: argType('radio'),
  Check: argType('check'),
  Text: argType('text'),
  None: { control: 'none' },
} as const;

/**
 * Default configurations for storybook arg types
 */
export const defaultStorybookArgTypes: Record<string, StoryArgType> = {
  baseFontSize: StorybookArgTypes.Radio(
    [14, 16],
    'The base font size passed to the LeafyGreenProvider that wraps the component',
  ),
  updatedBaseFontSize: StorybookArgTypes.Radio(
    [13, 16],
    'The base font size passed to the LeafyGreenProvider that wraps the component. Uses the updated font size values for Euclid Circular A.',
  ),
  darkMode: StorybookArgTypes.Boolean('Render the component in dark mode.'),
  children: StorybookArgTypes.Text('Element rendered inside the component'),
  as: StorybookArgTypes.Select(
    IntrinsicElements,
    'The component will be rendered in HTML as the element selected here',
  ),
} as const;

/**
 * By default we set argType to `control:none`
 * for props we don't want to control in Storybook
 */
export const storybookExcludedArgTypes: Record<string, StoryArgType> = {
  'aria-controls': StorybookArgTypes.None,
  'aria-describedby': StorybookArgTypes.None,
  'aria-label': StorybookArgTypes.None,
  'aria-labelledby': StorybookArgTypes.None,
  className: StorybookArgTypes.None,
  id: StorybookArgTypes.None,
  onBlur: StorybookArgTypes.None,
  onCancel: StorybookArgTypes.None,
  onChange: StorybookArgTypes.None,
  onClear: StorybookArgTypes.None,
  onClick: StorybookArgTypes.None,
  onClose: StorybookArgTypes.None,
  onConfirm: StorybookArgTypes.None,
  onDismiss: StorybookArgTypes.None,
  onFilter: StorybookArgTypes.None,
  onSubmit: StorybookArgTypes.None,
  portalClassName: StorybookArgTypes.None,
  portalContainer: StorybookArgTypes.None,
  popoverZIndex: StorybookArgTypes.None,
  ref: StorybookArgTypes.None,
  scrollContainer: StorybookArgTypes.None,
  usePortal: StorybookArgTypes.None,
} as const;
