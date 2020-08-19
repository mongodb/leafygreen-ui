import React from 'react';
import Tooltip, { TooltipProps } from '@leafygreen-ui/tooltip';
import { Body } from '@leafygreen-ui/typography';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const underline = css`
  display: inline-flex;
  background-repeat: repeat-x;
  background-position: 0 calc(1em + 4px);
  background-size: 3px 2px;

  background-image: radial-gradient(
    circle closest-side,
    ${uiColors.gray.dark1} 75%,
    transparent 25%
  );
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
  ...tooltipProps
}: InlineDefinitionProps) {
  return (
    // <div
    //   className={css`
    //     line-height: 20px;
    //     font-size: 14px;
    //   `}
    // >
    //   <div className={underline}>{children}</div>
    // </div>
    <Tooltip
      {...tooltipProps}
      trigger={<span className={underline}>{children}</span>}
    >
      <Body className={maxWidth}>{definition}</Body>
    </Tooltip>
  );
}
