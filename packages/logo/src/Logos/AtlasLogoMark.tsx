import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';

import { ProductLogoProps } from '../Logo.types';
import { getAccessibleProps, getColor } from '../utils';

/**
 * @deprecated
 */
export const AtlasLogoMark = React.forwardRef(
  (
    {
      size = 18,
      knockout = false,
      darkMode = false,
      role = 'img',
      'aria-label': ariaLabel = 'Atlas LogoMark',
      className,
      ...rest
    }: ProductLogoProps,
    ref: React.LegacyRef<SVGSVGElement> | undefined,
  ) => {
    return (
      <svg
        {...getAccessibleProps({ role, 'aria-label': ariaLabel })}
        x="0px"
        y="0px"
        viewBox="0 0 18 18"
        width={size}
        height={size}
        className={cx(
          css`
            flex-shrink: 0;
          `,
          className,
        )}
        {...rest}
        ref={ref}
      >
        <defs>
          <linearGradient
            id="atlas-path-0001"
            gradientUnits="userSpaceOnUse"
            x1="-259.3434"
            y1="361.1949"
            x2="-258.8194"
            y2="362.3814"
            gradientTransform="matrix(8.1429 0 0 -8.8286 2123.7998 3202.6858)"
          >
            <stop offset="0" stopColor="#0D6149" />
            <stop offset="0.3697" stopColor="#03AA4F" />
            <stop offset="0.6496" stopColor="#00D057" />
            <stop offset="0.9118" stopColor="#5FD891" />
            <stop offset="1" stopColor="#80DBA5" />
          </linearGradient>
          <linearGradient
            id="atlas-path-0002"
            gradientUnits="userSpaceOnUse"
            x1="-258.827"
            y1="361.1505"
            x2="-259.5977"
            y2="362.4457"
            gradientTransform="matrix(8.1429 0 0 -8.8286 2114.457 3202.6858)"
          >
            <stop offset="0" stopColor="#0D6149" />
            <stop offset="0.3697" stopColor="#03AA4F" />
            <stop offset="0.6496" stopColor="#00D057" />
            <stop offset="0.9118" stopColor="#5FD891" />
            <stop offset="1" stopColor="#80DBA5" />
          </linearGradient>
          <linearGradient
            id="atlas-path-0003"
            gradientUnits="userSpaceOnUse"
            x1="-258.8299"
            y1="350.908"
            x2="-257.6751"
            y2="351.788"
            gradientTransform="matrix(7.9714 0 0 -7.1187 2073.0569 2514.6802)"
          >
            <stop offset="0" stopColor="#0D6149" />
            <stop offset="0.3697" stopColor="#03AA4F" />
            <stop offset="0.6496" stopColor="#00D057" />
            <stop offset="0.9118" stopColor="#5FD891" />
            <stop offset="1" stopColor="#80DBA5" />
          </linearGradient>
          <linearGradient
            id="atlas-path-4"
            gradientUnits="userSpaceOnUse"
            x1="-257.8067"
            y1="350.8745"
            x2="-259.0576"
            y2="351.7716"
            gradientTransform="matrix(7.9714 0 0 -7.1187 2063.8855 2514.6802)"
          >
            <stop offset="0" stopColor="#0D6149" />
            <stop offset="0.3697" stopColor="#03AA4F" />
            <stop offset="0.6496" stopColor="#00D057" />
            <stop offset="0.9118" stopColor="#5FD891" />
            <stop offset="1" stopColor="#80DBA5" />
          </linearGradient>
        </defs>
        <path
          className={getColor({
            knockout,
            size,
            flat: '#03aa4f',
            gradient: 'url(#atlas-path-0001)',
            darkMode,
          })}
          d="M12,11c2-1.4,4.2-1.7,6-1.7c0-0.1,0-0.3,0-0.4c0-1.7-0.5-3.3-1.3-4.7c-1.3,0.1-2.6,0.5-4,1.4
		C11,6.8,10.1,8.4,9.6,9.5v3.8C10.2,12.6,11,11.7,12,11z"
        />

        <path
          className={getColor({
            knockout,
            size,
            flat: '#03aa4f',
            gradient: 'url(#atlas-path-0002)',
            darkMode,
          })}
          d="M6,11c1,0.7,1.8,1.5,2.4,2.3V9.5C7.9,8.4,7,6.8,5.3,5.7C4,4.8,2.6,4.4,1.3,4.3
		C0.5,5.6,0,7.2,0,8.9c0,0.1,0,0.3,0,0.4C1.8,9.3,4,9.6,6,11z"
        />

        <path
          className={getColor({
            knockout,
            size,
            flat: '#00804b',
            gradient: 'url(#atlas-path-0003)',
            darkMode,
          })}
          d="M12.7,12.1c-1.7,1.1-2.6,2.7-3.1,3.8V18c4.1-0.3,7.5-3.4,8.2-7.3C16.3,10.6,14.4,10.9,12.7,12.1z
		"
        />

        <path
          className={getColor({
            knockout,
            size,
            flat: '#00804b',
            gradient: 'url(#atlas-path-4)',
            darkMode,
          })}
          d="M8.4,15.9c-0.5-1.1-1.4-2.7-3.1-3.8c-1.7-1.2-3.6-1.5-5.1-1.4c0.8,4,4.1,7,8.2,7.3V15.9z"
        />
        <path
          className={getColor({
            knockout,
            size,
            flat: '#80dba5',
            gradient: '#00804b',
            darkMode,
          })}
          d="M6,4.7C7,5.4,7.8,6.2,8.4,7V0C5.9,0.2,3.7,1.3,2.2,3.2C3.4,3.3,4.8,3.8,6,4.7z"
        />
        <path
          className={getColor({
            knockout,
            size,
            flat: '#80dba5',
            gradient: '#00804b',
            darkMode,
          })}
          d="M15.8,3.2c-1.5-1.8-3.7-3-6.2-3.1v7C10.2,6.2,11,5.4,12,4.7C13.2,3.8,14.6,3.3,15.8,3.2z"
        />
      </svg>
    );
  },
);

AtlasLogoMark.displayName = 'AtlasLogoMark';
