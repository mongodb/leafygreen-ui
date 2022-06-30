import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, focusRing } from '@leafygreen-ui/tokens';
import {
  HTMLElementProps,
  OneOf,
  createUniqueClassName,
  Theme,
} from '@leafygreen-ui/lib';
import {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { codeTypeScaleStyles } from './styles';
import { CommonTypographyProps } from './types';
import { useUpdatedBaseFontSize } from '.';

const anchorClassName = createUniqueClassName();

/**
 * Code
 */
const code = css`
  transition: all 0.15s ease-in-out;
  border-radius: 3px;
  font-family: ${fontFamilies.code};
  line-height: 20px;
  display: inherit;

  .${anchorClassName}:hover > & {
    text-decoration: none;
  }
`;

const codeModes: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};
    border: 1px solid ${palette.gray.light2};
    color: ${palette.gray.dark3};

    .${anchorClassName}:hover > & {
      box-shadow: 0 0 0 3px ${palette.gray.light2};
      border: 1px solid ${palette.gray.light1};
    }
  `,

  [Theme.Dark]: css`
    background-color: transparent;
    border: 1px solid ${palette.gray.dark2};
    color: ${palette.gray.light1};

    .${anchorClassName}:hover > & {
      box-shadow: 0 0 0 3px ${palette.gray.dark2};
      border: 1px solid ${palette.gray.dark1};
    }
  `,
};

const codeFocusModes: Record<Theme, string> = {
  [Theme.Light]: css`
    .${anchorClassName}:focus > & {
      box-shadow: ${focusRing[Theme.Light].default};
      border: 1px solid ${palette.blue.base};
    }
  `,

  [Theme.Dark]: css`
    .${anchorClassName}:focus > & {
      box-shadow: ${focusRing[Theme.Dark].default};
      border: 1px solid ${palette.blue.base};
    }
  `,
};

const codeLinkStyleModes: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.blue.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.blue.light1};
  `,
};

const codeLinkWrapper = css`
  text-decoration: none;
  margin: 0;
  padding: 0;
  line-height: 20px;

  &:focus {
    outline: none;
  }
`;

const nowrap = css`
  white-space: nowrap;
`;

const normal = css`
  white-space: normal;
`;

/**
 * Inline Code
 */
export type InlineCodeProps = OneOf<
  HTMLElementProps<'code'>,
  HTMLElementProps<'a'>
> &
  CommonTypographyProps;

function InlineCode({
  children,
  className,
  darkMode: darkModeProp,
  ...rest
}: InlineCodeProps) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const baseFontSize = useUpdatedBaseFontSize();
  const { theme } = useDarkMode(darkModeProp);
  const whiteSpace =
    ((typeof children === 'string' && children.match(/./gu)?.length) ?? 0) <= 30
      ? nowrap
      : normal;
  const isAnchor = rest?.href !== undefined || rest.onClick !== undefined;

  const renderedInlineCode = (
    <code
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
      <a className={cx(anchorClassName, codeLinkWrapper, className)} {...rest}>
        {renderedInlineCode}
      </a>
    );
  }

  return React.cloneElement(renderedInlineCode, rest);
}

InlineCode.displayName = 'InlineCode';

export default InlineCode;
