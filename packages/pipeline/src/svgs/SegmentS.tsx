import * as React from 'react';
import { svgInnerOutlineClassName, svgOuterOutlineClassName } from '../';

const SegmentS = ({ className }: { className: string }) => {
  return (
    <svg
      width="48"
      height="36"
      viewBox="0 0 48 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMaxYMid slice"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46.8433 22.0398L42.3225 31.0398C40.795 34.0806 37.6831 36 34.2801 36H5.00637C1.29907 36 -1.1189 32.1069 0.524438 28.7837L5.63781 18.4434C5.77596 18.1638 5.77596 17.8362 5.63781 17.5566L0.524438 7.21631C-1.1189 3.89307 1.29907 0 5.00637 0H34.2801C37.6831 0 40.795 1.91943 42.3225 4.96021L46.8433 13.9602C48.1201 16.502 48.1201 19.498 46.8433 22.0398ZM43.2689 15.7556L38.7481 6.75562C37.8995 5.06641 36.1706 4 34.2801 4H5.00637C4.26492 4 3.7813 4.77856 4.10998 5.44336L9.22335 15.7837C9.91409 17.1804 9.91409 18.8196 9.22335 20.2163L4.10998 30.5566C3.7813 31.2214 4.26492 32 5.00637 32H34.2801C36.1706 32 37.8995 30.9336 38.7481 29.2444L43.2689 20.2444C43.9783 18.8323 43.9783 17.1677 43.2689 15.7556Z"
        fill="#0498EC"
        className={svgOuterOutlineClassName}
      />
      <path
        d="M4.10489 5.44327C3.77622 4.77863 4.25982 4 5.00127 4H34.275C36.1655 4 37.8944 5.06629 38.743 6.75567L43.2638 15.7557C43.9732 17.1678 43.9732 18.8322 43.2638 20.2443L38.743 29.2443C37.8944 30.9337 36.1655 32 34.275 32H5.00127C4.25982 32 3.77622 31.2214 4.10489 30.5567L9.21826 20.2163C9.90901 18.8195 9.90901 17.1805 9.21826 15.7837L4.10489 5.44327Z"
        fill="#C3E7FE"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.31466 6.32981C1.32866 4.3359 2.77945 2 5.00382 2H34.2776C36.9243 2 39.3447 3.49281 40.5327 5.85793L45.0536 14.8579C46.0466 16.8349 46.0466 19.1651 45.0536 21.1421L40.5327 30.1421C39.3447 32.5072 36.9243 34 34.2776 34H5.00382C2.77945 34 1.32866 31.6641 2.31466 29.6702L7.42804 19.3298C7.84248 18.4917 7.84248 17.5083 7.42804 16.6702L2.31466 6.32981ZM5.00382 4C4.26237 4 3.77877 4.77863 4.10744 5.44327L9.22081 15.7837C9.91156 17.1805 9.91156 18.8195 9.22081 20.2163L4.10744 30.5567C3.77877 31.2214 4.26237 32 5.00382 32H34.2776C36.1681 32 37.897 30.9337 38.7455 29.2443L43.2664 20.2443C43.9757 18.8322 43.9757 17.1678 43.2664 15.7557L38.7456 6.75567C37.897 5.06629 36.1681 4 34.2776 4H5.00382Z"
        fill="white"
        className={svgInnerOutlineClassName}
      />
    </svg>
  );
};

export default SegmentS;
