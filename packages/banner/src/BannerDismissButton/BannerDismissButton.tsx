import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';

import { baseStyles, variantStyles } from './styles';
import BannerDismissButtonProps from './types';

/**
 * @internal
 */
const BannerDismissButton = ({
  onClose,
  darkMode,
  theme,
  variant,
}: BannerDismissButtonProps) => (
  <IconButton
    className={cx(baseStyles, variantStyles[theme][variant])}
    aria-label="Close Message"
    onClick={onClose}
    darkMode={darkMode}
  >
    <XIcon />
  </IconButton>
);

export default BannerDismissButton;
