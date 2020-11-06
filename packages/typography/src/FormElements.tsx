import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

interface ColorSets {
  labelColor: string;
  descriptionColor: string;
}

const colorSets: Record<Mode, ColorSets> = {
  [Mode.Light]: {
    labelColor: css`
      color: ${uiColors.gray.dark2};
    `,
    descriptionColor: css`
      color: ${uiColors.gray.dark1};
    `,
  },
  [Mode.Dark]: {
    labelColor: css`
      color: ${uiColors.white};
    `,
    descriptionColor: css`
      color: ${uiColors.gray.light1};
    `,
  },
};

const labelStyle = css`
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  padding-bottom: 4px;
`;

type LabelProps = JSX.IntrinsicElements['label'] & {
  darkMode?: boolean;
  id: string | number;
};

const Label = ({ id, darkMode = false, children }: LabelProps) => {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <label htmlFor={id} className={cx(labelStyle, colorSets[mode].labelColor)}>
      {children}
    </label>
  );
};

Label.displayName = 'Label';

const descriptionStyle = css`
  font-size: 14px;
  line-height: 16px;
  font-weight: normal;
  padding-bottom: 4px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

type DescriptionProps = JSX.IntrinsicElements['p'] & {
  darkMode?: boolean;
};

const Description = ({ darkMode = false, children }: DescriptionProps) => {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <p className={cx(descriptionStyle, colorSets[mode].descriptionColor)}>
      {children}
    </p>
  );
};

Description.displayName = 'Description';

export { Label, Description };
