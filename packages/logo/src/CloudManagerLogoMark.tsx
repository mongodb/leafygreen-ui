import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { ProductLogoProps, getColor, getAccessibleProps } from './utils';

function CloudManagerLogoMark({
  size = 18,
  knockout = false,
  darkMode = false,
  role = 'img',
  'aria-label': ariaLabel = 'Cloud Manager LogoMark',
  className,
  ...rest
}: ProductLogoProps) {
  return (
    <svg
      {...rest}
      {...getAccessibleProps({ role, ['aria-label']: ariaLabel })}
      width={size}
      height={size}
      viewBox="0 0 18 18"
      className={cx(
        css`
          flex-shrink: 0;
        `,
        className,
      )}
    >
      <defs>
        <linearGradient
          id="cloud-manager-linear-gradient"
          x1="0.96"
          y1="15.06"
          x2="15.02"
          y2="14.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0d6149" />
          <stop offset="0.37" stopColor="#04a74f" />
          <stop offset="0.65" stopColor="#00cd57" />
          <stop offset="0.92" stopColor="#5fd590" />
          <stop offset="1" stopColor="#7ed8a2" />
        </linearGradient>
        <linearGradient
          id="cloud-manager-linear-gradient-2"
          x1="-2.54"
          y1="9"
          x2="13.27"
          y2="9"
          xlinkHref="#cloud-manager-linear-gradient"
        />
        <linearGradient
          id="cloud-manager-linear-gradient-3"
          x1="21.41"
          y1="15.32"
          x2="1.11"
          y2="15.32"
          xlinkHref="#cloud-manager-linear-gradient"
        />
        <linearGradient
          id="cloud-manager-linear-gradient-4"
          x1="19.24"
          y1="9"
          x2="-3.78"
          y2="9"
          xlinkHref="#cloud-manager-linear-gradient"
        />
      </defs>
      <path
        className={getColor({
          knockout,
          size,
          darkMode,
          flat: '#00804b',
          gradient: 'url(#cloud-manager-linear-gradient)',
        })}
        d="M5.74,17.39h.73a2.38,2.38,0,0,0,0-4.75H.77A9,9,0,0,0,5.74,17.39Z"
      />
      <path
        className={getColor({
          knockout,
          size,
          darkMode,
          flat: '#03aa4f',
          gradient: 'url(#cloud-manager-linear-gradient-2)',
        })}
        d="M2.84,9a3.6,3.6,0,0,1,.9-2.38H.32a9,9,0,0,0,0,4.76H3.73A3.64,3.64,0,0,1,2.84,9Z"
      />
      <path
        className={getColor({
          knockout,
          size,
          darkMode,
          flat: '#00804b',
          gradient: 'url(#cloud-manager-linear-gradient-3)',
        })}
        d="M10.1,15a3.63,3.63,0,0,1-1.55,3H9a9,9,0,0,0,8.23-5.36h-8A3.58,3.58,0,0,1,10.1,15Z"
      />
      <path
        className={getColor({
          knockout,
          size,
          darkMode,
          flat: '#007dab',
          gradient: '#007dab',
        })}
        d="M9,0A9,9,0,0,0,.77,5.36H17.23A9,9,0,0,0,9,0Z"
      />
      <path
        className={getColor({
          knockout,
          size,
          darkMode,
          flat: '#03aa4f',
          gradient: 'url(#cloud-manager-linear-gradient-3)',
        })}
        d="M4.1,9a2.39,2.39,0,0,0,2.38,2.38h11.2a9,9,0,0,0,0-4.76H6.48A2.39,2.39,0,0,0,4.1,9Z"
      />
    </svg>
  );
}

CloudManagerLogoMark.displayName = 'CloudManagerLogoMark';

export default CloudManagerLogoMark;
