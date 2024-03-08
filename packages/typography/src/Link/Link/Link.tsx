import React, { useEffect, useMemo, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import OpenNewTabIcon from '@leafygreen-ui/icon/dist/OpenNewTab';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  PolymorphicProps,
  PolymorphicPropsWithRef,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { useUpdatedBaseFontSize } from '../../utils/useUpdatedBaseFontSize';
import {
  anchorClassName,
  linkModeStyles,
  linkScaleStyles,
  linkStyles,
} from '../shared.styles';

import {
  arrowRightIconHover,
  arrowRightIconPersist,
  openInNewTabStyles,
} from './Link.styles';
import { ArrowAppearance, BaseLinkProps } from './Link.types';

type LinkRenderProps = PolymorphicPropsWithRef<'span', BaseLinkProps>;

type AnchorLikeProps = PolymorphicProps<'a', BaseLinkProps>;

const hasAnchorLikeProps = (
  props: LinkRenderProps | AnchorLikeProps,
): props is AnchorLikeProps => {
  return (props as AnchorLikeProps).href !== undefined;
};

const Link = InferredPolymorphic<BaseLinkProps, 'span'>(
  (
    {
      children,
      className,
      arrowAppearance = ArrowAppearance.None,
      hideExternalIcon = false,
      baseFontSize: baseFontSizeOverride,
      darkMode: darkModeProp,
      as,
      ...rest
    },
    fwdRef,
  ) => {
    const [currentHostname, setCurrentHostname] = useState('');
    useEffect(() => {
      setCurrentHostname(window.location.hostname);
    }, []);

    const { theme } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeOverride);
    const { Component } = useInferredPolymorphic(as, rest, 'span');

    const hrefHostname = useMemo(() => {
      if (hasAnchorLikeProps(rest)) {
        const httpRegex = /^http(s)?:\/\//;
        return httpRegex.test(rest.href)
          ? new URL(rest.href).hostname
          : currentHostname;
      }
    }, [rest, currentHostname]);

    let icon;

    const defaultAnchorProps: Pick<
      JSX.IntrinsicElements['a'],
      'target' | 'rel'
    > = {
      target: undefined,
      rel: undefined,
    };

    if ((rest as AnchorLikeProps).target || (rest as AnchorLikeProps).rel) {
      defaultAnchorProps.target = (rest as AnchorLikeProps).target;
      defaultAnchorProps.rel = (rest as AnchorLikeProps).rel;
    } else if (Component === 'a') {
      // Sets defaults for target and rel props when Component is an anchor tag
      if (hrefHostname === currentHostname) {
        defaultAnchorProps.target = '_self';
      } else {
        // Open in new tab
        defaultAnchorProps.target = '_blank';
        defaultAnchorProps.rel = 'noopener noreferrer';
      }
    }

    if (defaultAnchorProps.target === '_blank' && !hideExternalIcon) {
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
          linkStyles,
          linkScaleStyles(baseFontSize),
          linkModeStyles[theme],
          className,
        )}
        ref={fwdRef}
        {...defaultAnchorProps}
        {...rest}
      >
        <span>{children}</span>

        {icon}
      </Component>
    );
  },
);

export default Link;
