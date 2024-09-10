// TODO: Generate Icon props with controls
import React from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
  StoryType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

import { GlyphName } from './glyphs';
import Icon, { glyphs, IconProps, Size } from '.';

const meta: StoryMetaType<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'title', 'data-testid'],
    },
  },
  args: {
    fill: palette.gray.base,
    size: Size.Default,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(Size),
      defaultValue: Size.Default,
    },
    glyph: { control: 'none' },
    fill: {
      control: 'color',
    },
  },
};

export default meta;

const containerStyle = css`
  width: 150px;
  height: 70px;
  flex-shrink: 0;
  text-align: center;
  border: 1px solid ${palette.gray.light1};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0.5rem;
`;

const textStyle = css`
  font-size: 12px;
  color: ${palette.gray.base};
  margin-top: 0.5rem;
`;

export const Single: StoryType<typeof Icon> = (args: IconProps) => {
  if (!args.glyph) {
    args = {
      ...args,
      glyph: 'QuestionMarkWithCircle',
    };
  }

  return <Icon {...args} />;
};

Single.argTypes = {
  glyph: {
    control: 'select',
    options: Object.keys(glyphs),
  },
};
Single.parameters = { chromatic: { disableSnapshot: true } };

export const LiveExample: StoryFn<IconProps> = (
  args: Omit<IconProps, 'glyph'>,
) => (
  <div
    className={css`
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    `}
  >
    {Object.keys(glyphs).map(glyph => {
      return (
        <div key={glyph} className={containerStyle}>
          <Icon {...args} glyph={glyph as GlyphName} />
          <div className={textStyle}>{glyph}</div>
        </div>
      );
    })}
  </div>
);

export const Error = () => <Icon glyph="glyph-does-not-exist" />;
Error.parameters = { chromatic: { disableSnapshot: true } };
