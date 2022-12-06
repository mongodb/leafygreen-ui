import React, { useEffect, useMemo, useState } from 'react';

import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import OpenNewTabIcon from '@leafygreen-ui/icon/dist/OpenNewTab';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

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

const Link: ExtendableBox<LinkProps, 'a'> = ({
  href,
  children,
  className,
  target: targetProp,
  arrowAppearance = ArrowAppearance.None,
  hideExternalIcon = false,
  darkMode: darkModeProp,
  ...rest
}: LinkProps) => {
  const [currentHostname, setCurrentHostname] = useState('');
  useEffect(() => {
    setCurrentHostname(window.location.hostname);
  }, []);

  const { theme } = useDarkMode(darkModeProp);

  const hrefHostname = useMemo(() => {
    if (!href) return;
    const httpRegex = /^http(s)?:\/\//;
    return httpRegex.test(href) ? new URL(href).hostname : currentHostname;
  }, [href, currentHostname]);

  const baseFontSize = useUpdatedBaseFontSize();

  let target, icon, rel;

  if (targetProp) {
    target = targetProp;
  } else {
    if (hrefHostname === currentHostname) {
      target = '_self';
    } else {
      target = '_blank';
      rel = 'noopener noreferrer';
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
          [arrowRightIconPersist]: arrowAppearance === ArrowAppearance.Persist,
        })}
      />
    );
  }

  const elementProps = href
    ? ({ as: 'a', href, target, rel } as const)
    : ({ as: 'span' } as const);

  return (
    <Box
      className={cx(
        anchorClassName,
        bodyTypeScaleStyles[baseFontSize],
        linkStyles,
        linkModeStyles[theme],
        className,
      )}
      {...elementProps}
      {...rest}
    >
      <span className={cx(underlineStyles, underlineModeStyles[theme])}>
        {children}
      </span>
      {icon}
    </Box>
  );
};

export default Link;
