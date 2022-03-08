import React from 'react';

function SvgCheck(props: any) {
  return (
    <svg
      width={9}
      height={7}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        d="M1 3.5l2.121 2.121L7.364 1.38"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgCheck;
