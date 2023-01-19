import React, { useRef, useState } from 'react';
import { isUndefined } from 'lodash';
import { darken, lighten, readableColor, transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { typeScales } from '@leafygreen-ui/tokens';
import Tooltip from '@leafygreen-ui/tooltip';

import palette from './palette';

const colorBlockWrapper = css`
  display: inline-block;
  position: relative;
  margin: 10px;
  width: 88px;
`;

const colorBlock = css`
  outline: none;
  border: none;
  border-top-color: transparent;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 8px;
  cursor: pointer;
`;

const hexLabelStyle = css`
  width: calc(100% - 1em);
  position: absolute;
  left: 50%;
  margin: auto;
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  text-align: center;
  padding: 3px 0.3rem;
  border-radius: 4px;
  transform: translate(-50%, -125%);
`;

const nameLabelStyle = css`
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  text-align: center;
  color: ${palette.gray.dark1};
  margin: auto;
  padding-block: 0.3em;
`;

type HueName = keyof typeof palette;

const ShadeNames = [
  'dark4',
  'dark3',
  'dark2',
  'dark1',
  'base',
  'light1',
  'light2',
  'light3',
] as const;

interface ColorBlockProps {
  hue: HueName;
  name: string;
  shade?: typeof ShadeNames[number];
}

function ColorBlock({ hue, shade }: ColorBlockProps) {
  const [copied, setCopied] = useState(false);
  const colorBlockRef = useRef<HTMLButtonElement>(null);

  const color = !(isUndefined(shade) || ['white', 'black'].includes(hue))
    ? palette[hue][shade]
    : palette[hue];

  const name = `${hue} ${shade ?? ''}`;

  const colorBlockWrapperDynamic = css`
    grid-column: ${shade ? ShadeNames.indexOf(shade) + 1 : 'unset'};
  `;

  const colorBlockColor = css`
    background-color: ${color};
    box-shadow: 0 8px 6px -8px ${transparentize(0.7, darken(0.2, color))},
      0 2px 3px ${transparentize(0.8, darken(0.5, color))};
  `;

  const hexLabelColor = css`
    color: ${readableColor(lighten(0.2, color))};
    background-color: ${lighten(0.2, color)};
  `;

  const copyHex = () => {
    navigator.clipboard.writeText(color);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className={cx(colorBlockWrapper, colorBlockWrapperDynamic)}>
      <button className={cx(colorBlock, colorBlockColor)} onClick={copyHex} />
      <div className={cx(hexLabelStyle, hexLabelColor)}>{color}</div>
      <div className={nameLabelStyle}>{name}</div>
      <Tooltip open={copied} refEl={colorBlockRef} usePortal={false}>
        Copied {color}
      </Tooltip>
    </div>
  );
}

export default {
  title: 'Components/Palette',
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export function AllColors() {
  const hues = Object.keys(palette) as Array<keyof typeof palette>;

  const renderedRanges = hues.map(hue => {
    const hueValues = palette[hue];

    if (typeof hueValues === 'string') {
      return <ColorBlock key={hue} hue={hue} name={hue} />;
    }

    return (
      <div
        key={hue}
        className={css`
          grid-template-columns: repeat(${ShadeNames.length}, 1fr);
          display: grid;
        `}
      >
        {(Object.keys(hueValues) as Array<keyof typeof hueValues>).map(
          shade => (
            <ColorBlock
              key={hueValues[shade]}
              hue={hue}
              shade={shade}
              name={`${hue} ${shade}`}
            />
          ),
        )}
      </div>
    );
  });

  return <div>{renderedRanges}</div>;
}
