import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import { lighten, darken, readableColor, transparentize } from 'polished';
import * as uiColors from './uiColors';

interface ColorBlockProps {
  color: string;
  name: string;
}

const ColorBlock = styled<'div', ColorBlockProps>('div')`
  background-color: ${props => props.color};
  border-top-color: transparent;
  display: inline-block;
  position: relative;
  height: 80px;
  width: 80px;
  border-radius: 8px;
  margin: 10px;
  margin-bottom: 20px;
  box-shadow: 0 8px 6px -8px ${props => transparentize(0.7, darken(0.2, props.color))},
    0 2px 3px ${props => transparentize(0.8, darken(0.5, props.color))};

  &:before {
    content: attr(color);
    position: absolute;
    bottom: 0.3rem;
    left: 0.3rem;
    right: 0.3rem;
    font-size: 12px;
    text-align: center;
    padding: 3px 0.3rem;
    color: ${props => readableColor(lighten(0.2, props.color))};
    background-color: ${props => lighten(0.2, props.color)};
    border-radius: 4px;
  }

  &:after {
    content: attr(name);
    position: absolute;
    top: calc(100% + 8px);
    font-size: 12px;
    text-align: center;
    color: ${uiColors.gray.dark1};
    margin: auto;
    left: -10px;
    right: -10px;
  }
`;
/**
 *
 */

function renderColors() {
  const ranges = Object.keys(uiColors) as Array<keyof typeof uiColors>;

  const renderedRanges = ranges.map(range => {
    const currentVal = uiColors[range];

    if (typeof currentVal === 'string') {
      return <ColorBlock key={range} color={currentVal} name={range} />;
    }

    return (
      <div key={range}>
        {(Object.keys(currentVal) as Array<keyof typeof currentVal>).map(
          name => (
            <ColorBlock
              key={currentVal[name]}
              color={currentVal[name]}
              name={`${range} ${name}`}
            />
          ),
        )}
      </div>
    );
  });

  return <div>{renderedRanges}</div>;
}

storiesOf('Palette', module).add('UI', renderColors);
