import React from 'react';
import { storiesOf } from '@storybook/react';
import { color, select } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import Icon, { glyphs } from '.';

const { css } = emotion;

const containerStyle = css`
  width: 100px;
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

storiesOf('Icons', module).add('Icon', () =>
  Object.keys(glyphs).map(glyph => (
    <div key={glyph} className={containerStyle}>
      <Icon
        glyph={glyph}
        fill={color('Fill', '#000000')}
        size={select('size', ['default', 'large', 'xlarge'], 'default')}
      />
      <div className={textStyle}>{glyph}</div>
    </div>
  )),
);
