// TODO: Generate Icon props with controls
import React from 'react';
import Icon, { glyphs } from '.';
import { css } from '@leafygreen-ui/emotion';
import { ComponentStory, Meta } from '@storybook/react';
import { palette } from '@leafygreen-ui/palette';
import { IconProps } from './createIconComponent';
import { GlyphName } from './glyphs';

export default {
  title: 'Components/Icons',
  component: Icon,
  parameters: {
    default: 'Single',
  },
} as Meta<typeof Icon>;

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

export const Single: ComponentStory<typeof Icon> = (args: IconProps) => {
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
  },
};

export const AllIcons: ComponentStory<typeof Icon> = (
  args: Omit<IconProps, 'glyph'>,
) => (
  <>
    {Object.keys(glyphs).map(glyph => {
      return (
        <div key={glyph} className={containerStyle}>
          <Icon {...args} glyph={glyph as GlyphName} />
          <div className={textStyle}>{glyph}</div>
        </div>
      );
    })}
  </>
);
