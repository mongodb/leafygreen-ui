import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'react-emotion';
import { lighten, darken } from 'polished';
import colors from './colors';

const ColorBlock = styled('div')`
  background-color: ${props => props['data-color'] || 'transparent'};
  border-top-color: transparent;
  border-radius: 8px;
  display: inline-block;
  position: relative;
  height: 80px;
  width: 80px;
  margin: 10px;
  margin-bottom: 20px;
  box-shadow: 0 8px 6px -8px rgba(0, 0, 0, 0.2),
    inset 0 -1px 1px ${props => darken(0.05, props['data-color']) || 'transparent'},
    inset 0 1px 1px
      ${props => lighten(0.03, props['data-color']) || 'transparent'};

  &:before {
    content: attr(data-color);
    position: absolute;
    bottom: 0.3rem;
    left: 0.3rem;
    right: 0.3rem;
    font-size: 12px;
    text-align: center;
    padding: 3px 0.3rem;
    color: ${colors.gray[1]};
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
  }

  &:after {
    content: attr(data-name);
    position: absolute;
    top: calc(100% + 8px);
    font-size: 12px;
    text-align: center;
    color: ${colors.gray[3]};
    margin: auto;
    left: -10px;
    right: -10px;
  }
`;

const renderColorGroup = (
  namePrefix: string,
  colorGroup: { [Key: string]: string },
) => {
  const renderedColors: Array<JSX.Element> = [];

  for (const color in colorGroup) {
    renderedColors.push(
      <ColorBlock
        key={color}
        data-color={colorGroup[color]}
        data-name={`${namePrefix} ${color}`}
      />,
    );
  }

  return renderedColors;
};

storiesOf('colors', module)
  .add('Green', () => renderColorGroup('Green', colors.green))
  .add('Gray', () => renderColorGroup('Gray', colors.gray))
  .add('MongoDB', () => renderColorGroup('', colors.mongodb));
