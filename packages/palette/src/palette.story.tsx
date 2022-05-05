import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { lighten, darken, readableColor, transparentize } from 'polished';
import * as palette from './palette';

interface ColorBlockProps {
  color: string;
  name: string;
}

function ColorBlock({ color, name }: ColorBlockProps) {
  const styles = css`
    border-top-color: transparent;
    display: inline-block;
    position: relative;
    height: 80px;
    width: 80px;
    border-radius: 8px;
    margin: 10px;
    margin-bottom: 20px;
    background-color: ${color};
    box-shadow: 0 8px 6px -8px ${transparentize(0.7, darken(0.2, color))},
      0 2px 3px ${transparentize(0.8, darken(0.5, color))};

    &:before {
      content: '${color}';
      position: absolute;
      bottom: 0.3rem;
      left: 0.3rem;
      right: 0.3rem;
      font-size: 12px;
      text-align: center;
      padding: 3px 0.3rem;
      border-radius: 4px;
      color: ${readableColor(lighten(0.2, color))};
      background-color: ${lighten(0.2, color)};
    }

    &:after {
      content: '${name}';
      position: absolute;
      top: calc(100% + 8px);
      font-size: 12px;
      text-align: center;
      color: ${palette.gray.dark1};
      margin: auto;
      left: -10px;
      right: -10px;
    }
  `;

  return <div className={styles} />;
}

function renderColors() {
  const ranges = Object.keys(palette) as Array<keyof typeof palette>;

  const renderedRanges = ranges.map(range => {
    const currentVal = palette[range];

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
  // const renderedRanges = 'hello world'

  return <div>{renderedRanges}</div>;
}

storiesOf('Packages/Palette', module).add('Default', renderColors);
