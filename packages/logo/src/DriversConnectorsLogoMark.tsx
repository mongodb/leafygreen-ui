import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { ProductLogoProps, getColor, getAccessibleProps } from './utils';

function DriversConnectorsLogoMark({
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
          id="drivers-connectors-lg-1"
          x1="7.11414"
          y1="18.4684"
          x2="0.484159"
          y2="3.78058"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#166149" />
          <stop offset="0.37" stopColor="#11A750" />
          <stop offset="0.65" stopColor="#48B75B" />
          <stop offset="0.93" stopColor="#76C692" />
          <stop offset="1" stopColor="#87CBA0" />
        </linearGradient>
        <linearGradient
          id="driver-connectors-lg-2"
          x1="1.95499"
          y1="7.57736"
          x2="9.67472"
          y2="-0.142362"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0D7DAF" />
          <stop offset="0.11" stopColor="#1183B0" />
          <stop offset="0.29" stopColor="#2292B6" />
          <stop offset="0.51" stopColor="#4DA9BB" />
          <stop offset="0.77" stopColor="#84CAC4" />
          <stop offset="1" stopColor="#BCE1CA" />
        </linearGradient>
        <linearGradient
          id="drivers-connectors-lg-3"
          x1="12.5859"
          y1="18.0932"
          x2="14.1941"
          y2="3.94967"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0D7DAF" />
          <stop offset="0.11" stopColor="#1183B0" />
          <stop offset="0.29" stopColor="#2292B6" />
          <stop offset="0.51" stopColor="#4DA9BB" />
          <stop offset="0.77" stopColor="#84CAC4" />
          <stop offset="1" stopColor="#BCE1CA" />
        </linearGradient>
      </defs>
      <path
        d="M6.9 11.1037C8.7 12.9037 9.6 15.5037 9.3 18.0037C4.3 18.2037 0.2 14.3037 0 9.3037C0 9.1037 0 8.9037 0 8.7037C2.6 8.4037 5.1 9.3037 6.9 11.1037Z"
        className={getColor({
          gradient: 'url(#drivers-connectors-lg-1)',
          flat: 'url(#drivers-connectors-lg-1)',
          knockout,
          size,
          darkMode,
        })}
      />
      <path
        d="M12.6 0.703748L9.29998 4.00375C8.99998 4.30375 8.99998 4.70375 9.29998 4.90375L10.7 6.40375L7.29998 9.80375C5.39998 8.00375 2.79998 7.20375 0.0999756 7.40375C0.499976 5.60375 1.29998 4.00375 2.59998 2.70375C5.19998 0.00374842 9.19998 -0.696252 12.6 0.703748Z"
        className={getColor({
          gradient: 'url(#driver-connectors-lg-2)',
          flat: 'url(#driver-connectors-lg-2)',
          knockout,
          size,
          darkMode,
        })}
      />
      <path
        d="M17.2 5.20374C19.3 9.70374 17.3 15.1037 12.8 17.1037C12.1 17.4037 11.4 17.7037 10.6 17.8037C10.8 15.2037 10 12.6037 8.30005 10.6037L11.7 7.20374L13 8.50374C13.2 8.70374 13.6 8.70374 13.9 8.50374L17.2 5.20374Z"
        className={getColor({
          gradient: 'url(#drivers-connectors-lg-3)',
          flat: 'url(#drivers-connectors-lg-3)',
          knockout,
          size,
          darkMode,
        })}
      />
      <path
        d="M15.4 2.60371C15.8 3.00371 16.2 3.50371 16.6 4.00371L13.5 7.10371L10.7 4.40371L13.8 1.30371C14.3 1.70371 14.9 2.10371 15.4 2.60371Z"
        className={getColor({
          gradient: '#047DAE',
          flat: '#047DAE',
          knockout,
          size,
          darkMode,
        })}
      />
    </svg>
  );
}

DriversConnectorsLogoMark.displayName = 'DriversConnectorsLogoMark';

export default DriversConnectorsLogoMark;
