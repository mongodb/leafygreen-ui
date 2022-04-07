import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { HTMLElementProps, createDataProp, OneOf } from '@leafygreen-ui/lib';
import {
  useBaseFontSize,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { typeScale1, typeScale2, codeTypeScale2 } from '../styles';

const sharedStyles = css`
  margin: unset;
  font-family: ${fontFamilies.default};
  color: ${palette.black};
`;

/**
 * Subtitle
 */
const subtitle = css`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.3px;
  font-weight: 700;
`;

type SubtitleProps = HTMLElementProps<'h6'>;

export const Subtitle: ExtendableBox<SubtitleProps, 'h6'> = ({
  className,
  ...rest
}: SubtitleProps) => {
  return (
    <Box as="h6" className={cx(sharedStyles, subtitle, className)} {...rest} />
  );
};

Subtitle.displayName = 'Subtitle';
