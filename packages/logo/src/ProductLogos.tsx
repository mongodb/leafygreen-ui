import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';

type ProductLogoProps = HTMLElementProps<'svg'> & {
  knockout?: boolean;
  size?: number;
};

export function CloudManagerLogo({
  size = 18,
  knockout = false,
  className,
  ...rest
}: ProductLogoProps) {
  return (
    <svg
      {...rest}
      width={`${size}px`}
      height={`${size}px`}
      viewBox={`0 0 18 18`}
      className={cx(
        css`
          flex-shrink: 0;
        `,
        className,
      )}
    >
      <title>Cloud Manager Logo</title>
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
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#00804b'
              : 'url(#cloud-manager-linear-gradient)'
            : 'currentColor'};
        `}
        d="M5.74,17.39h.73a2.38,2.38,0,0,0,0-4.75H.77A9,9,0,0,0,5.74,17.39Z"
      />
      <path
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#03aa4f'
              : 'url(#cloud-manager-linear-gradient-2)'
            : 'currentColor'};
        `}
        d="M2.84,9a3.6,3.6,0,0,1,.9-2.38H.32a9,9,0,0,0,0,4.76H3.73A3.64,3.64,0,0,1,2.84,9Z"
      />
      <path
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#00804b'
              : 'url(#cloud-manager-linear-gradient-3)'
            : 'currentColor'};
        `}
        d="M10.1,15a3.63,3.63,0,0,1-1.55,3H9a9,9,0,0,0,8.23-5.36h-8A3.58,3.58,0,0,1,10.1,15Z"
      />
      <path
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#007dab'
              : '#007dab'
            : 'currentColor'};
        `}
        d="M9,0A9,9,0,0,0,.77,5.36H17.23A9,9,0,0,0,9,0Z"
      />
      <path
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#03aa4f'
              : 'url(#cloud-manager-linear-gradient-4)'
            : 'currentColor'};
        `}
        d="M4.1,9a2.39,2.39,0,0,0,2.38,2.38h11.2a9,9,0,0,0,0-4.76H6.48A2.39,2.39,0,0,0,4.1,9Z"
      />
    </svg>
  );
}

export function AtlasLogo({
  size = 18,
  knockout = false,
  className,
  ...rest
}: ProductLogoProps) {
  return (
    <svg
      {...rest}
      x="0px"
      y="0px"
      viewBox="0 0 18 18"
      width={`${size}px`}
      height={`${size}px`}
      className={cx(
        css`
          flex-shrink: 0;
        `,
        className,
      )}
    >
      <title>Atlas Logo</title>
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
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#03aa4f'
              : 'url(#atlas-path-0001)'
            : 'currentColor'};
        `}
        d="M12,11c2-1.4,4.2-1.7,6-1.7c0-0.1,0-0.3,0-0.4c0-1.7-0.5-3.3-1.3-4.7c-1.3,0.1-2.6,0.5-4,1.4
		C11,6.8,10.1,8.4,9.6,9.5v3.8C10.2,12.6,11,11.7,12,11z"
      />

      <path
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#03aa4f'
              : 'url(#atlas-path-0002)'
            : 'currentColor'};
        `}
        d="M6,11c1,0.7,1.8,1.5,2.4,2.3V9.5C7.9,8.4,7,6.8,5.3,5.7C4,4.8,2.6,4.4,1.3,4.3
		C0.5,5.6,0,7.2,0,8.9c0,0.1,0,0.3,0,0.4C1.8,9.3,4,9.6,6,11z"
      />

      <path
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#00804b'
              : 'url(#atlas-path-0003)'
            : 'currentColor'};
        `}
        d="M12.7,12.1c-1.7,1.1-2.6,2.7-3.1,3.8V18c4.1-0.3,7.5-3.4,8.2-7.3C16.3,10.6,14.4,10.9,12.7,12.1z
		"
      />

      <path
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#00804b'
              : 'url(#atlas-path-4)'
            : 'currentColor'};
        `}
        d="M8.4,15.9c-0.5-1.1-1.4-2.7-3.1-3.8c-1.7-1.2-3.6-1.5-5.1-1.4c0.8,4,4.1,7,8.2,7.3V15.9z"
      />
      <path
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#80dba5'
              : '#00804b'
            : 'currentColor'};
        `}
        d="M6,4.7C7,5.4,7.8,6.2,8.4,7V0C5.9,0.2,3.7,1.3,2.2,3.2C3.4,3.3,4.8,3.8,6,4.7z"
      />
      <path
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#80dba5'
              : '#00804b'
            : 'currentColor'};
        `}
        d="M15.8,3.2c-1.5-1.8-3.7-3-6.2-3.1v7C10.2,6.2,11,5.4,12,4.7C13.2,3.8,14.6,3.3,15.8,3.2z"
      />
    </svg>
  );
}

export function RealmLogo({
  knockout = false,
  size = 18,
  ...rest
}: ProductLogoProps) {
  return (
    <svg
      {...rest}
      x="0px"
      y="0px"
      viewBox="0 0 18 18"
      width={`${size}px`}
      height={`${size}px`}
    >
      <title>Realm Logo</title>
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
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#EF8C9B'
              : 'url(#realm-path-0001)'
            : 'currentColor'};
        `}
        d="M7.8,11.1l0.8,0.3c1.7,0.7,3.5,1.1,5.3,1c1.3-0.1,2.6-0.5,3.8-1.1C17.9,10.6,18,9.8,18,9V8.7
			C14.4,7.8,10.6,8.7,7.8,11.1z"
      />

      <path
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? 'B2458D'
              : 'url(#realm-path-0002)'
            : 'currentColor'};
        `}
        d="M17,13c-1,0.4-2,0.6-3.1,0.7c-2,0.1-4-0.3-5.8-1.1c-1.8-0.8-3.8-1.1-5.8-0.9c-0.6,0.1-1.2,0.3-1.7,0.5
			c1.8,4.6,7,6.9,11.6,5.1C14.3,16.6,16,15,17,13z"
      />
      <path
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#6E60F7'
              : '#6e60f2'
            : 'currentColor'};
        `}
        d="M4.4,5.3c2.4,0,4.6,1,6.3,2.6c2.3-0.9,4.7-1.1,7.1-0.6c-0.9-4.9-5.6-8.1-10.5-7.2c-3.3,0.6-5.9,3-6.9,6.1
			C1.7,5.7,3,5.3,4.4,5.3z"
      />

      <path
        className={css`
          fill: ${!knockout
            ? size <= 10
              ? '#F9D2C3'
              : 'url(#realm-path-0003)'
            : 'currentColor'};
        `}
        d="M0.1,7.9C0,8.3,0,8.6,0,9c0,0.7,0.1,1.3,0.2,2c0.6-0.3,1.2-0.4,1.9-0.6c1.4-0.3,2.9-0.2,4.3,0.2
			c0.9-0.9,1.9-1.6,3-2.1c-1.4-1.2-3.2-1.9-5-1.9C2.9,6.6,1.4,7.1,0.1,7.9z"
      />
    </svg>
  );
}

