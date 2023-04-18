import { InputType } from '@storybook/csf';
import IntrinsicElements from './IntrinsicElements';
import { BaseFontSize } from '@leafygreen-ui/tokens';
export interface StoryArgType extends InputType {
  /**
   * Identify an arg to render a control on Storybook only,
   * and not on `mongodb.design`
   */
  displayedPlatforms?: 'storybookOnly' | 'websiteOnly';
}

export const storybookArgTypes: { [key: string]: StoryArgType } = {
  websiteBaseFontSize: {
    description:
      'The base font size passed to the LeafyGreenProvider that wraps the component',
    control: { type: 'radio' },
    options: Object.values(BaseFontSize),
    displayedPlatforms: 'websiteOnly',
  },
  darkMode: {
    description: 'Render the component in dark mode.',
    control: 'boolean',
  },
  ref: {
    description: '`ref` passed to the component',
    control: 'none',
  },
  onClick: {
    description: 'Function to handle a click event.',
    control: 'none',
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
  },
};
