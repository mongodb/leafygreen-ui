import { InputType } from '@storybook/csf';
import IntrinsicElements from './IntrinsicElements';
export interface StoryArgType extends InputType {
  /**
   * Identify an arg to render a control on Storybook only,
   * and not on `mongodb.design`
   */
  storybookOnly?: boolean;
}

export const storybookArgTypes: { [key: string]: StoryArgType } = {
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
};
