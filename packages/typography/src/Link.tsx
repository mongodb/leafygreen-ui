import React, { useEffect, useMemo, useState } from 'react';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import OpenNewTabIcon from '@leafygreen-ui/icon/dist/OpenNewTab';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { bodyTypeScaleStyles } from './styles';

const anchorDataProp = createDataProp('anchor-container');

const linkStyles = css`
  font-family: ${fontFamilies.default};
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${palette.blue.base};
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const underline = css`
  background-repeat: repeat-x;
  background-size: 2px 2px;
  background-position: center bottom;

  ${anchorDataProp.selector}:hover & {
    background-image: linear-gradient(
      ${palette.gray.light2} 100%,
      ${palette.gray.light2} 0
    );
  }

  ${anchorDataProp.selector}:focus & {
    background-image: linear-gradient(
      to right,
      ${palette.blue.light1} 100%,
      ${palette.blue.light1} 0
    );
  }
`;

const arrowRightIconPersist = css`
  transform: translate3d(3px, 0, 0);
`;

const arrowRightIconHover = css`
  opacity: 0;
  transform: translate3d(-3px, 0, 0);
  transition: all 100ms ease-in;

  ${anchorDataProp.selector}:hover & {
    opacity: 1;
    transform: translate3d(3px, 0, 0);
  }
`;

const openInNewTabStyles = css`
  position: relative;
  bottom: 4px;
  left: -1px;
  height: 12px;
`;

const ArrowAppearance = {
  Hover: 'hover',
  Persist: 'persist',
  None: 'none',
} as const;

type ArrowAppearance = typeof ArrowAppearance[keyof typeof ArrowAppearance];

export { ArrowAppearance };

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
  const [currentHostname, setCurrentHostname] = useState('');
  useEffect(() => {
    setCurrentHostname(window.location.hostname);
  }, []);

  const hrefHostname = useMemo(() => {
    if (!href) return;
    const httpRegex = /^http(s)?:\/\//;
    return httpRegex.test(href) ? new URL(href).hostname : currentHostname;
  }, [href, currentHostname]);

  const baseFontSize = useBaseFontSize();

  let target, icon, rel;

  if (targetProp) {
    target = targetProp;
  } else {
    if (hrefHostname === currentHostname) {
      target = '_self';
    } else {
      target = '_blank';
      rel = 'noopener noreferrer';
    }
  }

  if (target === '_blank' && !hideExternalIcon) {
    icon = (
      <OpenNewTabIcon role="presentation" className={openInNewTabStyles} />
    );
  } else if (arrowAppearance !== ArrowAppearance.None) {
    icon = (
      <ArrowRightIcon
        role="presentation"
        size={12}
        className={cx({
          [arrowRightIconHover]: arrowAppearance === ArrowAppearance.Hover,
          [arrowRightIconPersist]: arrowAppearance === ArrowAppearance.Persist,
        })}
      />
    );
  }

  const elementProps = href
    ? ({ as: 'a', href, target, rel } as const)
    : ({ as: 'span' } as const);

  return (
    <Box
      className={cx(linkStyles, bodyTypeScaleStyles[baseFontSize], className)}
      {...elementProps}
      {...anchorDataProp.prop}
      {...rest}
    >
      <span className={underline}>{children}</span>
      {icon}
    </Box>
  );
};

export default Link;
