import React from 'react';
import Box, { BoxProps } from '@leafygreen-ui/box';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import omit from 'lodash/omit';

const sharedStyles = css`
  display: block;
  margin: unset;
  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: ${uiColors.gray.dark2};
`;

const h1 = css`
  font-weight: 500;
  font-size: 60px;
  line-height: 68px;
  letter-spacing: -0.3px;
`;

const h2 = css`
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0px;
`;

const subtitle = css`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0px;
`;

const typeScale1 = css`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
`;

const typeScale2 = css`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
`;

const code = css`
  font-family: 'Source Code Pro', monospace;
`;

const disclaimer = css`
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.2px;
`;

const overline = css`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 16px;
  letter-spacing: 0.4px;
`;

type H1Props = HTMLElementProps<'h1'>;

type H2Props = HTMLElementProps<'h2'>;

type SubtitleProps = HTMLElementProps<'h6'>;

type BodyProps = HTMLElementProps<'p'> & {
  /**
   * font-weight applied to typography element
   * default: `regular`
   */
  weight?: 'regular' | 'medium';
};

type InlineCodeProps = HTMLElementProps<'code'>;

type DisclaimerProps = HTMLElementProps<'small'>;

type OverlineProps<T> = T & BoxProps<T>;

function H1({ children, className, ...rest }: H1Props) {
  return (
    <h1 {...rest} className={cx(sharedStyles, h1, className)}>
      {children}
    </h1>
  );
}

function H2({ children, className, ...rest }: H2Props) {
  return (
    <h2 {...rest} className={cx(sharedStyles, h2, className)}>
      {children}
    </h2>
  );
}

function Subtitle({ children, className }: SubtitleProps) {
  return <h6 className={cx(sharedStyles, subtitle, className)}>{children}</h6>;
}

function Body({ children, className, weight = 'regular' }: BodyProps) {
  const size = useBaseFontSize();
  const body = size === 16 ? typeScale2 : typeScale1;

  const fontWeight = css`
    font-weight: ${weight !== 'regular' ? 600 : 400};
  `;

  return (
    <p className={cx(sharedStyles, body, fontWeight, className)}>{children}</p>
  );
}

function InlineCode({ children, className }: InlineCodeProps) {
  const size = useBaseFontSize();
  const body = size === 16 ? typeScale2 : typeScale1;

  return (
    <code className={cx(sharedStyles, code, body, className)}>{children}</code>
  );
}

function Disclaimer({ children, className }: DisclaimerProps) {
  return (
    <small className={cx(sharedStyles, disclaimer, className)}>
      {children}
    </small>
  );
}

function Overline<T extends React.ReactNode>(props: OverlineProps<T>) {
  const rest = omit(props as any, ['className']);
  return (
    <Box className={cx(sharedStyles, overline, props.className)} {...rest} />
  );
}

export { H1, H2, Subtitle, Body, InlineCode, Disclaimer, Overline };
