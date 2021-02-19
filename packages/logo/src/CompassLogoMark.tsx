import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { ProductLogoProps, getColor, getAccessibleProps } from './utils';

function Compass({
  size = 18,
  knockout = false,
  darkMode = false,
  role = 'img',
  'aria-label': ariaLabel = 'Atlas LogoMark',
  className,
  ...rest
}: ProductLogoProps) {
  return (
    <svg
      {...rest}
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
    >
      <defs>
        <linearGradient
          id="compass-lg-1"
          x1="8.66394"
          y1="16.885"
          x2="3.90968"
          y2="10.2359"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#166149" />
          <stop offset="0.37" stopColor="#11A750" />
          <stop offset="0.65" stopColor="#48B75B" />
          <stop offset="0.93" stopColor="#76C692" />
          <stop offset="1" stopColor="#87CBA0" />
        </linearGradient>
        <linearGradient
          id="compass-lg-2"
          x1="13.9283"
          y1="7.31472"
          x2="3.81443"
          y2="13.3618"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8ACDA3" />
          <stop offset="0.07" stopColor="#79C692" />
          <stop offset="0.35" stopColor="#4CB85B" />
          <stop offset="0.63" stopColor="#16AA51" />
          <stop offset="1" stopColor="#166149" />
        </linearGradient>
      </defs>
      <path
        d="M16.2019 14.4C15.0019 16 13.3019 17.1 11.4019 17.7L15.0019 2.30005C18.5019 5.40005 19.0019 10.7 16.2019 14.4Z"
        className={getColor({
          size,
          knockout,
          darkMode,
          gradient: '#11A750',
          flat: '#11A750',
        })}
      />
      <path
        d="M13.7018 1.4L0.00183493 9.1C-0.0981651 4.1 3.90183 0.1 8.90183 0C10.6018 0 12.3018 0.4 13.7018 1.4Z"
        className={getColor({
          size,
          knockout,
          darkMode,
          gradient: '#11A750',
          flat: '#11A750',
        })}
      />
      <path
        d="M9.70184 18C5.20184 18.3 1.10184 15.3 0.201843 10.8L7.20184 11.3L9.70184 18Z"
        className={getColor({
          size,
          knockout,
          darkMode,
          gradient: 'url(#compass-lg-1)',
          flat: 'url(#compass-lg-1)',
        })}
      />
      <path
        d="M13.6018 2.90002L10.4018 16.3L8.30181 10.5C8.30181 10.4 8.20181 10.3 8.10181 10.2C8.00181 10.1 7.90181 10.1 7.80181 10.1L1.60181 9.70002L13.6018 2.90002Z"
        className={getColor({
          size,
          knockout,
          darkMode,
          gradient: '#87CBA0',
          flat: '#87CBA0',
        })}
      />
      <path
        d="M13.6018 2.90002L10.4018 16.3L8.30181 10.5C8.30181 10.4 8.20181 10.3 8.10181 10.2C8.00181 10.1 7.90181 10.1 7.80181 10.1L1.60181 9.70002L13.6018 2.90002Z"
        className={getColor({
          size,
          knockout,
          darkMode,
          gradient: 'url(#compass-lg-2)',
          flat: 'url(#compass-lg-2)',
        })}
      />
    </svg>
  );
}

Compass.displayName = 'Compass';

export default Compass;
