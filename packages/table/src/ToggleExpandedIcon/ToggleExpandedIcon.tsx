import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';

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
  theme,
  ...rest
}: ToggleExpandedIconProps) => {
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

ToggleExpandedIcon.propTypes = {
  disabled: PropTypes.bool,
  toggleExpanded: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default ToggleExpandedIcon;

export const MemoizedToggleExpandedIcon = React.memo(ToggleExpandedIcon);
