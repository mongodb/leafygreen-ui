import React, { forwardRef } from 'react';

import {
  Chip,
  TooltipAlign,
  TruncationLocation,
  Variant as ChipVariant,
} from '@leafygreen-ui/chip';
import CollapseVerticalIcon from '@leafygreen-ui/icon/dist/CollapseVertical';
import ExpandVerticalIcon from '@leafygreen-ui/icon/dist/ExpandVertical';
import { IconButton } from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { FontWeight } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { useActionCardContext } from '../ActionCardContext';
import { State } from '../shared.types';

import {
  chipsContainerStyles,
  getContainerStyles,
  titleContainerStyles,
  upperRowStyles,
} from './Header.styles';
import { HeaderProps } from './Header.types';
import { TitleIcon } from './TitleIcon';

const CHIP_CHARACTER_LIMIT = 25;

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  (
    { chips = [], className, showExpandButton = true, state, title, ...rest },
    ref,
  ) => {
    const { theme } = useDarkMode();
    const { isExpanded, toggleExpand } = useActionCardContext();

    const isErrorState = state === State.Error;

    return (
      <div
        className={getContainerStyles({ className, isErrorState, theme })}
        ref={ref}
        {...rest}
      >
        <div className={upperRowStyles}>
          <div className={titleContainerStyles}>
            <TitleIcon state={state} />
            <Body weight={FontWeight.SemiBold}>{title}</Body>
          </div>
          {showExpandButton && (
            <IconButton
              aria-label={`${
                isExpanded ? 'Collapse' : 'Expand'
              } additional content`}
              onClick={toggleExpand}
            >
              {isExpanded ? <CollapseVerticalIcon /> : <ExpandVerticalIcon />}
            </IconButton>
          )}
        </div>
        {chips.length > 0 && (
          <div className={chipsContainerStyles}>
            {chips.map((props, index) => (
              <Chip
                key={index}
                chipCharacterLimit={CHIP_CHARACTER_LIMIT}
                chipTruncationLocation={TruncationLocation.Middle}
                enableAlwaysShowTooltip={true}
                tooltipAlign={TooltipAlign.Top}
                variant={ChipVariant.White}
                {...props}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

Header.displayName = 'Header';
