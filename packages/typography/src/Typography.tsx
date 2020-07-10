import React from 'react';
import PropTypes from 'prop-types';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const sharedStyles = css`
  margin: unset;
  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: ${uiColors.gray.dark2};
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

const subtitle = css`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0px;
`;

type SubtitleProps = HTMLElementProps<'h6'>;

function Subtitle({ children, className }: SubtitleProps) {
  return <h6 className={cx(sharedStyles, subtitle, className)}>{children}</h6>;
}

type BodyProps = HTMLElementProps<'p'> & {
  /**
   * font-weight applied to typography element
   * default: `regular`
   */
  weight?: 'regular' | 'medium';
};

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

const code = css`
  font-family: 'Source Code Pro', monospace;
  display: inline-block;
`;

type InlineCodeProps = HTMLElementProps<'code'>;

function InlineCode({ children, className }: InlineCodeProps) {
  const size = useBaseFontSize();
  const body = size === 16 ? typeScale2 : typeScale1;

  return (
    <code className={cx(sharedStyles, code, body, className)}>{children}</code>
  );
}

const disclaimer = css`
  display: block;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.2px;
`;

type DisclaimerProps = HTMLElementProps<'small'>;

function Disclaimer({ children, className }: DisclaimerProps) {
  return (
    <small className={cx(sharedStyles, disclaimer, className)}>
      {children}
    </small>
  );
}

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

const OpenInNewTab = (props: JSX.IntrinsicElements['svg']) => {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <title>Open in New Tab</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M9.29411765,3 L10.7727647,4.47864706 L6.42788235,8.82352941 L7.17647059,9.57211765 L11.5218824,5.22776471 L13,6.70588235 L13,3 L9.29411765,3 Z M4,4.58823529 L4,12 L11.4122941,12 L11.4122941,7.76470588 L10.3529412,7.76470588 L10.3529412,10.9411765 L5.05882353,10.9411765 L5.05882353,5.64705882 L8.23529412,5.64705882 L8.23529412,4.58823529 L4,4.58823529 Z"
          fill="#007CAD"
        />
      </g>
    </svg>
  );
};

const anchorDataProp = createDataProp('anchor-container');

const linkStyles = css`
  text-decoration: none;
  color: ${uiColors.blue.base};
  cursor: pointer;

  span {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: calc(100% + 2px);
      left: 0;
      right: 0;
      opacity: 0;
      transform: scale(0.8, 1);
      transition: 150ms ease-in-out;
      height: 3px;
      border-radius: 50px;
    }
  }

  &:hover {
    span:after {
      opacity: 1;
      transform: scale(1);
      background-color: ${uiColors.gray.light2};
    }
  }

  &:focus {
    outline: none;

    span:after {
      opacity: 1;
      transform: scale(1);
      background-color: #9dd0e7;
    }
  }
`;

const arrowRightIcon = css`
  height: 10px;
  width: 10px;
  opacity: 0;
  transform: translate3d(-3px, 0, 0);
  transition: all 100ms ease-in;

  ${anchorDataProp.selector}:hover & {
    opacity: 1;
    transform: translate3d(3px, 0, 0);
  }
`;

export type LinkProps = JSX.IntrinsicElements['a'] & {
  canShowArrow?: boolean;
  href: string;
};

const Link = ({
  href,
  children,
  className,
  target: targetProp,
  canShowArrow = false,
  ...rest
}: LinkProps) => {
  if (!href) {
    return null;
  }

  const size = useBaseFontSize();
  const fontSize = size === 16 ? typeScale2 : typeScale1;

  const hrefHostname = new URL(href).hostname;
  const currentHostname = window.location.hostname;
  let target;

  if (targetProp) {
    target = targetProp;
  } else {
    if (hrefHostname === currentHostname) {
      target = '_self';
    } else {
      target = '_blank';
    }
  }

  const icon =
    target === '_blank' ? (
      <OpenInNewTab />
    ) : canShowArrow ? (
      <ArrowRightIcon size={10} className={arrowRightIcon} />
    ) : null;

  return (
    <a
      href={href}
      target={target}
      className={cx(linkStyles, fontSize, className)}
      {...anchorDataProp.prop}
      {...rest}
    >
      <span>{children}</span>
      {icon}
    </a>
  );
};

Link.displayName = 'Link';

Link.propTypes = {
  href: PropTypes.string.isRequired,
};

export { H1, H2, Subtitle, Body, InlineCode, Disclaimer, Overline, Link };
