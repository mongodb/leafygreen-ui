import React from 'react';
import Tooltip, { TooltipProps } from '@leafygreen-ui/tooltip';
import { Body } from '@leafygreen-ui/typography';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const underline = css`
  display: inline-flex;
  background-repeat: repeat-x;
  background-position: center bottom;
  background-size: 3px 2px;
  transition: background-image 150ms ease-in-out;

  background-image: radial-gradient(
    circle closest-side,
    ${uiColors.gray.dark1} 75%,
    transparent 25%
  );

  &:hover {
    background-image: radial-gradient(
      circle closest-side,
      currentColor 75%,
      transparent 25%
    );
  }
`;

const maxWidth = css`
  max-width: 240px;
`;

type InlineDefinitionProps = TooltipProps & {
  definition: string;
};

export default function InlineDefinition({
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
      trigger={<span className={cx(underline, className)}>{children}</span>}
    >
      <Body className={maxWidth}>{definition}</Body>
    </Tooltip>
  );
}
