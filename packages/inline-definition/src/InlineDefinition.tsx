import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Tooltip, { RenderMode } from '@leafygreen-ui/tooltip';

import { getTriggerElementStyles } from './InlineDefinition.styles';
import { InlineDefinitionProps } from './InlineDefinition.types';

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
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleMouseEnter = () => {
    setTooltipOpen(true);
  };

  return (
    <Tooltip
      className={tooltipClassName}
      darkMode={darkMode}
      justify="middle"
      open={tooltipOpen}
      renderMode={RenderMode.TopLayer}
      setOpen={setTooltipOpen}
      spacing={9}
      {...tooltipProps}
      trigger={
        <span
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          className={getTriggerElementStyles(theme, className)}
          onMouseEnter={handleMouseEnter}
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
