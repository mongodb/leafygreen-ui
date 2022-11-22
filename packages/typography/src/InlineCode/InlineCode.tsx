import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@leafygreen-ui/emotion';
import {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { codeTypeScaleStyles } from '../styles';
import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';
import {
  anchorClassName,
  nowrap,
  normal,
  code,
  codeModes,
  codeLinkStyleModes,
  codeLinkWrapper,
  codeFocusModes,
} from './InlineCode.styles';
import { InlineCodeProps } from './InlineCode.types';

const InlineCode = React.forwardRef<HTMLElement, InlineCodeProps>(
  (
    { children, className, darkMode: darkModeProp, ...rest }: InlineCodeProps,
    forwardedRef,
  ) => {
    const { usingKeyboard: showFocus } = useUsingKeyboardContext();
    const baseFontSize = useUpdatedBaseFontSize();
    const { theme } = useDarkMode(darkModeProp);
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
          whiteSpace,
          {
            [codeLinkStyleModes[theme]]: isAnchor,
            [codeFocusModes[theme]]: showFocus,
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
};

export default InlineCode;
