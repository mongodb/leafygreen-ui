import React from 'react';
import { useTypographyScale } from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const sharedStyles = css`
  display: block;
  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: ${uiColors.gray.dark2};
`;

const h1 = css`
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

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

interface BodyProps extends TypographyProps {
  weight?: 'regular' | 'medium';
}

function H1({ children, className }: TypographyProps) {
  return <h1 className={cx(sharedStyles, h1, className)}>{children}</h1>;
}

function H2({ children, className }: TypographyProps) {
  return <h2 className={cx(sharedStyles, h2, className)}>{children}</h2>;
}

function Subtitle({ children, className }: TypographyProps) {
  return <h6 className={cx(sharedStyles, subtitle, className)}>{children}</h6>;
}

function Body({ children, className, weight = 'regular' }: BodyProps) {
  const size = useTypographyScale();
  const body = size === 16 ? typeScale2 : typeScale1;

  const fontWeight = css`
    font-weight: ${weight === 'regular' ? 400 : 600};
  `;

  return (
    <p className={cx(sharedStyles, body, fontWeight, className)}>{children}</p>
  );
}

function InlineCode({ children, className }: TypographyProps) {
  const size = useTypographyScale();
  const body = size === 16 ? typeScale2 : typeScale1;

  return (
    <code className={cx(sharedStyles, code, body, className)}>{children}</code>
  );
}

function Disclaimer({ children, className }: TypographyProps) {
  return (
    <small className={cx(sharedStyles, disclaimer, className)}>
      {children}
    </small>
  );
}

function Overline({ children, className }: TypographyProps) {
  return <h6 className={cx(sharedStyles, overline, className)}>{children}</h6>;
}

export { H1, H2, Subtitle, Body, InlineCode, Disclaimer, Overline };
