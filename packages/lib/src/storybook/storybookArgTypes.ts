import IntrinsicElements from './IntrinsicElements';

export const storybookArgTypes = {
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
