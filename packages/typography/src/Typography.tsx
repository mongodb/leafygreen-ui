import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { HTMLElementProps, createDataProp, OneOf } from '@leafygreen-ui/lib';
import {
  useBaseFontSize,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette, uiColors } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { typeScale1, typeScale2 } from './styles';

const sharedStyles = css`
  margin: unset;
  font-family: ${fontFamilies.default};
  color: ${palette.black};
`;

/**
 * H1
 */
const h1 = css`
  font-weight: 400;
  font-size: 60px;
  line-height: 68px;
  letter-spacing: -0.3px;
  font-family: ${fontFamilies.serif};
`;

type H1Props = HTMLElementProps<'h1'>;

const H1: ExtendableBox<H1Props, 'h1'> = ({
  className,
  ...rest
}: {
  className?: string;
}) => {
  return <Box as="h1" className={cx(sharedStyles, h1, className)} {...rest} />;
};

H1.displayName = 'H1';

/**
 * H2
 */
const h2 = css`
  font-size: 32px;
  line-height: 40px;
  letter-spacing: -0.3px;
  font-weight: 400;
  font-family: ${fontFamilies.serif};
`;

type H2Props = HTMLElementProps<'h2'>;

const H2: ExtendableBox<H2Props, 'h2'> = ({
  className,
  ...rest
}: {
  className?: string;
}) => {
  return <Box as="h2" className={cx(sharedStyles, h2, className)} {...rest} />;
};

H2.displayName = 'H2';

/**
 * H3
 */
const h3 = css`
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.3px;
  font-weight: 700;
`;

type H3Props = HTMLElementProps<'h3'>;

const H3: ExtendableBox<H3Props, 'h3'> = ({
  className,
  ...rest
}: {
  className?: string;
}) => {
  return <Box as="h3" className={cx(sharedStyles, h3, className)} {...rest} />;
};

H3.displayName = 'H3';

/**
 * Subtitle
 */
const subtitle = css`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.3px;
  font-weight: 700;
`;

type SubtitleProps = HTMLElementProps<'h6'>;

const Subtitle: ExtendableBox<SubtitleProps, 'h6'> = ({
  className,
  ...rest
}: {
  className?: string;
}) => {
  return (
    <Box as="h6" className={cx(sharedStyles, subtitle, className)} {...rest} />
  );
};

Subtitle.displayName = 'Subtitle';

/**
 * Body
 */
type BodyProps = HTMLElementProps<'div'> & {
  /**
   * font-weight applied to typography element
   * default: `regular`
   */
  weight?: 'regular' | 'medium';
};

function Body({ children, className, weight = 'regular', ...rest }: BodyProps) {
  const size = useBaseFontSize();
  const body = size === 16 ? typeScale2 : typeScale1;

  const fontWeight = css`
    font-weight: ${weight === 'regular' ? 400 : 500};

    strong,
    b {
      font-weight: ${weight === 'regular' ? 700 : 800};
    }
  `;

  return (
    <div {...rest} className={cx(sharedStyles, body, fontWeight, className)}>
      {children}
    </div>
  );
}

Body.displayName = 'Body';

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
    border: 1px solid ${uiColors.gray.dark1};
    color: ${uiColors.gray.light3};

    ${anchorDataProp.selector}:hover > & {
      box-shadow: 0 0 0 3px ${uiColors.gray.dark1};
      border: 1px solid ${uiColors.gray.base};
    }
  `,
};

const codeFocusModes = {
  [Mode.Light]: css`
    ${anchorDataProp.selector}:focus > & {
      box-shadow: 0 0 0 3px ${palette.blue.light2};
      border: 1px solid ${palette.blue.base};
    }
  `,

  [Mode.Dark]: css`
    ${anchorDataProp.selector}:focus > & {
      box-shadow: 0 0 0 3px ${uiColors.blue.base};
      border: 1px solid ${uiColors.focus};
    }
  `,
};

const codeLinkStyleModes = {
  [Mode.Light]: css`
    color: ${palette.blue.base};
  `,
  [Mode.Dark]: css`
    color: #28bfff;
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

function InlineCode({
  children,
  className,
  darkMode,
  ...rest
}: InlineCodeProps) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const size = useBaseFontSize();
  const fontSize = size === 16 ? typeScale2 : typeScale1;
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
        fontSize,
        whiteSpace,
        { [codeLinkStyleModes[mode]]: isAnchor },
        { [codeFocusModes[mode]]: showFocus },
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

function InlineKeyCode({ children, className, ...rest }: InlineCodeProps) {
  const size = useBaseFontSize();
  const body = size === 16 ? typeScale2 : typeScale1;

  return (
    <code className={cx(inlineKeyCode, body, className)} {...rest}>
      {children}
    </code>
  );
}

InlineKeyCode.displayName = 'InlineKeyCode';

/**
 * Disclaimer
 */
const disclaimer = css`
  display: block;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0px;
`;

type DisclaimerProps = HTMLElementProps<'small'>;

function Disclaimer({ children, className, ...rest }: DisclaimerProps) {
  return (
    <small {...rest} className={cx(sharedStyles, disclaimer, className)}>
      {children}
    </small>
  );
}

Disclaimer.displayName = 'Disclaimer';

/**
 * Overline
 */
const overline = css`
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 16px;
  letter-spacing: 0.3px;
`;

const Overline: ExtendableBox<{
  className?: string;
}> = ({ className, ...rest }: { className?: string }) => {
  return <Box className={cx(sharedStyles, overline, className)} {...rest} />;
};

Overline.displayName = 'Overline';

export {
  H1,
  H2,
  H3,
  Subtitle,
  Body,
  InlineCode,
  InlineKeyCode,
  Disclaimer,
  Overline,
};
