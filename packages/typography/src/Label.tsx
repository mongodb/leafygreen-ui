import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps, Theme } from '@leafygreen-ui/lib';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';
import { useUpdatedBaseFontSize } from './useUpdatedBaseFontSize';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { labelTypeScaleStyles } from './styles';

const labelStyle = css`
  font-family: ${fontFamilies.default};
  font-weight: bold;
`;

const labelColorStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
  `,
};

const disabledLabelColorStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.base};
  `,
};

type LabelProps = HTMLElementProps<'label', never> & {
  darkMode?: boolean;
  htmlFor: string;
  disabled?: boolean;
};

export const Label = ({
  darkMode: darkModeProp,
  className,
  children,
  disabled = false,
  ...rest
}: LabelProps) => {
  const baseFontSize = useUpdatedBaseFontSize();
  const { theme } = useDarkMode(darkModeProp);

  return (
    <label
      className={cx(
        labelStyle,
        labelColorStyle[theme],
        labelTypeScaleStyles[baseFontSize],
        { [disabledLabelColorStyle[theme]]: disabled },
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
