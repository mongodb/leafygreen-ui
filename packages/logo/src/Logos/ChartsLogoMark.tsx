import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';

import { ProductLogoProps } from '../Logo.types';
import { getAccessibleProps, getColor } from '../utils';

/**
 * @deprecated
 */
export const ChartsLogoMark = React.forwardRef(
  (
    {
      knockout = false,
      darkMode = false,
      size = 18,
      role = 'img',
      'aria-label': ariaLabel = 'Charts LogoMark',
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
        {...rest}
        ref={ref}
      >
        <defs>
          <linearGradient
            id="charts-logo-gradient"
            gradientUnits="userSpaceOnUse"
            x1="8.071497"
            y1="3.6046767"
            x2="9.5892"
            y2="11.7870789"
          >
            <stop offset="0.1533896" stopColor="#B9EACD" />
            <stop offset="1" stopColor="#007DAF" />
          </linearGradient>
        </defs>

        <path
          className={getColor({
            knockout,
            size,
            darkMode,
            flat: '#2F9FC5',
            gradient: 'url(#charts-logo-gradient)',
          })}
          d="M9.7495308,9.9141502c-0.226757-0.0123043-0.437871-0.1191797-0.5820112-0.2946091L6.2850585,6.111299
		l-5.7055078,6.0680566c0.161543,0.4275875,0.3550781,0.83918,0.577002,1.2328854
		c3.2708936-0.0032082,8.2101269,0.0024614,15.6741505,0.022193C17.5736427,12.1252584,18,10.6128807,18,9
		c0-1.9307814-0.6100483-3.7180371-1.6450481-5.1837893l-5.9951077,5.8679295
		C10.197773,9.8429594,9.9750586,9.9268064,9.7495308,9.9141502z"
        />
        <path
          className={getColor({
            knockout,
            size,
            darkMode,
            flat: '#2F9FC5',
            gradient: '#2F9FC5',
          })}
          d="M5.735918,4.3303709C5.8953514,4.1607423,6.1177149,4.0687208,6.353086,4.075664
		c0.2327342,0.0078225,0.4508786,0.1154003,0.598711,0.2953124l2.9063668,3.537334l5.4454393-5.3298192
		C13.6798239,0.984375,11.4553127,0,9,0C4.0294337,0,0,4.0294337,0,9c0,0.4507914,0.0341016,0.8934965,0.0980859,1.3264456
		L5.735918,4.3303709z"
        />
        <path
          className={getColor({
            knockout,
            size,
            darkMode,
            flat: '#1A567E',
            gradient: '#1A567E',
          })}
          d="M2.3222461,15.0332079C3.9692285,16.8549614,6.3507128,18,9,18
		c2.640234,0,5.014863-1.1368656,6.6612301-2.9478073C11.025176,15.0413818,6.1676807,15.0334721,2.3222461,15.0332079z"
        />
      </svg>
    );
  },
);

ChartsLogoMark.displayName = 'ChartsLogoMark';
