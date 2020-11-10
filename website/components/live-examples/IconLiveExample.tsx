import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Icon, { Size, glyphs } from '@leafygreen-ui/icon';

import { css } from '@leafygreen-ui/emotion';

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
  overflow: wrap;
`;

const textStyle = css`
  font-size: 12px;
  color: #babdbe;
  margin-top: 0.5rem;
`;

const knobsConfig: KnobsConfigInterface<{ size: Size }> = {
  size: {
    type: 'select',
    options: Object.values(Size),
    default: Size.Default,
    label: 'Size',
  },
};

const renderGlyph = (glyph, size: Size = 'default') => {
  return (
    <div key={glyph} className={containerStyle}>
      <Icon glyph={glyph} fill="#000000" size={size} />
      <div className={textStyle}>{glyph}</div>
    </div>
  );
};

const IconLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => (
        <>{Object.keys(glyphs).map(glyph => renderGlyph(glyph, props?.size))}</>
      )}
    </LiveExample>
  );
};

export default IconLiveExample;
