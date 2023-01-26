import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';

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
import { InlineCodeProps } from './InlineCode.types';

const InlineCode = React.forwardRef<HTMLElement, InlineCodeProps>(
  (
    {
      children,
      className,
      darkMode: darkModeProp,
      baseFontSize: baseFontSizeOverride,
      ...rest
    }: InlineCodeProps,
    forwardedRef,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeOverride);

    const whiteSpace =
      ((typeof children === 'string' && children.match(/./gu)?.length) ?? 0) <=
      30
        ? nowrap
        : normal;
    const isAnchor = rest?.href !== undefined || rest.onClick !== undefined;

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
            [codeLinkStyleModes[theme]]: isAnchor,
          },
          className,
        )}
      >
        {children}
      </code>
    );

    if (isAnchor) {
      return (
        <a
          className={cx(anchorClassName, codeLinkWrapper, className)}
          {...rest}
        >
          {renderedInlineCode}
        </a>
      );
    }

    return React.cloneElement(renderedInlineCode, rest);
  },
);

InlineCode.displayName = 'InlineCode';
InlineCode.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
};

export default InlineCode;
