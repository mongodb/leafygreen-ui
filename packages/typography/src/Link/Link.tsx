import React, { useEffect, useMemo, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import OpenNewTabIcon from '@leafygreen-ui/icon/dist/OpenNewTab';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Polymorphic, usePolymorphic } from '@leafygreen-ui/polymorphic';

import { bodyTypeScaleStyles } from '../styles';
import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';

import {
  anchorClassName,
  arrowRightIconHover,
  arrowRightIconPersist,
  linkModeStyles,
  linkStyles,
  openInNewTabStyles,
  underlineModeStyles,
  underlineStyles,
} from './Link.styles';
import { ArrowAppearance, LinkProps } from './Link.types';

const Link = Polymorphic<LinkProps>(
  ({
    href,
    children,
    className,
    arrowAppearance = ArrowAppearance.None,
    hideExternalIcon = false,
    baseFontSize: baseFontSizeOverride,
    target: targetProp,
    rel: relProp,
    darkMode: darkModeProp,
    as,
    ...rest
  }) => {
    const [currentHostname, setCurrentHostname] = useState('');
    useEffect(() => {
      setCurrentHostname(window.location.hostname);
    }, []);

    const { theme } = useDarkMode(darkModeProp);
    const { Component } = usePolymorphic(as ? as : href ? 'a' : 'span');

    const hrefHostname = useMemo(() => {
      if (!href) return;
      const httpRegex = /^http(s)?:\/\//;
      return httpRegex.test(href) ? new URL(href).hostname : currentHostname;
    }, [href, currentHostname]);

    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeOverride);

    let target, rel, icon;

    // Respect passed values
    if (targetProp || relProp) {
      target = targetProp;
      rel = relProp;
    } else {
      // Only manually set values if not provided and we are rendering an anchor tag
      if (Component === 'a') {
        if (hrefHostname === currentHostname) {
          target = '_self';
        } else {
          target = '_blank';
          rel = 'noopener noreferrer';
        }
      }
    }

    if (target === '_blank' && !hideExternalIcon) {
      icon = (
        <OpenNewTabIcon role="presentation" className={openInNewTabStyles} />
      );
    } else if (arrowAppearance !== ArrowAppearance.None) {
      icon = (
        <ArrowRightIcon
          role="presentation"
          size={12}
          className={cx({
            [arrowRightIconHover]: arrowAppearance === ArrowAppearance.Hover,
            [arrowRightIconPersist]:
              arrowAppearance === ArrowAppearance.Persist,
          })}
        />
      );
    }

    return (
      <Component
        className={cx(
          anchorClassName,
          bodyTypeScaleStyles[baseFontSize],
          linkStyles,
          linkModeStyles[theme],
          className,
        )}
        href={href}
        target={target}
        rel={rel}
        {...rest}
      >
        <span className={cx(underlineStyles, underlineModeStyles[theme])}>
          {children}
        </span>
        {icon}
      </Component>
    );
  },
);

export default Link;
