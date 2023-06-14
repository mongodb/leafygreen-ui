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

  /**
   * `defaultValue` is deprecated in Storybook 7.
   *
   * Use `args` instead
   *
   * @deprecated
   */
  defaultValue?: any;
}

export const storybookArgTypes: Record<string, StoryArgType> = {
  baseFontSize: {
    description:
      'The base font size passed to the LeafyGreenProvider that wraps the component',
    control: { type: 'radio' },
    options: [14, 16],
  },
  updatedBaseFontSize: {
    description:
      'The base font size passed to the LeafyGreenProvider that wraps the component. Uses the updated font size values for Euclid Circular A.',
    control: { type: 'radio' },
    options: [13, 16],
  },
  darkMode: {
    description: 'Render the component in dark mode.',
    control: 'boolean',
  },
  children: {
    description: 'Element rendered inside the component',
    control: 'text',
  },
  as: {
    description:
      'The component will be rendered in HTML as the element selected here',
    options: IntrinsicElements,
    type: { name: 'string' },
    control: { type: 'select' },
    defaultValue: 'button',
  },
} as const;

/** By default we set argType to `control:none`
 * for props we don't want to control in Storybook
 */
export const storybookExcludedArgTypes: Record<string, StoryArgType> = {
  'aria-controls': { control: 'none' },
  'aria-describedby': { control: 'none' },
  'aria-label': { control: 'none' },
  'aria-labelledby': { control: 'none' },
  className: { control: 'none' },
  id: { control: 'none' },
  onBlur: { control: 'none' },
  onCancel: { control: 'none' },
  onChange: { control: 'none' },
  onClear: { control: 'none' },
  onClick: { control: 'none' },
  onClose: { control: 'none' },
  onConfirm: { control: 'none' },
  onDismiss: { control: 'none' },
  onFilter: { control: 'none' },
  onSubmit: { control: 'none' },
  portalClassName: { control: 'none' },
  portalContainer: { control: 'none' },
  popoverZIndex: { control: 'none' },
  ref: { control: 'none' },
  scrollContainer: { control: 'none' },
  usePortal: { control: 'none' },
} as const;
