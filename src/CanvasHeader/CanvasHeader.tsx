import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { H2 } from '@leafygreen-ui/typography';

import { LGIDS } from '../constants';
import { Resource } from '../Resource';

import {
  actionsStyles,
  backLinkStyles,
  badgesStyles,
  canvasHeaderBaseStyles,
  canvasHeaderClassname,
  getTitleStyles,
  titleWrapperStyles,
} from './CanvasHeader.styles';
import { type CanvasHeaderProps } from './CanvasHeader.types';

export const CanvasHeader = React.forwardRef<HTMLDivElement, CanvasHeaderProps>(
  (
    {
      darkMode: darkModeProp,
      pageTitle,
      resourceIcon,
      resourceName,
      resourceBadges,
      actions,
      backLink,
      className,
      badges,
      ...rest
    }: CanvasHeaderProps,
    forwardRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          data-testid={LGIDS.root}
          className={cx(
            canvasHeaderClassname,
            canvasHeaderBaseStyles(theme),
            className,
          )}
          {...rest}
          ref={forwardRef}
        >
          {!!backLink && <div className={backLinkStyles}>{backLink}</div>}
          <div className={titleWrapperStyles}>
            <H2 data-testid={LGIDS.pageTitle} className={getTitleStyles(theme)}>
              {pageTitle}
            </H2>
            {!!badges && <div className={badgesStyles}>{badges}</div>}
            {!!actions && <div className={actionsStyles}>{actions}</div>}
          </div>
          {!!resourceName && (
            <Resource
              resourceName={resourceName}
              resourceIcon={resourceIcon}
              resourceBadges={resourceBadges}
            />
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

CanvasHeader.displayName = 'CanvasHeader';
