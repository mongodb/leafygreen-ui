import React from 'react';
import PropTypes from 'prop-types';
import Tooltip, { TooltipProps } from '@leafygreen-ui/tooltip';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { Mode } from '@leafygreen-ui/tokens';

const triggerElementStyles = css`
  border-radius: 2px;
  text-decoration: underline dotted 2px;
  text-underline-offset: 0.125em;

  &:hover {
    * {
      // Remove the Link underline styles
      background-size: 0px;
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

const triggerElementModeStyles: Record<Mode, string> = {
  [Mode.Light]: css`
    text-decoration-color: ${palette.black};

    &:hover,
    &:focus,
    &:focus-visible {
      text-decoration-color: ${palette.black};
    }
  `,
  [Mode.Dark]: css`
    text-decoration-color: ${palette.gray.light2};

    &:hover,
    &:focus,
    &:focus-visible {
      text-decoration-color: ${palette.gray.light2};
    }
  `,
};

type InlineDefinitionProps = Partial<TooltipProps> & {
  /**
   * ReactNode rendered inside the tooltip
   */
  definition: React.ReactNode;
  /**
   * `className` prop passed to the Tooltip component instance
   */
  tooltipClassName?: string;
};

/**
 * # Inline Definition
 *
 * @param props.definition Content that appears in the tooltip.
 * @param props.tooltipClassName Class name applied to tooltip container.
 */

function InlineDefinition({
  definition,
  children,
  className,
  tooltipClassName,
  darkMode = false,
  ...tooltipProps
}: InlineDefinitionProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;

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
            triggerElementModeStyles[mode],
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
