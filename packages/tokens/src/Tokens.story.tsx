import React from 'react';
import { storiesOf } from '@storybook/react';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '.';
import { boolean } from '@storybook/addon-knobs';
import { palette } from '@leafygreen-ui/palette';
import { focusRing } from './focusRing';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';

const gutter = css`
  margin-left: ${spacing[3]}px;
`;

const textWrapper = css`
  margin-bottom: ${spacing[2]}px;
  font-size: 10px;
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
      <div
        className={textWrapper}
      >{`spacing[${space}]: ${spacing[space]}`}</div>
      <div className={spacingBlockVariants[space]}></div>
    </div>
  );
}

storiesOf('Tokens', module)
  .add('Spacing', () => (
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
  ))
  .add('Focus ring', () => {
    const wrapperStyle = (darkMode: boolean) => css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 8px;
      background-color: ${!darkMode ? palette.white : palette.black};
      width: 100vw;
      height: 100vh;
    `;

    const { usingKeyboard } = useUsingKeyboardContext();

    const darkMode = boolean('Dark Mode', false);
    const mode = darkMode ? 'dark' : 'light';

    return (
      <div className={wrapperStyle(darkMode)}>
        <button
          className={cx(
            css`
              border: unset;
              box-shadow: inset;
              border-radius: 4px;
              &:focus {
                outline: none;
              }
            `,
            {
              [css`
                &:focus {
                  ${focusRing.default[mode]}
                }
              `]: usingKeyboard,
            },
          )}
        >
          Default
        </button>
        <input
          type="text"
          className={cx(
            css`
              border: unset;
              box-shadow: inset;
              border-radius: 4px;
              &:focus {
                outline: none;
              }
            `,
            {
              [css`
                &:focus {
                  ${focusRing.input[mode]}
                }
              `]: usingKeyboard,
            },
          )}
        />
      </div>
    );
  });