export function ChartsLogo({
  knockout = false,
  size = 18,
  ...rest
}: ProductLogoProps) {
  return (
    <svg
      {...rest}
      x="0px"
      y="0px"
      viewBox="0 0 18 18"
      width={`${size}px`}
      height={`${size}px`}
    >
      <title>Charts Logo</title>
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
        className={css`
          fill: ${!knockout ? 'url(#charts-logo-gradient)' : 'currentColor'};
        `}
        d="M9.7495308,9.9141502c-0.226757-0.0123043-0.437871-0.1191797-0.5820112-0.2946091L6.2850585,6.111299
		l-5.7055078,6.0680566c0.161543,0.4275875,0.3550781,0.83918,0.577002,1.2328854
		c3.2708936-0.0032082,8.2101269,0.0024614,15.6741505,0.022193C17.5736427,12.1252584,18,10.6128807,18,9
		c0-1.9307814-0.6100483-3.7180371-1.6450481-5.1837893l-5.9951077,5.8679295
		C10.197773,9.8429594,9.9750586,9.9268064,9.7495308,9.9141502z"
      />
      <path
        className={css`
          fill: ${!knockout ? '#2F9FC5' : 'currentColor'};
        `}
        d="M5.735918,4.3303709C5.8953514,4.1607423,6.1177149,4.0687208,6.353086,4.075664
		c0.2327342,0.0078225,0.4508786,0.1154003,0.598711,0.2953124l2.9063668,3.537334l5.4454393-5.3298192
		C13.6798239,0.984375,11.4553127,0,9,0C4.0294337,0,0,4.0294337,0,9c0,0.4507914,0.0341016,0.8934965,0.0980859,1.3264456
		L5.735918,4.3303709z"
      />
      <path
        className={css`
          fill: ${!knockout ? '#1A567E' : 'currentColor'};
        `}
        d="M2.3222461,15.0332079C3.9692285,16.8549614,6.3507128,18,9,18
		c2.640234,0,5.014863-1.1368656,6.6612301-2.9478073C11.025176,15.0413818,6.1676807,15.0334721,2.3222461,15.0332079z"
      />
    </svg>
  );
}
