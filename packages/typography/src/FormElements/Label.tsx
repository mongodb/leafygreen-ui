import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize, fontFamilies } from '@leafygreen-ui/tokens';
import { CommonTypographyProps, Mode } from '../types';
import { palette } from '@leafygreen-ui/palette';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { bodyTypeScaleStyles } from '../styles';

const labelStyle = css`
  font-family: ${fontFamilies.default};
  font-weight: bold;
`;

const labelColorStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,
  [Mode.Dark]: css`
    color: ${palette.white};
  `,
};

const disabledLabelColorStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.gray.base};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

type LabelProps = HTMLElementProps<'label', never> &
  CommonTypographyProps & {
    htmlFor: string;
    disabled?: boolean;
  };

export const Label = ({
  darkMode = false,
  className,
  children,
  disabled = false,
  ...rest
}: LabelProps) => {
  const baseFontSize = useBaseFontSize() as BaseFontSize;
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <label
      className={cx(
        labelStyle,
        labelColorStyle[mode],
        bodyTypeScaleStyles[baseFontSize],
        { [disabledLabelColorStyle[mode]]: disabled },
        className,
      )}
      {...rest}
    >
      {children}
    </label>
  );
};

Label.displayName = 'Label';
