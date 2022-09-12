import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps, Theme } from '@leafygreen-ui/lib';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';
import { useUpdatedBaseFontSize } from './useUpdatedBaseFontSize';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { labelTypeScaleStyles } from './styles';

const descriptionStyle = css`
  font-family: ${fontFamilies.default};
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0;
`;

const descriptionColorStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

const disabledDescriptionColorStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.base};
  `,
};

type DescriptionProps = HTMLElementProps<'p', never> & {
  darkMode?: boolean;
  disabled?: boolean;
};

export const Description = ({
  darkMode: darkModeProp,
  disabled = false,
  children,
  className,
  ...rest
}: DescriptionProps) => {
  const baseFontSize = useUpdatedBaseFontSize();
  const { theme } = useDarkMode(darkModeProp);

  return (
    <p
      className={cx(
        descriptionStyle,
        descriptionColorStyle[theme],
        labelTypeScaleStyles[baseFontSize],
        {
          [disabledDescriptionColorStyle[theme]]: disabled,
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

export default Description;
