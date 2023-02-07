import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import {
  useBaseFontSize,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { codeTypeScaleStyles } from '../styles';

import {
  inlineKeyCodeColor,
  inlineKeyCodeStyles,
} from './InlineKeyCode.styles';
import { InlineKeyCodeProps } from './InlineKeyCode.types';

function InlineKeyCode({
  baseFontSize: baseFontSizeOverride,
  darkMode: darkModeProp,
  children,
  className,
  ...rest
}: InlineKeyCodeProps) {
  const { baseFontSize } = useBaseFontSize(baseFontSizeOverride);
  const { theme } = useDarkMode(darkModeProp);

  return (
    <code
      className={cx(
        inlineKeyCodeStyles,
        inlineKeyCodeColor[theme],
        codeTypeScaleStyles[baseFontSize],
        className,
      )}
      {...rest}
    >
      {children}
    </code>
  );
}

InlineKeyCode.displayName = 'InlineKeyCode';

export default InlineKeyCode;
