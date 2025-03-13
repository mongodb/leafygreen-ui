import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import Tooltip, { Justify } from '@leafygreen-ui/tooltip';

import { LGIDS } from '../constants';

import {
  getResourceCopyIconWrapperStyles,
  getResourceNameButtonStyles,
  getResourceNameStyles,
  resourceBadgeStyles,
  resourceBaseStyles,
  resourceCopiedStyles,
  resourceIconBaseStyles,
  resourceNameButtonClassName,
} from './Resource.styles';
import { ResourceProps } from './Resource.types';

/**
 * Internal contents for the resource name
 * @internal
 */
export const Resource = React.forwardRef<HTMLDivElement, ResourceProps>(
  (
    { resourceIcon, resourceName, resourceBadges }: ResourceProps,
    forwardRef,
  ) => {
    const [copied, setCopied] = useState(false);
    const { theme } = useDarkMode();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const copyIconRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
      // Clear the timeout when the component unmounts
      return () => clearTimeout(timerRef.current as NodeJS.Timeout);
    }, []);

    const copyTextToClipboard = () => {
      navigator.clipboard.writeText(resourceName as string);
      setCopied(true);
      timerRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    };

    const handleClick: MouseEventHandler<HTMLParagraphElement> = () => {
      copyTextToClipboard();
    };

    const handleKeyDown: KeyboardEventHandler<HTMLParagraphElement> = e => {
      if (e.key === keyMap.Enter || e.key === keyMap.Space) {
        copyTextToClipboard();
      }
    };

    if (!resourceName) return null;

    return (
      <div ref={forwardRef} className={resourceBaseStyles}>
        {!!resourceIcon && (
          <span className={resourceIconBaseStyles}>{resourceIcon}</span>
        )}
        <span
          className={cx(
            resourceNameButtonClassName,
            getResourceNameButtonStyles(theme),
          )}
          role="button"
          tabIndex={0}
          aria-label="Copy resource name to clipboard"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          data-testid={LGIDS.resourceName}
        >
          <span className={getResourceNameStyles(theme)}>{resourceName}</span>
          <span
            ref={copyIconRef}
            className={cx(getResourceCopyIconWrapperStyles(theme), {
              [resourceCopiedStyles]: copied, // show the icon until the tooltip goes away
            })}
          >
            <Icon glyph={'Copy'} />
          </span>
          <Tooltip open={copied} justify={Justify.Middle} refEl={copyIconRef}>
            Copied!
          </Tooltip>
        </span>
        {resourceBadges && (
          <span className={resourceBadgeStyles}>{resourceBadges}</span>
        )}
      </div>
    );
  },
);

Resource.displayName = 'Resource';
