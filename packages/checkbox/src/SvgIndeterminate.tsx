import { palette } from '@leafygreen-ui/palette';
import React from 'react';

const SvgIndeterminate = (props: any) => {
  return (
    <svg
      width="8"
      height="2"
      viewBox="0 0 8 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="1"
        x2="7"
        y1="1"
        y2="1"
        strokeWidth="2"
        strokeLinecap="round"
        stroke={props.stroke ?? palette.white}
      />
    </svg>
  );
};

export default SvgIndeterminate;
