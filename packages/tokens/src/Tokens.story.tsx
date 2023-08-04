/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import startCase from 'lodash/startCase';

import { css } from '@leafygreen-ui/emotion';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { Mode } from './mode';
import {
  focusRing,
  fontFamilies,
  hoverRing,
  spacing,
  transitionDuration,
  typeScales,
} from '.';

const meta: StoryMetaType<any> = {
  title: 'Components/Tokens',
  component: null,
  parameters: { default: 'Spacing' },
};
export default meta;

type HoverRingColor = keyof typeof hoverRing.dark;
type TypeScale = keyof typeof typeScales;
type FontFamily = keyof typeof fontFamilies;

const gutter = css`
  margin-left: ${spacing[3]}px;
`;

const colors = [
  '#fb4949',
  '#497ffb',
  '#62e3fd',
  '#52c825',
  '#fdd063',
  '#fd7fec',
  '#a5fd8b',
];

const spacingBlockVariants = Object.keys(spacing).reduce(
  (acc: Partial<Record<keyof typeof spacing, string>>, index, idx) => {
    const key = index as PropertyKey as keyof typeof spacing;
    acc[key] = css`
      background-color: ${colors[idx]};
      width: ${spacing[key]}px;
      height: ${spacing[key]}px;
    `;
    return acc;
  },
  {},
);

function SpacingBlock({ space }: { space: keyof typeof spacing }) {
  return (
    <div className={gutter}>
      <code>
        spacing[{space}]: {spacing[space]}
      </code>
      <div className={spacingBlockVariants[space]}></div>
    </div>
  );
}

export const Spacing = () => (
  <div>
    <h2>Spacing</h2>
    <div
      className={css`
        display: flex;
      `}
    >
      {Object.keys(spacing).map(space => (
        <SpacingBlock
          space={space as PropertyKey as keyof typeof spacing}
          key={space}
        />
      ))}
    </div>
  </div>
);

export const TypeScales = () => {
  return (
    <div>
      <h2>Typescales</h2>
      {Object.keys(typeScales).map((_scale: string) => {
        const scale = _scale as TypeScale;
        return (
          <div
            key={scale}
            className={css`
              font-family: ${scale.includes('code')
                ? fontFamilies.code
                : fontFamilies.default};
              font-size: ${typeScales[scale].fontSize}px;
              line-height: ${typeScales[scale].lineHeight}px;
              margin: ${spacing[3]}px 0;
            `}
          >
            <div>{scale}</div>
          </div>
        );
      })}
    </div>
  );
};

export const FontFamilies = () => (
  <div>
    <h2>Font Families</h2>
    {Object.keys(fontFamilies).map((_family: string) => {
      const family = _family as FontFamily;
      return (
        <div
          key={family}
          className={css`
            font-family: ${fontFamilies[family]};
            margin: ${spacing[3]}px 0;
          `}
        >
          <div>{family}</div>
        </div>
      );
    })}
  </div>
);

export const InteractionRings = () => {
  const invertMode = (mode: Mode): Mode => (mode === 'dark' ? 'light' : 'dark');

  const modeWrapper = (mode: Mode) => css`
    display: flex;
    gap: ${spacing[2]}px;
    color: ${mode === 'dark' ? palette.white : palette.black};
    background-color: ${mode === 'dark' ? palette.black : palette.white};
    border: 1px solid
      ${mode === 'dark' ? palette.gray.light3 : palette.gray.dark3};
    border-radius: ${spacing[3]}px;
    padding: ${spacing[4]}px;
    margin: ${spacing[3]}px 0;
  `;

  const buttonBase = css`
    font-family: ${fontFamilies.default};
    font-size: ${typeScales.body2.fontSize}px;
    outline: none;
    background-color: unset;
    border: unset;
    padding: ${spacing[2]}px;
    border-radius: ${spacing[1]}px;
    cursor: pointer;
    transition: box-shadow ${transitionDuration.faster}ms ease-in-out;
  `;

  return (
    <div>
      <h2>Interaction States</h2>
      <div>
        {Object.values(Mode).map((mode: Mode) => (
          <div key={mode} className={modeWrapper(mode)}>
            {Object.keys(hoverRing[mode]).map(_color => {
              const color = _color as HoverRingColor;
              return (
                <button
                  key={color}
                  className={css`
                    ${buttonBase};
                    background-color: ${palette[color][`${mode}3`]};
                    color: ${palette[color][`${invertMode(mode)}2`]};
                    &:hover {
                      box-shadow: ${hoverRing[mode][color]};
                    }
                    &:focus {
                      box-shadow: ${focusRing[mode].default};
                    }
                  `}
                >
                  {startCase(color)}
                </button>
              );
            })}
            <input
              type="text"
              placeholder="Input"
              className={css`
                ${buttonBase};
                border: 1px solid ${palette.gray[`${mode}1`]};
                &:hover {
                  box-shadow: ${hoverRing[mode].gray};
                }
                &:focus {
                  box-shadow: ${focusRing[mode].input};
                }
              `}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
InteractionRings.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
