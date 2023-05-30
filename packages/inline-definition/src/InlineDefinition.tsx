import React from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import Tooltip, { TooltipProps } from '@leafygreen-ui/tooltip';

const triggerElementStyles = css`
  border-radius: 2px;
  text-decoration: underline dotted 2px;
  text-underline-offset: 0.125em;

  &:hover {
    a > * {
      // Remove the Link underline styles
      &::after {
        height: 0;
      }
    }
  }

  &:focus,
  &:focus-visible {
    outline-color: ${palette.blue.light1};
    outline-offset: 3px;
    outline-style: solid;
    outline-width: 2px;
  }
`;

const triggerElementModeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    text-decoration-color: ${palette.black};

    &:hover,
    &:focus,
    &:focus-visible {
      text-decoration-color: ${palette.black};
    }
  `,
  [Theme.Dark]: css`
    text-decoration-color: ${palette.gray.light2};

    &:hover,
    &:focus,
    &:focus-visible {
      text-decoration-color: ${palette.gray.light2};
    }
  `,
};

export interface InlineDefinitionProps extends Partial<TooltipProps> {
  /**
   * Trigger element for the definition tooltip
   * @required
   */
  children: TooltipProps['children'];

  /**
   * ReactNode rendered inside the tooltip
   * @required
   */
  definition: React.ReactNode;

  /**
   * `className` prop passed to the Tooltip component instance
   */
  tooltipClassName?: string;
}

/**
 * Inline Definition
 *
 * @param props.definition Content that appears in the tooltip.
 * @param props.tooltipClassName Class name applied to tooltip container.
 */

function InlineDefinition({
  definition,
  children,
  className,
  tooltipClassName,
  darkMode: darkModeProp,
  ...tooltipProps
}: InlineDefinitionProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);

  return (
    <Tooltip
      justify="middle"
      spacing={9}
      className={tooltipClassName}
      darkMode={darkMode}
      {...tooltipProps}
      trigger={
        <span
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          className={cx(
            triggerElementStyles,
            triggerElementModeStyles[theme],
            className,
          )}
        >
          {children}
        </span>
      }
    >
      {definition}
    </Tooltip>
  );
}

InlineDefinition.displayName = 'InlineDefinition';

InlineDefinition.propTypes = {
  definition: PropTypes.node.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default InlineDefinition;
