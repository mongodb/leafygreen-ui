import React, { useRef, useState } from 'react';
import { isUndefined } from 'lodash';
import { darken, lighten, readableColor, transparentize } from 'polished';

// @ts-ignore
import { css, cx } from '@leafygreen-ui/emotion';

import palette from './palette';

const BLOCK_WIDTH = 88;

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
type ShadeName = typeof ShadeNames[number];

interface ColorBlockProps {
  hue: HueName;
  name: string;
  shade?: ShadeName;
}

function ColorBlock({ hue, shade }: ColorBlockProps) {
  // @ts-ignore
  const [copied, setCopied] = useState(false);
  // @ts-ignore
  const colorBlockRef = useRef<HTMLButtonElement>(null);
  // @ts-ignore
  const name = `${hue} ${shade ?? ''}`;

  let color: string;

  if (isUndefined(shade) || hue === 'white' || hue === 'black') {
    color = palette[hue as 'white' | 'black'];
  } else {
    color = (palette[hue] as Record<ShadeName, string>)[shade];
  }

  // @ts-ignore
  const colorBlockWrapperDynamic = css`
    grid-column: ${shade ? ShadeNames.indexOf(shade) + 1 : 'unset'};
  `;

  // @ts-ignore
  const colorBlockColor = css`
    background-color: ${color};
    box-shadow: 0 8px 6px -8px ${transparentize(0.7, darken(0.2, color))},
      0 2px 3px ${transparentize(0.8, darken(0.5, color))};
  `;

  // @ts-ignore
  const hexLabelColor = css`
    color: ${readableColor(lighten(0.2, color))};
    background-color: ${lighten(0.2, color)};
  `;

  // @ts-ignore
  const copyHex = () => {
    navigator.clipboard.writeText(color);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return 'hi';

  // return (
  //   <div className={cx(colorBlockWrapper, colorBlockWrapperDynamic)}>
  //     <button className={cx(colorBlock, colorBlockColor)} onClick={copyHex} />
  //     <div className={cx(hexLabelStyle, hexLabelColor)}>{color}</div>
  //     <div className={nameLabelStyle}>{name}</div>
  //     <Tooltip
  //       open={copied}
  //       refEl={colorBlockRef}
  //       usePortal={false}
  //       spacing={0}
  //     >
  //       Copied {color}
  //     </Tooltip>
  //   </div>
  // );
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
      // @ts-ignore
      return <ColorBlock key={hue} hue={hue} name={hue} />;
    }

    return (
      <div
        key={hue}
        className={css`
          grid-template-columns: repeat(${ShadeNames.length}, ${BLOCK_WIDTH}px);
          display: grid;
          gap: 24px;
        `}
      >
        {(Object.keys(hueValues) as Array<keyof typeof hueValues>).map(
          shade => (
            // @ts-ignore
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
