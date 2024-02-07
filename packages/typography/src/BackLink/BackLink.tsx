import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import ArrowLeftIcon from '@leafygreen-ui/icon/dist/ArrowLeft';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  anchorClassName,
  linkModeStyles,
  linkScaleStyles,
  linkStyles,
  overwriteDefaultStyles,
  underlineModeStyles,
  underlineStyles,
} from '../SharedLink/SharedLink.styles';
import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';

import { backLinkBaseStyles } from './BackLink.styles';
import { BaseBackLinkProps } from './BackLink.types';

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
    const { theme } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeOverride);
    const { Component } = useInferredPolymorphic(as, rest, 'span');

    return (
      <Component
        className={cx(
          anchorClassName,
          overwriteDefaultStyles,
          linkStyles,
          linkScaleStyles(baseFontSize),
          linkModeStyles[theme],
          backLinkBaseStyles,
          className,
        )}
        ref={fwdRef}
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
