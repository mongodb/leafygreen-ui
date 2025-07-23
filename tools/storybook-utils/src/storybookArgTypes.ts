import { InputType } from '@storybook/csf';

import IntrinsicElements from './IntrinsicElements';

export interface StoryArgType extends InputType {
  /**
   * Identify an arg to determine where the control is defined
   */
  displayedPlatforms?: 'storybookOnly' | 'websiteOnly';
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
  'aria-controls': { control: false },
  'aria-describedby': { control: false },
  'aria-label': { control: false },
  'aria-labelledby': { control: false },
  'data-lgid': { control: false },
  className: { control: false },
  id: { control: false },
  onBlur: { control: false },
  onCancel: { control: false },
  onChange: { control: false },
  onClear: { control: false },
  onClick: { control: false },
  onClose: { control: false },
  onConfirm: { control: false },
  onDismiss: { control: false },
  onFilter: { control: false },
  onSubmit: { control: false },
  portalClassName: { control: false },
  portalContainer: { control: false },
  popoverZIndex: { control: false },
  ref: { control: false },
  scrollContainer: { control: false },
  usePortal: { control: false },
} as const;
