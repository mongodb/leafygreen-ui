import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize, fontFamilies } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { Mode } from '../types';
import { bodyTypeScaleStyles } from '../styles';

const descriptionStyle = css`
  font-family: ${fontFamilies.default};
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0;
`;

const descriptionColorStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

const disabledDescriptionColorStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.gray.base};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

type DescriptionProps = HTMLElementProps<'p', never> & {
  darkMode?: boolean;
  disabled?: boolean;
};

export const Description = ({
  darkMode = false,
  disabled = false,
  children,
  className,
  ...rest
}: DescriptionProps) => {
  const baseFontSize = useBaseFontSize() as BaseFontSize;
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <p
      className={cx(
        descriptionStyle,
        descriptionColorStyle[mode],
        bodyTypeScaleStyles[baseFontSize],
        {
          [disabledDescriptionColorStyle[mode]]: disabled,
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
