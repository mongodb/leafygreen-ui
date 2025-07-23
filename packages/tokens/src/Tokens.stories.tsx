import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { type StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import startCase from 'lodash/startCase';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { scrollbarColor } from './scrollbars';
import {
  addOverflowShadow,
  borderRadius,
  color,
  focusRing,
  fontFamilies,
  hoverRing,
  shadow,
  Side,
  spacing,
  transitionDuration,
  typeScales,
  Variant,
} from '.';

const DemoCard = ({
  children,
  darkMode,
  className,
  ...rest
}: {
  children: React.ReactNode;
  darkMode: boolean;
  className?: string;
  [key: string]: any;
}) => {
  const theme = darkMode ? Theme.Dark : Theme.Light;

  return (
    <div
      className={cx(
        css`
          padding: ${spacing[600]}px;
          min-height: ${spacing[1200] + typeScales.body1.lineHeight}px;
          border-radius: ${spacing[600]}px;
          color: ${color[theme].text.primary.default};
          background-color: ${color[theme].background.primary.default};
          border: 1px solid ${color[theme].border.secondary.default};
          box-shadow: ${darkMode ? shadow.dark[100] : shadow.light[100]};
        `,
        className,
      )}
      data-testid={`demo-card`}
      {...rest}
    >
      {children}
    </div>
  );
};

const meta: StoryMetaType<any> = {
  title: 'Internal/Tokens',
  component: null,
  parameters: { default: 'Spacing' },
};
export default meta;

type HoverRingColor = keyof typeof hoverRing.dark;
type TypeScale = keyof typeof typeScales;
type FontFamily = keyof typeof fontFamilies;

const gutter = css`
  margin-left: ${spacing[400]}px;
`;

const spacingBlockVariants = Object.keys(spacing)
  .filter(num => Number(num) === 0 || Number(num) > 25)
  .reduce((acc: Partial<Record<keyof typeof spacing, string>>, index) => {
    const key = index as PropertyKey as keyof typeof spacing;
    acc[key] = css`
      background-color: ${palette.purple.light2};
      width: ${spacing[key]}px;
      height: ${spacing[key]}px;
    `;
    return acc;
  }, {});

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

export const OverflowShadows = () => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${spacing[400]}px;
      `}
    >
      {Object.values(Theme).map((theme: Theme) => {
        const isDarkMode = theme === Theme.Dark;
        const backgroundColor = isDarkMode ? palette.gray.dark4 : palette.white;
        return (
          <div
            className={css`
              padding: ${spacing[600]}px;
              color: ${color[theme].text.primary.default};
              background-color: ${backgroundColor};
              border: 1px solid ${color[theme].border.secondary.default};
              z-index: -1;
            `}
            key={theme}
          >
            <div
              className={css`
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: ${spacing[400]}px;
              `}
            >
              {Object.values(Side).map(side => (
                <div
                  key={`inside-${side}`}
                  className={css`
                    position: relative;
                    width: 150px;
                    height: 150px;
                    background-color: ${backgroundColor};
                    border: 1px solid ${color[theme].border.secondary.default};
                    margin: ${spacing[400]}px;
                    padding: ${spacing[400]}px;
                    overflow: hidden;
                    ${addOverflowShadow({ isInside: true, side, theme })}
                  `}
                >
                  Inside {side} shadow
                </div>
              ))}
              {Object.values(Side).map(side => (
                <div
                  key={`outside-${side}`}
                  className={css`
                    width: 150px;
                    height: 150px;
                    background-color: ${backgroundColor};
                    border: 1px solid ${color[theme].border.secondary.default};
                    margin: ${spacing[400]}px;
                    padding: ${spacing[400]}px;
                    ${addOverflowShadow({ isInside: false, side, theme })}
                  `}
                >
                  Outside {side} shadow
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Shadow = () => (
  <div
    className={css`
      display: flex;
      gap: ${spacing[400]}px;
    `}
  >
    <div
      className={css`
        box-shadow: ${shadow.light[100]};
        background-color: ${color.light.background.primary.default};
        padding: ${spacing[1600]}px;
        border-radius: ${borderRadius[200]}px;
        border: 1px solid ${color.light.border.secondary.default};
        color: ${color.light.text.primary.default};
      `}
    >
      shadow.light[100]
    </div>

    <div
      className={css`
        padding: ${spacing[600]}px;
        background-color: ${color.dark.background.primary.default};
      `}
    >
      <div
        className={css`
          box-shadow: ${shadow.dark[100]};
          background-color: ${color.dark.background.primary.default};
          padding: ${spacing[1600]}px;
          border-radius: ${borderRadius[200]}px;
          border: 1px solid ${color.dark.border.secondary.default};
          color: ${color.dark.text.primary.default};
        `}
      >
        shadow.dark[100]
      </div>
    </div>
  </div>
);

export const Spacing = () => (
  <div>
    <h2>Spacing</h2>
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${spacing[100]}px;
      `}
    >
      {Object.keys(spacing)
        .filter(num => Number(num) === 0 || Number(num) > 25)
        .map(space => (
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
              margin: ${spacing[400]}px 0;
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
            margin: ${spacing[400]}px 0;
          `}
        >
          <div>{family}</div>
        </div>
      );
    })}
  </div>
);

const generateTable = (theme: Theme) => {
  const isDarkMode = !!(theme === Theme.Dark);
  return (
    <DemoCard darkMode={isDarkMode}>
      <h3
        className={css`
          color: ${color[theme].text.primary.default};
          text-transform: capitalize;
        `}
      >
        {theme} Mode
      </h3>
      <div
        className={css`
          display: flex;
          gap: ${spacing[400]}px;
        `}
      >
        {Object.keys(color[theme]).map(type => (
          <DemoCard darkMode={isDarkMode} key={`color-${theme}-${type}`}>
            <table
              className={css`
                border-spacing: ${spacing[400]}px;
              `}
            >
              <thead
                className={css`
                  font-size: 10px;
                  text-align: left;
                `}
              >
                <tr>
                  <th
                    className={css`
                      color: ${color[theme].text.primary.default};
                      width: 100px;
                    `}
                  >
                    <code>{type}</code>
                  </th>
                  <th
                    className={css`
                      width: ${spacing[1600]}px;
                    `}
                  >
                    <code>default</code>
                  </th>
                  <th
                    className={css`
                      width: ${spacing[1600]}px;
                    `}
                  >
                    <code>hover</code>
                  </th>
                  <th
                    className={css`
                      width: ${spacing[1600]}px;
                    `}
                  >
                    <code>focus</code>
                  </th>
                </tr>
              </thead>
              {/* @ts-expect-error */}
              {Object.keys(color[theme][type]).map(variant => (
                <tbody
                  key={`color-${theme}-${type}-${variant}`}
                  className={css`
                    font-size: 10px;
                  `}
                >
                  <tr>
                    <td>
                      <code>{variant}</code>
                    </td>

                    {/* @ts-expect-error */}
                    {Object.keys(color[theme][type][variant]).map(state => (
                      <td key={`color-${theme}-${type}-${variant}-${state}`}>
                        <div
                          className={css`
                            aspect-ratio: 1/1;
                            border: 1px solid
                              ${color[theme].border.primary.default};
                            // @ts-expect-error
                            background-color: ${color[theme][type][variant][
                              state
                            ]};
                            border-radius: ${borderRadius[200]}px;
                          `}
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              ))}
            </table>
          </DemoCard>
        ))}
      </div>
    </DemoCard>
  );
};

export const Colors = {
  render: () => {
    return (
      <div
        className={css`
          display: flex;
          flex-direction: column;
          gap: ${spacing[400]}px;
        `}
      >
        <h2>Color Tokens</h2>
        {Object.values(Theme).map(theme => generateTable(theme))}
      </div>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Scrollbars: StoryObj = {
  parameters: {
    chromatic: {
      // TODO: skipping for now until we can get Chromatic to snapshot the scrollbars
      // https://github.com/storybookjs/storybook/discussions/31691#discussion-8425494
      disableSnapshot: true,
    },
  },
  render: () => {
    return (
      <div
        className={css`
          display: grid;
          gap: ${spacing[400]}px;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
        `}
      >
        {Object.values(Theme).map((theme: Theme) => {
          const isDarkMode = theme === Theme.Dark;

          return [Variant.Primary, Variant.Secondary].map(variant => {
            const thumbColor = scrollbarColor[theme].thumb[variant].default;
            const trackColor = scrollbarColor[theme].track[variant].default;
            return (
              <DemoCard
                darkMode={isDarkMode}
                key={theme}
                className={css`
                  color: ${color[theme].text[variant].default};
                  background-color: ${color[theme].background[variant].default};
                `}
              >
                <div
                  data-testid="scrollable"
                  className={css`
                    max-height: 144px;
                    max-width: 144px;
                    overflow: scroll;
                    scrollbar-color: ${thumbColor} ${trackColor};
                  `}
                >
                  <div
                    className={css`
                      height: 256px;
                      width: 256px;
                    `}
                  >
                    <h3>{theme} Mode</h3>
                    <h4>{variant}</h4>
                  </div>
                </div>
              </DemoCard>
            );
          });
        })}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const cards = within(canvasElement).getAllByTestId('demo-card');
    cards.forEach(card => {
      const scrollable = within(card).getByTestId('scrollable');
      scrollable.scrollTo({
        top: 12,
        left: 12,
        behavior: 'smooth',
      });
    });
  },
};

export const InteractionRings = () => {
  const invertTheme = (theme: Theme): Theme =>
    theme === 'dark' ? 'light' : 'dark';

  const themeWrapper = (theme: Theme) => css`
    display: flex;
    gap: ${spacing[200]}px;
    color: ${theme === 'dark' ? palette.white : palette.black};
    background-color: ${theme === 'dark' ? palette.black : palette.white};
    border: 1px solid
      ${theme === 'dark' ? palette.gray.light3 : palette.gray.dark3};
    border-radius: ${spacing[400]}px;
    padding: ${spacing[600]}px;
    margin: ${spacing[400]}px 0;
  `;

  const buttonBase = css`
    font-family: ${fontFamilies.default};
    font-size: ${typeScales.body2.fontSize}px;
    outline: none;
    background-color: unset;
    border: unset;
    padding: ${spacing[200]}px;
    border-radius: ${spacing[100]}px;
    cursor: pointer;
    transition: box-shadow ${transitionDuration.faster}ms ease-in-out;
  `;

  return (
    <div>
      <h2>Interaction States</h2>
      <div>
        {Object.values(Theme).map((theme: Theme) => (
          <div key={theme} className={themeWrapper(theme)}>
            {Object.keys(hoverRing[theme]).map(_color => {
              const color = _color as HoverRingColor;
              return (
                <button
                  key={color}
                  className={css`
                    ${buttonBase};
                    background-color: ${palette[color][`${theme}3`]};
                    color: ${palette[color][`${invertTheme(theme)}2`]};
                    &:hover {
                      box-shadow: ${hoverRing[theme][color]};
                    }
                    &:focus {
                      box-shadow: ${focusRing[theme].default};
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
                border: 1px solid ${palette.gray[`${theme}1`]};
                &:hover {
                  box-shadow: ${hoverRing[theme].gray};
                }
                &:focus {
                  box-shadow: ${focusRing[theme].input};
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
