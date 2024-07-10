import React, { MouseEventHandler, useState } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { darken, lighten, readableColor, transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import palette from './palette';

type HueName = keyof typeof palette;
const baseHues: Array<HueName> = ['white', 'black', 'transparent'];

const isBaseHue = (hue: HueName): hue is 'white' | 'black' | 'transparent' => {
  return baseHues.includes(hue);
};

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
type ShadeName = (typeof ShadeNames)[number];

interface ColorBlockProps extends HTMLElementProps<'div'> {
  hue: HueName;
  name: string;
  shade?: ShadeName;
}

const BLOCK_WIDTH = 88;

const copiedOverlayStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Euclid Circular A', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  border-radius: inherit;
`;

const colorBlockWrapper = css`
  display: inline-block;
  position: relative;
  width: ${BLOCK_WIDTH}px;
  padding-bottom: 16px;
`;

const colorBlock = css`
  position: relative;
  outline: none;
  border: none;
  border-top-color: transparent;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 8px;
  cursor: pointer;
  vertical-align: top;

  &:focus-visible {
    box-shadow: 0 0 0 2px white, 0 0 0 4px #0498ec;
  }
`;

const hexLabelStyle = css`
  width: calc(100% - 1em);
  position: absolute;
  left: 50%;
  margin: auto;
  font-size: 13px;
  text-align: center;
  padding: 3px 0.3rem;
  border-radius: 4px;
  transform: translate(-50%, -125%);
  pointer-events: none;
`;

const nameLabelStyle = css`
  text-align: center;
  color: ${palette.gray.dark1};
  margin: auto;
  padding-block: 0.3em;
`;

const colorRowStyle = css`
  grid-template-columns: repeat(${ShadeNames.length}, ${BLOCK_WIDTH}px);
  display: grid;
  gap: 24px;
`;

function ColorBlock({ hue, shade, ...rest }: ColorBlockProps) {
  const [wasCopied, setWasCopied] = useState<boolean>();
  const name = `${hue} ${shade ?? ''}`;

  let color: string;

  if (isBaseHue(hue)) {
    color = palette[hue];
  } else {
    shade = shade ?? 'base';
    color = (palette[hue] as Record<ShadeName, string>)[shade];
  }

  const colorBlockWrapperDynamic = css`
    grid-column: ${shade ? ShadeNames.indexOf(shade) + 1 : '0'};
  `;

  const colorBlockColor = css`
    transition: all 0.3s ease;
    background-color: ${color};
    box-shadow: 0 8px 6px -8px ${transparentize(0.7, darken(0.2, color))},
      0 2px 3px ${transparentize(0.8, darken(0.5, color))};

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 6px -8px ${transparentize(0.7, darken(0.4, color))},
        0 2px 3px ${transparentize(0.5, darken(0.3, color))};
    }
  `;

  const hexLabelColor = css`
    color: ${readableColor(lighten(0.2, color))};
    background-color: ${lighten(0.2, color)};
  `;

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(color);
    setWasCopied(true);
    setTimeout(() => {
      setWasCopied(false);
    }, 2000);
  };

  return (
    <div className={cx(colorBlockWrapper, colorBlockWrapperDynamic)} {...rest}>
      <button className={cx(colorBlock, colorBlockColor)} onClick={handleClick}>
        {wasCopied && (
          <div
            className={copiedOverlayStyle}
            style={{ color: readableColor(color) }}
          >
            Copied!
          </div>
        )}
      </button>
      {!wasCopied && (
        <div className={cx(hexLabelStyle, hexLabelColor)}>{color}</div>
      )}
      <div className={nameLabelStyle}>{name}</div>
    </div>
  );
}

const meta: StoryMetaType<any> = {
  title: 'Components/Palette',
  component: null,
  parameters: {
    default: 'AllColors',
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

export function LiveExample() {
  const allColors = Object.keys(palette);
  const hues = (allColors as Array<keyof typeof palette>).slice(
    baseHues.length,
    allColors.length,
  ); // remove black and white

  return (
    <div>
      <div className={colorRowStyle}>
        <ColorBlock hue="white" name="white" />
        <ColorBlock hue="black" name="black" />
        <ColorBlock hue="transparent" name="transparent" />
      </div>
      {hues.map(hue => {
        const hueValues = palette[hue];

        return (
          <div key={hue} className={colorRowStyle}>
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
      })}
    </div>
  );
}
