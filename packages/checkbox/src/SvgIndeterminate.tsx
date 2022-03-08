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
      <rect width="8" height="2" rx="1" fill="white" />
    </svg>
  );
};

export default SvgIndeterminate;
