import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';

import { ProductLogoProps } from '../Logo.types';
import { getAccessibleProps, getColor } from '../utils';

/**
 * @deprecated
 */
const RealmLogoMark = React.forwardRef(
  (
    {
      knockout = false,
      darkMode = false,
      size = 18,
      role = 'img',
      'aria-label': ariaLabel = 'Realm LogoMark',
      className,
      ...rest
    }: ProductLogoProps,
    ref: React.LegacyRef<SVGSVGElement> | undefined,
  ) => {
    return (
      <svg
        {...getAccessibleProps({ role, ['aria-label']: ariaLabel })}
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
        ref={ref}
        {...rest}
      >
        <defs>
          <linearGradient
            id="realm-path-0001"
            gradientUnits="userSpaceOnUse"
            x1="12.4555"
            y1="6.7462"
            x2="13.454"
            y2="13.2264"
            gradientTransform="matrix(1 0 0 -1 0 20)"
          >
            <stop offset="0" stopColor="#AF478B" />
            <stop offset="0.22" stopColor="#C66191" />
            <stop offset="0.53" stopColor="#EC8C9A" />
            <stop offset="0.66" stopColor="#EE99A2" />
            <stop offset="0.88" stopColor="#F3BCB6" />
            <stop offset="1" stopColor="#F6D0C2" />
          </linearGradient>
          <linearGradient
            id="realm-path-0002"
            gradientUnits="userSpaceOnUse"
            x1="8.7566"
            y1="2.3021"
            x2="8.8565"
            y2="9.5311"
            gradientTransform="matrix(1 0 0 -1 0 20)"
          >
            <stop offset="0" stopColor="#AF478B" />
            <stop offset="0.22" stopColor="#C66191" />
            <stop offset="0.53" stopColor="#EC8C9A" />
            <stop offset="0.66" stopColor="#EE99A2" />
            <stop offset="0.88" stopColor="#F3BCB6" />
            <stop offset="1" stopColor="#F6D0C2" />
          </linearGradient>
          <linearGradient
            id="realm-path-0003"
            gradientUnits="userSpaceOnUse"
            x1="4.1834"
            y1="8.0334"
            x2="5.1919"
            y2="14.5037"
            gradientTransform="matrix(1 0 0 -1 0 20)"
          >
            <stop offset="0" stopColor="#AF478B" />
            <stop offset="0.22" stopColor="#C66191" />
            <stop offset="0.53" stopColor="#EC8C9A" />
            <stop offset="0.66" stopColor="#EE99A2" />
            <stop offset="0.88" stopColor="#F3BCB6" />
            <stop offset="1" stopColor="#F6D0C2" />
          </linearGradient>
        </defs>

        <path
          className={getColor({
            knockout,
            size,
            darkMode,
            flat: '#ef8c9b',
            gradient: 'url(#realm-path-0001)',
          })}
          d="M7.8,11.1l0.8,0.3c1.7,0.7,3.5,1.1,5.3,1c1.3-0.1,2.6-0.5,3.8-1.1C17.9,10.6,18,9.8,18,9V8.7
			C14.4,7.8,10.6,8.7,7.8,11.1z"
        />

        <path
          className={getColor({
            knockout,
            size,
            darkMode,
            flat: '#b2458d',
            gradient: 'url(#realm-path-0002)',
          })}
          d="M17,13c-1,0.4-2,0.6-3.1,0.7c-2,0.1-4-0.3-5.8-1.1c-1.8-0.8-3.8-1.1-5.8-0.9c-0.6,0.1-1.2,0.3-1.7,0.5
			c1.8,4.6,7,6.9,11.6,5.1C14.3,16.6,16,15,17,13z"
        />
        <path
          className={getColor({
            knockout,
            size,
            darkMode,
            flat: '#6e60f7',
            gradient: '#6e60f2',
          })}
          d="M4.4,5.3c2.4,0,4.6,1,6.3,2.6c2.3-0.9,4.7-1.1,7.1-0.6c-0.9-4.9-5.6-8.1-10.5-7.2c-3.3,0.6-5.9,3-6.9,6.1
			C1.7,5.7,3,5.3,4.4,5.3z"
        />

        <path
          className={getColor({
            knockout,
            size,
            darkMode,
            flat: '#f9d2c3',
            gradient: 'url(#realm-path-0003)',
          })}
          d="M0.1,7.9C0,8.3,0,8.6,0,9c0,0.7,0.1,1.3,0.2,2c0.6-0.3,1.2-0.4,1.9-0.6c1.4-0.3,2.9-0.2,4.3,0.2
			c0.9-0.9,1.9-1.6,3-2.1c-1.4-1.2-3.2-1.9-5-1.9C2.9,6.6,1.4,7.1,0.1,7.9z"
        />
      </svg>
    );
  },
);

RealmLogoMark.displayName = 'RealmLogoMark';

export default RealmLogoMark;
