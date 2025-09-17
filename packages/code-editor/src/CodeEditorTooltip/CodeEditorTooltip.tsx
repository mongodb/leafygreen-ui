import React from 'react';

import {
  useBaseFontSize,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Link } from '@leafygreen-ui/typography';

import {
  getTooltipLinksContainerStyles,
  getTooltipStyles,
  tooltipLinksListItemStyles,
  tooltipLinksListStyles,
  tooltipMessageContainerStyles,
  tooltipMessageStyles,
} from './CodeEditorTooltip.styles';
import { CodeEditorTooltipProps } from './CodeEditorTooltip.types';

/**
 * Tooltip to be used by the CodeEditor component.
 */
export function CodeEditorTooltip({ messages, links }: CodeEditorTooltipProps) {
  const { theme } = useDarkMode();
  const baseFontSize = useBaseFontSize();

  return (
    <div className={getTooltipStyles(theme, baseFontSize)}>
      <div className={tooltipMessageContainerStyles}>
        {messages?.map(message => (
          <p key={message} className={tooltipMessageStyles}>
            {message}
          </p>
        ))}
      </div>
      {links?.length && links.length > 0 && (
        <div className={getTooltipLinksContainerStyles(theme)}>
          <ul className={tooltipLinksListStyles}>
            {links?.map(link => (
              <li key={link.label} className={tooltipLinksListItemStyles}>
                <Link href={link.href} hideExternalIcon>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
