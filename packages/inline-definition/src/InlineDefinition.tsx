import React from 'react';
import PropTypes from 'prop-types';
import Tooltip, { TooltipProps } from '@leafygreen-ui/tooltip';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

const triggerElementStyles = css`
  border-radius: 2px;
  text-decoration: underline dotted 2px;
  text-decoration-color: ${palette.gray.dark1};
  text-underline-offset: 0.125em;

  &:hover {
    text-decoration-color: currentColor;

    * {
      // Remove the Link underline styles
      background-size: 0px;
    }
  }

  &:focus,
  &:focus-visible {
    text-decoration-color: ${palette.blue.light1};
    outline-color: ${palette.blue.light1};
    outline-offset: 3px;
    outline-style: solid;
    outline-width: 2px;
  }
`;

type InlineDefinitionProps = Partial<TooltipProps> & {
  definition: React.ReactNode;
  tooltipClassName?: string;
};

function InlineDefinition({
  definition,
  children,
  className,
  tooltipClassName,
  ...tooltipProps
}: InlineDefinitionProps) {
  return (
    <Tooltip
      justify="middle"
      spacing={5}
      className={tooltipClassName}
      {...tooltipProps}
      trigger={
        <span
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          className={cx(triggerElementStyles, className)}
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
