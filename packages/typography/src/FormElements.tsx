import React from 'react';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette, uiColors } from '@leafygreen-ui/palette';

import { fontFamilies } from '@leafygreen-ui/tokens';

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

interface ColorSets {
  labelStyle: string;
  disabledLabelStyle: string;
  descriptionStyle: string;
  disabledDescriptionStyle: string;
}

// TODO: Refresh - move font-size & line-height back to common styles when darkMode gets redesigned
const colorSets: Record<Mode, ColorSets> = {
  [Mode.Light]: {
    labelStyle: css`
      font-family: ${fontFamilies.default};
      color: ${palette.black};
      font-size: 13px;
      line-height: 20px;
    `,
    disabledLabelStyle: css`
      color: ${uiColors.gray.dark1};
    `,
    descriptionStyle: css`
      font-family: ${fontFamilies.default};
      color: ${palette.gray.dark1};
      font-size: 13px;
      line-height: 20px;
    `,
    disabledDescriptionStyle: css`
      color: ${palette.gray.base};
    `,
  },
  [Mode.Dark]: {
    labelStyle: css`
      font-family: ${fontFamilies.legacy};
      color: ${uiColors.white};
      font-size: 14px;
      line-height: 16px;
    `,
    disabledLabelStyle: css`
      color: ${uiColors.gray.light1};
    `,
    descriptionStyle: css`
      font-family: ${fontFamilies.legacy};
      color: ${uiColors.gray.light1};
      font-size: 14px;
      line-height: 16px;
    `,
    disabledDescriptionStyle: css`
      color: ${uiColors.gray.light1};
    `,
  },
};

const labelStyle = css`
  font-weight: bold;
  padding-bottom: 4px;
`;

type LabelProps = HTMLElementProps<'label', never> & {
  darkMode?: boolean;
  htmlFor: string;
  disabled?: boolean;
};

const Label = ({
  darkMode = false,
  className,
  children,
  disabled = false,
  ...rest
}: LabelProps) => {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <label
      className={cx(
        labelStyle,
        colorSets[mode].labelStyle,
        { [colorSets[mode].disabledLabelStyle]: disabled },
        className,
      )}
      {...rest}
    >
      {children}
    </label>
  );
};

Label.displayName = 'Label';

const descriptionStyle = css`
  font-weight: normal;
  padding-bottom: 4px;
  margin-top: 0;
  margin-bottom: 0;
`;

type DescriptionProps = HTMLElementProps<'p', never> & {
  darkMode?: boolean;
  disabled?: boolean;
};

const Description = ({
  darkMode = false,
  disabled = false,
  children,
  className,
  ...rest
}: DescriptionProps) => {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <p
      className={cx(
        descriptionStyle,
        colorSets[mode].descriptionStyle,
        {
          [colorSets[mode].disabledDescriptionStyle]: disabled,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
};

Description.displayName = 'Description';

export { Label, Description };
