import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { sharedStyles } from './styles';

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

const Subtitle: ExtendableBox<SubtitleProps, 'h6'> = ({
  className,
  ...rest
}: SubtitleProps) => {
  return (
    <Box as="h6" className={cx(sharedStyles, subtitle, className)} {...rest} />
  );
};

Subtitle.displayName = 'Subtitle';

export default Subtitle;
