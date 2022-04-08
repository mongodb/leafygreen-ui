import React from 'react';
import { HTMLElementProps, createDataProp, OneOf } from '@leafygreen-ui/lib';
import {
  useBaseFontSize,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { codeTypeScaleStyles } from '../styles';

const anchorDataProp = createDataProp('anchor-inline-code');

/**
 * Code
 */
const code = css`
  transition: all 0.15s ease-in-out;
  border-radius: 3px;
  font-family: ${fontFamilies.code};

  ${anchorDataProp.selector}:hover > & {
    text-decoration: none;
  }
`;

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

const codeModes = {
  [Mode.Light]: css`
    background-color: ${palette.gray.light3};
    border: 1px solid ${palette.gray.light2};
    color: ${palette.gray.dark3};

    ${anchorDataProp.selector}:hover > & {
      box-shadow: 0 0 0 3px ${palette.gray.light2};
      border: 1px solid ${palette.gray.light1};
    }
  `,

  [Mode.Dark]: css`
    background-color: transparent;
    border: 1px solid ${palette.gray.dark1};
    color: ${palette.gray.light3};

    ${anchorDataProp.selector}:hover > & {
      box-shadow: 0 0 0 3px ${palette.gray.dark1};
      border: 1px solid ${palette.gray.base};
    }
  `,
};

const codeFocusModes = {
  [Mode.Light]: css`
    ${anchorDataProp.selector}:focus > & {
      box-shadow: 0 0 0 2px ${palette.white}, 0 0 0 4px ${palette.blue.light1};
      border: 1px solid ${palette.blue.base};
    }
  `,

  [Mode.Dark]: css`
    ${anchorDataProp.selector}:focus > & {
      box-shadow: 0 0 0 2px ${palette.black}, 0 0 0 4px ${palette.blue.light1};
      border: 1px solid ${palette.blue.base};
    }
  `,
};

const codeLinkStyleModes = {
  [Mode.Light]: css`
    color: ${palette.blue.base};
  `,
  [Mode.Dark]: css`
    color: ${palette.blue.light1};
  `,
};

const codeLinkWrapper = css`
  text-decoration: none;
  margin: 0;
  padding: 0;

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
type InlineCodeProps = OneOf<
  HTMLElementProps<'code'>,
  HTMLElementProps<'a'>
> & {
  darkMode?: boolean;
};

export function InlineCode({
  children,
  className,
  darkMode,
  ...rest
}: InlineCodeProps) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const baseFontSize = useBaseFontSize();

  const mode = darkMode ? Mode.Dark : Mode.Light;
  const whiteSpace =
    ((typeof children === 'string' && children.match(/./gu)?.length) ?? 0) <= 30
      ? nowrap
      : normal;
  const isAnchor = rest?.href !== undefined || rest.onClick !== undefined;

  const renderedInlineCode = (
    <code
      className={cx(
        code,
        codeModes[mode],
        codeTypeScaleStyles[baseFontSize],
        whiteSpace,
        {
          [codeLinkStyleModes[mode]]: isAnchor,
          [codeFocusModes[mode]]: showFocus,
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
        {...anchorDataProp.prop}
        className={cx(codeLinkWrapper, className)}
        {...rest}
      >
        {renderedInlineCode}
      </a>
    );
  }

  return React.cloneElement(renderedInlineCode, rest);
}

InlineCode.displayName = 'InlineCode';

/**
 * Inline Key Code
 */
const inlineKeyCode = css`
  font-family: ${fontFamilies.code};
  color: ${palette.gray.dark3};
  border: 1px solid ${palette.gray.dark3};
  border-radius: 3px;
  padding-left: 4px;
  padding-right: 4px;
`;

export function InlineKeyCode({
  children,
  className,
  ...rest
}: InlineCodeProps) {
  const baseFontSize = useBaseFontSize();

  return (
    <code
      className={cx(
        inlineKeyCode,
        codeTypeScaleStyles[baseFontSize],
        className,
      )}
      {...rest}
    >
      {children}
    </code>
  );
}

InlineKeyCode.displayName = 'InlineKeyCode';
