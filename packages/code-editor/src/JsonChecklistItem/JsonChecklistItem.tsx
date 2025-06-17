import React, { forwardRef } from 'react';

import Badge from '@leafygreen-ui/badge';
import Button, { Size } from '@leafygreen-ui/button';
import CheckmarkWithCircle from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import Plus from '@leafygreen-ui/icon/dist/Plus';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body, Description } from '@leafygreen-ui/typography';

import {
  contentContainerStyles,
  getContainerStyles,
  getPresentIconFill,
  getPresentTextStyles,
  labelBadgesContainerStyles,
  presentContainerStyles,
} from './JsonChecklistItem.styles';
import { JsonChecklistItemProps, Status } from './JsonChecklistItem.types';

const ADD_BUTTON_TEXT = 'Add';
const ADDED_TEXT = 'Added!';

export const JsonChecklistItem = forwardRef<
  HTMLLIElement,
  JsonChecklistItemProps
>(
  (
    {
      badges,
      className,
      darkMode: darkModeProp,
      description,
      label,
      onAddClick,
      status,
      ...rest
    },
    fwdRef,
  ) => {
    const { theme } = useDarkMode(darkModeProp);

    return (
      <LeafyGreenProvider darkMode={darkModeProp}>
        <li className={getContainerStyles(className)} ref={fwdRef} {...rest}>
          <div className={contentContainerStyles}>
            <div className={labelBadgesContainerStyles}>
              <Body>{label}</Body>
              {Array.isArray(badges) ? (
                badges.map((badgeProps, i) => <Badge key={i} {...badgeProps} />)
              ) : badges ? (
                <Badge {...badges} />
              ) : null}
            </div>
            {description && <Description>{description}</Description>}
          </div>
          {status === Status.Missing ? (
            <Button leftGlyph={<Plus />} onClick={onAddClick} size={Size.Small}>
              {ADD_BUTTON_TEXT}
            </Button>
          ) : (
            <div className={presentContainerStyles}>
              <CheckmarkWithCircle fill={getPresentIconFill(theme)} />
              <Body className={getPresentTextStyles(theme)}>{ADDED_TEXT}</Body>
            </div>
          )}
        </li>
      </LeafyGreenProvider>
    );
  },
);

JsonChecklistItem.displayName = 'JsonChecklistItem';
