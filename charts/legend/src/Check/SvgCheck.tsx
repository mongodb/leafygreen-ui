import React from 'react';

import { palette } from '@leafygreen-ui/palette';

const SvgCheck = (props: any) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 5.5L4.12132 7.62132L8.36396 3.37868"
        stroke={props.stroke ?? palette.white}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgCheck;
