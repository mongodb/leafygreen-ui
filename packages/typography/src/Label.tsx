import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize, fontFamilies, typeScales } from '@leafygreen-ui/tokens';
import { Mode } from './types';
import { palette } from '@leafygreen-ui/palette';
import { useUpdatedBaseFontSize } from './useUpdatedBaseFontSize';

const labelStyle = css`
  font-family: ${fontFamilies.default};
  font-weight: bold;
`;

const labelTypeScale: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: 20px; // Hardcoding because it does not match body2 lineHeight
  `,
};

const labelColorStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light2};
  `,
};

const disabledLabelColorStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.base};
  `,
};

type LabelProps = HTMLElementProps<'label', never> & {
  darkMode?: boolean;
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
  const baseFontSize = useUpdatedBaseFontSize();
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <label
      className={cx(
        labelStyle,
        labelColorStyle[mode],
        labelTypeScale[baseFontSize],
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

export default Label;
