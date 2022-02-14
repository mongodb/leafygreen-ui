import React from 'react';
import PropTypes from 'prop-types';
import Tooltip, { TooltipProps } from '@leafygreen-ui/tooltip';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

/**
 *   ╭―――――――――――╮
 *   │   TEXT    │
 *   ╰―――――――――――╯
 *  ˚˚˚˚˚˚˚˚˚˚˚˚˚˚˚
 */
const underline = css`
  background-repeat: repeat-x;
  background-position: -2px bottom;
  background-size: 4px 2px;

  --lg-inline-definition-underline-color: ${palette.gray.dark1};
  background-image: radial-gradient(
    circle closest-side,
    var(--lg-inline-definition-underline-color) 100%,
    transparent 0%
  );

  &:hover {
    --lg-inline-definition-underline-color: currentColor;
  }

  &:focus {
    --lg-inline-definition-underline-color: ${palette.blue.light1};
    outline-color: ${palette.blue.light1};
    outline-offset: 3px;
  }
`;

type InlineDefinitionProps = Partial<TooltipProps> & {
  definition: React.ReactNode;
};

function InlineDefinition({
  definition,
  children,
  className,
  ...tooltipProps
}: InlineDefinitionProps) {
  return (
    <Tooltip
      justify="middle"
      spacing={5}
      {...tooltipProps}
      trigger={
        <span
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          className={cx(underline, className)}
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
