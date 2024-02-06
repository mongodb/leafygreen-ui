import React, { useEffect, useMemo, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  PolymorphicProps,
  PolymorphicPropsWithRef,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';

import {
  anchorClassName,
  linkModeStyles,
  linkScaleStyles,
  linkStyles,
  overwriteDefaultStyles,
  underlineModeStyles,
  underlineStyles,
} from './BackLink.styles';
import { BaseBackLinkProps } from './BackLink.types';

type LinkRenderProps = PolymorphicPropsWithRef<'span', BaseBackLinkProps>;

type AnchorLikeProps = PolymorphicProps<'a', BaseBackLinkProps>;

const hasAnchorLikeProps = (
  props: LinkRenderProps | AnchorLikeProps,
): props is AnchorLikeProps => {
  return (props as AnchorLikeProps).href !== undefined;
};

const BackLink = InferredPolymorphic<BaseBackLinkProps, 'span'>(
  (
    {
      children,
      className,
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

    return (
      <Component
        className={cx(
          anchorClassName,
          overwriteDefaultStyles,
          linkStyles,
          linkScaleStyles(baseFontSize),
          linkModeStyles[theme],
          className,
        )}
        ref={fwdRef}
        {...defaultAnchorProps}
        {...rest}
      >
        <ArrowLeftIcon role="presentation" className={cx()} />
        <span className={cx(underlineStyles, underlineModeStyles[theme])}>
          {children}
        </span>
      </Component>
    );
  },
);

export default BackLink;
