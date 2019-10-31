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

storiesOf('Icons', module).add('Icon', () => {
  const glyphList = Object.keys(glyphs) as Array<keyof typeof glyphs>;
  const fill = color('Fill', '#000000');
  const size = select('size', Object.values(Size) as Array<Size>, Size.Default);

  const glyphMap = glyphList.map(glyph => (
    <div key={glyph} className={containerStyle}>
      <Icon glyph={glyph} fill={fill} size={size} />
      <div className={textStyle}>{glyph}</div>
    </div>
  ));

  const { Copy } = glyphs;

  return (
    <>
      <Copy fill={fill} size={size} />
      {glyphMap}
    </>
  );
});
