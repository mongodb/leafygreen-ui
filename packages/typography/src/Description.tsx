import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize, fontFamilies, typeScales } from '@leafygreen-ui/tokens';
import { Mode } from './types';
import { palette } from '@leafygreen-ui/palette';
import { useUpdatedBaseFontSize } from './useUpdatedBaseFontSize';

const descriptionStyle = css`
  font-family: ${fontFamilies.default};
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0;
`;

const descriptionTypeScale: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: 20px;
  `,
};

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
    color: ${palette.gray.dark1};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.base};
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
  const baseFontSize = useUpdatedBaseFontSize();
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <p
      className={cx(
        descriptionStyle,
        descriptionColorStyle[mode],
        descriptionTypeScale[baseFontSize],
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

export default Description;
