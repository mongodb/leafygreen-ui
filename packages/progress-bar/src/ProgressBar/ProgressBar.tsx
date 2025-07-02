import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import { Body, Description, Label } from '@leafygreen-ui/typography';

import {
  DEFAULT_LGID_ROOT,
  getFormattedValue,
  getHeaderIcon,
  getLgIds,
  getValueAriaAttributes,
  iconsPendingCompletion,
  resolveProgressBarProps,
} from '../utils';

import {
  containerStyles,
  getBarFillStyles,
  getBarTrackStyles,
  getHeaderIconStyles,
  getHeaderValueStyles,
  headerStyles,
} from './ProgressBar.styles';
import { ProgressBarProps, Size } from './ProgressBar.types';
export function ProgressBar(props: ProgressBarProps) {
  const { value, maxValue, disabled, color, isIndeterminate } =
    resolveProgressBarProps(props);

  const {
    type,
    label,
    size = Size.Default,
    description,
    darkMode = false,
    formatValue,
    showIcon: showIconProp = false,
    'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
  } = props;

  const { theme } = useDarkMode(darkMode);

  const showIcon = iconsPendingCompletion.includes(color)
    ? showIconProp && value === maxValue
    : showIconProp;

  const role = type === 'meter' ? 'meter' : 'progressbar';

  const progressBarId = `${role}-${getNodeTextContent(label) || 'default'}`;

  const lgIds = getLgIds(dataLgId);

  return (
    <div
      className={containerStyles}
      aria-disabled={disabled}
      data-lgid={lgIds.root}
    >
      <div className={headerStyles}>
        <Label htmlFor={progressBarId} darkMode={darkMode} disabled={disabled}>
          {label}
        </Label>

        {formatValue && (
          <Body
            className={getHeaderValueStyles({ theme, disabled })}
            darkMode={darkMode}
          >
            {value != null && getFormattedValue(value, maxValue, formatValue)}

            {showIcon &&
              getHeaderIcon({
                color,
                disabled,
                props: {
                  className: getHeaderIconStyles({ theme, color, disabled }),
                },
              })}
          </Body>
        )}
      </div>

      <div
        role={role}
        id={progressBarId}
        aria-label={progressBarId}
        {...getValueAriaAttributes(value, maxValue)}
      >
        <div
          data-lgid={lgIds.track}
          className={getBarTrackStyles({ theme, size })}
        >
          <div
            data-lgid={lgIds.fill}
            className={getBarFillStyles({
              theme,
              color,
              disabled,
              isIndeterminate,
              value,
              maxValue,
            })}
          ></div>
        </div>
      </div>

      {description && (
        <Description darkMode={darkMode} disabled={disabled}>
          {description}
        </Description>
      )}
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
