import React, { useMemo } from 'react';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { typeScale1, typeScale2 } from './styles';
import { __TARGET__ } from '.';

const anchorDataProp = createDataProp('anchor-container');

const linkStyles = css`
  text-decoration: none;
  color: ${uiColors.blue.base};
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const underline = css`
  background-repeat: repeat-x;
  background-position: 0 1em;
  background-size: 3px 3px;

  ${anchorDataProp.selector}:hover & {
    background-image: linear-gradient(
      to right,
      ${uiColors.gray.light2} 100%,
      ${uiColors.gray.light2} 0
    );
  }

  ${anchorDataProp.selector}:focus & {
    background-image: linear-gradient(to right, #9dd0e7 100%, #9dd0e7 0);
  }
`;

const arrowRightIconPersist = css`
  transform: translate3d(3px, 0, 0);
`;

const arrowRightIconHover = css`
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

const openInNewTabStyles = css`
  margin-bottom: -1px;
  margin-left: -1px;
  margin-right: -2px;
`;

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

// declare const __TARGET__: 'web' | 'node';

function isServer() {
  if (__TARGET__ === 'node') {
    return true;
  }

  return false;
}

const ArrowAppearance = {
  Hover: 'hover',
  Persist: 'persist',
  None: 'none',
} as const;

type ArrowAppearance = typeof ArrowAppearance[keyof typeof ArrowAppearance];

export interface LinkProps extends HTMLElementProps<'a'> {
  arrowAppearance?: ArrowAppearance;
}

const Link: ExtendableBox<LinkProps, 'a'> = ({
  href,
  children,
  className,
  target: targetProp,
  arrowAppearance = ArrowAppearance.None,
  ...rest
}: LinkProps) => {
  if (!href) {
    return null;
  }

  const size = useBaseFontSize();
  const fontSize = size === 16 ? typeScale2 : typeScale1;

  const hrefHostname = useMemo(() => new URL(href).hostname, [href]);
  const currentHostname = isServer() ? '' : window.location.hostname;

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
      <OpenInNewTab className={openInNewTabStyles} />
    ) : arrowAppearance !== ArrowAppearance.None ? (
      <ArrowRightIcon
        size={10}
        className={cx({
          [arrowRightIconHover]: arrowAppearance === ArrowAppearance.Hover,
          [arrowRightIconPersist]: arrowAppearance === ArrowAppearance.Persist,
        })}
      />
    ) : null;

  return (
    <Box
      href={href}
      target={target}
      className={cx(linkStyles, fontSize, className)}
      {...anchorDataProp.prop}
      {...rest}
    >
      <span className={underline}>{children}</span>
      {icon}
    </Box>
  );
};

export { Link };
