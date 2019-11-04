import React from 'react';
import { storiesOf } from '@storybook/react';
import { color, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import Icon, { glyphs, Size } from '.';

const containerStyle = css`
  width: 150px;
  height: 70px;
  flex-shrink: 0;
  text-align: center;
  border: 1px solid #babdbe;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0.5rem;
`;

const textStyle = css`
  font-size: 12px;
  color: #babdbe;
  margin-top: 0.5rem;
`;

const glyphList = Object.keys(glyphs) as Array<keyof typeof glyphs>;

const glyphMap = glyphList.map(glyph => (
  <div key={glyph} className={containerStyle}>
    <Icon
      glyph={glyph}
      fill={color('Fill', '#000000')}
      size={select('size', Object.values(Size) as Array<Size>, Size.Default)} />
    <div className={textStyle}>{glyph}</div>
  </div>
));

storiesOf('Icons', module).add('Icon', () => (<>{glyphMap}</>));
