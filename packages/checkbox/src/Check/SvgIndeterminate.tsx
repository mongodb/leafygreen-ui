import React from 'react';

import { palette } from '@leafygreen-ui/palette';

const SvgIndeterminate = (props: any) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="2"
        x2="8"
        y1="5"
        y2="5"
        strokeWidth="2"
        strokeLinecap="round"
        stroke={props.stroke ?? palette.white}
      />
    </svg>
  );
};

export default SvgIndeterminate;
