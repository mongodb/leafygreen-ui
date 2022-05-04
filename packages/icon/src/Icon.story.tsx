// TODO: Generate Icon props with controls
import React from 'react';
import Icon, { glyphs } from '.';
import { css } from '@leafygreen-ui/emotion';
import { ComponentStory, Meta } from '@storybook/react';
import { palette } from '@leafygreen-ui/palette';

export default {
  title: 'Packages/Icons',
  component: Icon,
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

export const AllIcons: ComponentStory<typeof Icon> = args => (
  <>
    {Object.keys(glyphs).map(glyph => (
      <div key={glyph} className={containerStyle}>
        <Icon {...args} glyph={glyph} />
        <div className={textStyle}>{glyph}</div>
      </div>
    ))}
  </>
)