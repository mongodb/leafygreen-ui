import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { HTMLElementProps, createDataProp, OneOf } from '@leafygreen-ui/lib';
import {
  useBaseFontSize,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { typeScale1, typeScale2 } from './styles';

const sharedStyles = css`
  margin: unset;
  font-family: ${fontFamilies.default};
  color: ${uiColors.gray.dark3};
`;

const h1 = css`
  font-weight: 500;
  font-size: 60px;
  line-height: 68px;
  letter-spacing: -0.3px;
`;

type H1Props = HTMLElementProps<'h1'>;

function H1({ children, className, ...rest }: H1Props) {
  return (
    <h1 {...rest} className={cx(sharedStyles, h1, className)}>
      {children}
    </h1>
  );
}

H1.displayName = 'H1';

const h2 = css`
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0px;
`;

type H2Props = HTMLElementProps<'h2'>;

function H2({ children, className, ...rest }: H2Props) {
  return (
    <h2 {...rest} className={cx(sharedStyles, h2, className)}>
      {children}
    </h2>
  );
}

H2.displayName = 'H2';

const h3 = css`
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0px;
  font-weight: medium;
`;

type H3Props = HTMLElementProps<'h3'>;

function H3({ children, className, ...rest }: H3Props) {
  return (
    <h3 {...rest} className={cx(sharedStyles, h3, className)}>
      {children}
    </h3>
  );
}

H3.displayName = 'H3';

const subtitle = css`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0px;
`;

type SubtitleProps = HTMLElementProps<'h6'>;

function Subtitle({ children, className, ...rest }: SubtitleProps) {
  return (
    <h6 {...rest} className={cx(sharedStyles, subtitle, className)}>
      {children}
    </h6>
  );
}

Subtitle.displayName = 'Subtitle';

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
    font-weight: ${weight !== 'regular' ? 600 : 400};
  `;

  return (
    <div {...rest} className={cx(sharedStyles, body, fontWeight, className)}>
      {children}
    </div>
  );
}

Body.displayName = 'Body';

const anchorDataProp = createDataProp('anchor-inline-code');

const code = css`
  background-color: ${uiColors.gray.light3};
  border: 1px solid ${uiColors.gray.light1};
  border-radius: 3px;
  font-family: ${fontFamilies.code};

  ${anchorDataProp.selector}:hover > code > & {
    border-color: ${uiColors.blue.base};
  }
`;

const codeFocus = css`
  ${anchorDataProp.selector}:focus > code > & {
    border-color: ${uiColors.blue.base};
    background-color: ${uiColors.gray.light3};
  }
`;

const codeLink = css`
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

const colorBlue = css`
  color: ${uiColors.blue.base};
`;

type InlineCodeProps = OneOf<HTMLElementProps<'code'>, HTMLElementProps<'a'>>;

function InlineCode({ children, className, ...rest }: InlineCodeProps) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const size = useBaseFontSize();
  const fontSize = size === 16 ? typeScale2 : typeScale1;
  const whiteSpace =
    ((typeof children === 'string' && children.match(/./gu)?.length) ?? 0) <= 30
      ? nowrap
      : normal;
  const isAnchor = rest?.href || rest.onClick;

  const renderedInlineCode = (isAnchor = false) => (
    <code className={cx(fontSize, whiteSpace, { [colorBlue]: isAnchor })}>
      <span className={cx(code, { [codeFocus]: showFocus })}>{children}</span>
    </code>
  );

  if (isAnchor) {
    return (
      <a {...anchorDataProp.prop} className={cx(codeLink, className)} {...rest}>
        {renderedInlineCode(true)}
      </a>
    );
  }

  return renderedInlineCode();
}

InlineCode.displayName = 'InlineCode';

const inlineKeyCode = css`
  font-family: ${fontFamilies.code};
  color: ${uiColors.gray.dark3};
  border: 1px solid ${uiColors.gray.dark3};
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

const disclaimer = css`
  display: block;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.2px;
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

const overline = css`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 16px;
  letter-spacing: 0.4px;
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
