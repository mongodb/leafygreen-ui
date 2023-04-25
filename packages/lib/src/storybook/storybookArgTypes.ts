import { InputType } from '@storybook/csf';
import IntrinsicElements from './IntrinsicElements';
export interface StoryArgType extends InputType {
  /**
   * Identify an arg to determine where the control is defined
   */
  displayedPlatforms?: 'storybookOnly' | 'websiteOnly';
}

export const storybookArgTypes = {
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
