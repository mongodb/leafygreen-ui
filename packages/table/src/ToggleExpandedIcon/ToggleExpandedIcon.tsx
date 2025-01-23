import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { LGIDS } from '../constants';

import {
  iconButtonTransitionStyles,
  iconFills,
  rotatedStyles,
} from './ToggleExpandedIcon.styles';
import { type ToggleExpandedIconProps } from './ToggleExpandedIcon.types';

/**
 * @internal
 */
const ToggleExpandedIcon = ({
  isExpanded,
  toggleExpanded,
  disabled,
  ...rest
}: ToggleExpandedIconProps) => {
  const { theme } = useDarkMode();

  return (
    <IconButton
      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} row`}
      disabled={disabled}
      onClick={toggleExpanded}
      className={cx(
        {
          [rotatedStyles]: isExpanded,
        },
        iconButtonTransitionStyles,
      )}
      data-lgid={LGIDS.expandButton}
      {...rest}
    >
      <Icon
        glyph="ChevronRight"
        role="presentation"
        fill={iconFills(theme, !!disabled)}
      />
    </IconButton>
  );
};

export default ToggleExpandedIcon;
