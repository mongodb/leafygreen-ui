import React, { useEffect, useMemo, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import OpenNewTabIcon from '@leafygreen-ui/icon/dist/OpenNewTab';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
  PolymorphicAs,
  InferredPolymorphicProps,
  PolymorphicProps,
} from '@leafygreen-ui/polymorphic';

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

type LinkRenderProps = PolymorphicProps<
  PolymorphicAs,
  InferredPolymorphicProps<LinkProps>
>;

type AnchorLikeProps = PolymorphicProps<'a', LinkProps>;

const hasAnchorLikeProps = (
  props: LinkRenderProps | AnchorLikeProps,
): props is AnchorLikeProps => {
  return (props as AnchorLikeProps).href !== undefined;
};

const Link = InferredPolymorphic<LinkProps, 'span'>(
  ({
    children,
    className,
    arrowAppearance = ArrowAppearance.None,
    hideExternalIcon = false,
    baseFontSize: baseFontSizeOverride,
    darkMode: darkModeProp,
    as = 'span' as PolymorphicAs,
    ...rest
  }) => {
    const [currentHostname, setCurrentHostname] = useState('');
    useEffect(() => {
      setCurrentHostname(window.location.hostname);
    }, []);

    const { theme } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeOverride);
    const { Component } = useInferredPolymorphic(as, rest);

    const hrefHostname = useMemo(() => {
      if (hasAnchorLikeProps(rest)) {
        const httpRegex = /^http(s)?:\/\//;
        return httpRegex.test(rest.href)
          ? new URL(rest.href).hostname
          : currentHostname;
      }
    }, [rest, currentHostname]);

    let target, rel, icon;

    // Sets defaults for target and rel props when Component is an anchor tag
    if (Component === 'a') {
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
