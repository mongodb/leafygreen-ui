import React, { useMemo } from 'react';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import OpenNewTabIcon from '@leafygreen-ui/icon/dist/OpenNewTab';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { typeScale1, typeScale2 } from './styles';

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

declare const __TARGET__: 'web' | 'node';

function isServer() {
  return __TARGET__ === 'node';
}

const ArrowAppearance = {
  Hover: 'hover',
  Persist: 'persist',
  None: 'none',
} as const;

type ArrowAppearance = typeof ArrowAppearance[keyof typeof ArrowAppearance];

export interface LinkProps extends HTMLElementProps<'a'> {
  arrowAppearance?: ArrowAppearance;
  hideExternalIcon?: boolean;
}

const Link: ExtendableBox<LinkProps, 'a'> = ({
  href,
  children,
  className,
  target: targetProp,
  arrowAppearance = ArrowAppearance.None,
  hideExternalIcon = false,
  ...rest
}: LinkProps) => {
  if (!href) {
    return null;
  }

  const size = useBaseFontSize();
  const fontSize = size === 16 ? typeScale2 : typeScale1;

  const hrefHostname = useMemo(() => new URL(href).hostname, [href]);
  const currentHostname = isServer() ? '' : window.location.hostname;

  let target, icon;

  if (targetProp) {
    target = targetProp;
  } else {
    if (hrefHostname === currentHostname) {
      target = '_self';
    } else {
      target = '_blank';
    }
  }

  if (target === '_blank' && !hideExternalIcon) {
    icon = <OpenNewTabIcon className={openInNewTabStyles} />;
  } else if (arrowAppearance !== ArrowAppearance.None) {
    icon = (
      <ArrowRightIcon
        size={10}
        className={cx({
          [arrowRightIconHover]: arrowAppearance === ArrowAppearance.Hover,
          [arrowRightIconPersist]: arrowAppearance === ArrowAppearance.Persist,
        })}
      />
    );
  }

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
