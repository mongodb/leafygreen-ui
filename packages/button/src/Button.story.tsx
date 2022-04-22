import React from 'react';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import LGButton, { ButtonProps } from '.';
import { Story } from '@storybook/react';

// This is a workaround to make sure props are correctly imported despite Button using forwardRef
// https://github.com/storybookjs/storybook/issues/15334
// eslint-disable-next-line react/jsx-props-no-spreading
export const Button: React.FC<ButtonProps> = props => <LGButton {...props} />;

export default {
  title: 'Packages/Button',
  component: Button,
  excludeStories: ['Button'],
  argTypes: {
    leftGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    rightGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
  },
  controls: { exclude: ['children'] },
};

const Template: Story<
  ButtonProps & { text: string; leftGlyph: string; rightGlyph: string }
  // eslint-disable-next-line react/prop-types
> = ({ text, leftGlyph, rightGlyph, ...args }) => (
  <Button
    leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
    rightGlyph={rightGlyph ? <Icon glyph={rightGlyph} /> : undefined}
    {...args}
  >
    {text}
  </Button>
);

export const Basic = Template.bind({});
Basic.args = {
  text: 'MongoDB',
};
