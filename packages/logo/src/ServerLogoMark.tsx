import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { ProductLogoProps, getColor, getAccessibleProps } from './utils';

function ServerLogoMark({
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
          id="lg-server-logo-lg-1"
          x1="6.39375"
          y1="15.0026"
          x2="17.5001"
          y2="15.0026"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#166149" />
          <stop offset="0.37" stopColor="#11A750" />
          <stop offset="0.65" stopColor="#48B75B" />
          <stop offset="0.93" stopColor="#76C692" />
          <stop offset="1" stopColor="#87CBA0" />
        </linearGradient>
        <linearGradient
          id="lg-server-logo-lg-2"
          x1="6.39375"
          y1="3.6822"
          x2="17.8679"
          y2="3.6822"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#166149" />
          <stop offset="0.37" stopColor="#11A750" />
          <stop offset="0.65" stopColor="#48B75B" />
          <stop offset="0.93" stopColor="#76C692" />
          <stop offset="1" stopColor="#87CBA0" />
        </linearGradient>
      </defs>
      <path
        d="M6.41675 12H17.5167C16.2167 15.6 12.8167 18 9.01675 18C8.11675 18 7.21675 17.9 6.41675 17.6V12Z"
        className={getColor({
          darkMode,
          knockout,
          size,
          gradient: 'url(#lg-server-logo-lg-1)',
          flat: 'url(#lg-server-logo-lg-1)',
        })}
      />
      <path
        d="M17.9167 7.4H6.41675V0.4C7.21675 0.1 8.11675 0 9.01675 0C13.3167 0 17.1167 3.1 17.9167 7.4Z"
        className={getColor({
          darkMode,
          knockout,
          size,
          gradient: 'url(#lg-server-logo-lg-2)',
          flat: 'url(#lg-server-logo-lg-2)',
        })}
      />
      <path
        d="M18.0167 9.00005C18.0167 9.60005 17.9167 10.2 17.8167 10.7H5.8167C5.5167 10.7 5.2167 11 5.1167 11.3V17C0.616703 14.8 -1.2833 9.40005 0.916703 5.00005C1.8167 3.20005 3.3167 1.70005 5.1167 0.800049V8.00005C5.1167 8.40005 5.4167 8.60005 5.7167 8.60005H18.0167C18.0167 8.70005 18.0167 8.90005 18.0167 9.00005Z"
        className={getColor({
          darkMode,
          size,
          knockout,
          gradient: '#11A750',
          flat: '#11A750',
        })}
      />
    </svg>
  );
}

ServerLogoMark.displayName = 'AtlasLogoMark';

export default ServerLogoMark;
