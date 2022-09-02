import * as React from 'react';

function SvgNotch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={26}
      height={8}
      fill="#001E2B"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 8"
      {...props}
    >
      <path d="M27 0H-1v1h.699a10 10 0 017.26 3.123l1.685 1.78a6 6 0 008.712 0l1.686-1.78A10 10 0 0126.302 1H27V0z" />
    </svg>
  );
}

export default SvgNotch;
