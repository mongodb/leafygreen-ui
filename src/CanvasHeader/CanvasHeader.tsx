import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { H2 } from '@leafygreen-ui/typography';

import { Resource } from '../Resource';

import {
  actionsStyles,
  backLinkStyles,
  canvasHeaderBaseStyles,
  canvasHeaderClassname,
  titleBaseStyles,
  titleThemeStyles,
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
      actions,
      backLink,
      className,
      ...rest
    }: CanvasHeaderProps,
    forwardRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          className={cx(
            canvasHeaderClassname,
            canvasHeaderBaseStyles,
            className,
          )}
          {...rest}
          ref={forwardRef}
        >
          {!!backLink && <div className={backLinkStyles}>{backLink}</div>}
          <div className={titleWrapperStyles}>
            <H2
              data-testid="lg-canvas_header-page_title"
              className={cx(titleBaseStyles, titleThemeStyles[theme])}
            >
              {pageTitle}
            </H2>
            {!!actions && <div className={actionsStyles}>{actions}</div>}
          </div>
          {!!resourceName && (
            <Resource resourceName={resourceName} resourceIcon={resourceIcon} />
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

CanvasHeader.displayName = 'CanvasHeader';

CanvasHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  resourceName: PropTypes.string,
  resourceIcon: PropTypes.element,
  actions: PropTypes.element,
  backLink: PropTypes.element,
  darkMode: PropTypes.bool,
};
