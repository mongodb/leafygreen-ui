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
import { Body } from '@leafygreen-ui/typography';

import { LGIDS } from '../constants';

import {
  getResourceNameContainerStyles,
  getResourceNameStyles,
  resourceBaseStyles,
  resourceCopiedStyles,
  resourceCopyStyles,
  resourceIconBaseStyles,
  resourceNameContainerClassname,
  resourceNameStyles,
} from './Resource.styles';
import { ResourceProps } from './Resource.types';

/**
 * Internal contents for the resource name
 * @internal
 */
export const Resource = React.forwardRef<HTMLDivElement, ResourceProps>(
  ({ resourceIcon, resourceName }: ResourceProps, forwardRef) => {
    const [copied, setCopied] = useState(false);
    const { theme } = useDarkMode();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

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
          <div className={resourceIconBaseStyles}>{resourceIcon}</div>
        )}
        <Body
          className={cx(
            resourceNameContainerClassname,
            getResourceNameContainerStyles(theme),
          )}
          role="button"
          tabIndex={0}
          baseFontSize={16}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          data-testid={LGIDS.resourceName}
        >
          <span
            className={cx(getResourceNameStyles(theme), resourceNameStyles)}
          >
            {resourceName}
          </span>
          <span
            className={cx(
              getResourceNameStyles(theme),
              resourceCopyStyles,

              {
                [resourceCopiedStyles]: copied, // show the icon until the tooltip goes away
              },
            )}
          >
            <Tooltip
              open={copied}
              justify={Justify.Middle}
              trigger={
                <span>
                  <Icon
                    aria-label="Copy resource name to clipboard"
                    glyph={'Copy'}
                  />
                </span>
              }
            >
              Copied!
            </Tooltip>
          </span>
        </Body>
      </div>
    );
  },
);

Resource.displayName = 'Resource';
