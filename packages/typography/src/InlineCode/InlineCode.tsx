import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { codeTypeScaleStyles } from '../styles';
import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';

import {
  anchorClassName,
  code,
  codeFocusModes,
  codeLinkStyleModes,
  codeLinkWrapper,
  codeModes,
  normal,
  nowrap,
} from './InlineCode.styles';
import { BaseInlineCodeProps } from './InlineCode.types';
import { getChildrenLength } from './utils';

const InlineCode = InferredPolymorphic<BaseInlineCodeProps, 'code'>(
  (
    {
      children,
      className,
      darkMode: darkModeProp,
      baseFontSize: baseFontSizeOverride,
      as,
      ...rest
    },
    forwardedRef,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeOverride);
    const { Component } = useInferredPolymorphic(as, rest, 'code');

    const charsCount = getChildrenLength(children);
    const whiteSpace = charsCount <= 30 ? nowrap : normal;
    const needsWrapper = Component !== 'code';

    const renderedInlineCode = (
      <code
        ref={forwardedRef}
        className={cx(
          codeTypeScaleStyles[baseFontSize],
          code,
          codeModes[theme],
          codeFocusModes[theme],
          whiteSpace,
          {
            [codeLinkStyleModes[theme]]: needsWrapper,
          },
          className,
        )}
      >
        {children}
      </code>
    );

    if (needsWrapper) {
      return (
        <Component
          className={cx(anchorClassName, codeLinkWrapper, className)}
          {...rest}
        >
          {renderedInlineCode}
        </Component>
      );
    }

    return React.cloneElement(renderedInlineCode, rest);
  },
);

InlineCode.displayName = 'InlineCode';

export default InlineCode;
