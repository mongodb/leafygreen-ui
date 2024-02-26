/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 8076a865fbdb36bec3f4ddf1a1f136dd
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface RecommendedProps extends LGGlyph.ComponentProps {}
const Recommended = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: RecommendedProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Recommended', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M8.1484 5.45755L7.20359 7.42568V9.59086H9.3028C9.54317 9.59086 9.74953 9.41981 9.79412 9.18361L10.0172 8.0018C10.0754 7.69391 9.83924 7.40904 9.52592 7.40904H8.88758C8.55102 7.40904 8.27819 7.12413 8.27819 6.77267V5.70784C8.27819 5.60307 8.22655 5.51089 8.1484 5.45755Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M8.53812 1.55424C8.24353 1.2508 7.75646 1.2508 7.46187 1.55424L6.40002 2.648C6.24018 2.81264 6.01376 2.89505 5.78548 2.87167L4.269 2.71635C3.84829 2.67326 3.47517 2.98634 3.44455 3.40814L3.33418 4.92856C3.31756 5.15743 3.19709 5.3661 3.00719 5.49492L1.74565 6.35072C1.39567 6.58813 1.31109 7.06781 1.55877 7.41061L2.45152 8.64626C2.58591 8.83226 2.62775 9.06955 2.56508 9.2903L2.14879 10.7568C2.03329 11.1636 2.27683 11.5854 2.68691 11.6888L4.16506 12.0615C4.38757 12.1176 4.57214 12.2725 4.66603 12.4819L5.28976 13.8729C5.4628 14.2588 5.9205 14.4254 6.3011 14.241L7.67301 13.5764C7.87952 13.4763 8.12047 13.4763 8.32698 13.5764L9.69889 14.241C10.0795 14.4254 10.5372 14.2588 10.7102 13.8729L11.334 12.4819C11.4278 12.2725 11.6124 12.1176 11.8349 12.0615L13.3131 11.6888C13.7232 11.5854 13.9667 11.1636 13.8512 10.7568L13.4349 9.2903C13.3722 9.06955 13.4141 8.83226 13.5485 8.64626L14.4412 7.41061C14.6889 7.06781 14.6043 6.58813 14.2543 6.35072L12.9928 5.49492C12.8029 5.3661 12.6824 5.15743 12.6658 4.92856L12.5554 3.40814C12.5248 2.98634 12.1517 2.67326 11.731 2.71635L10.2145 2.87167C9.98623 2.89505 9.75981 2.81264 9.59997 2.648L8.53812 1.55424ZM7.47395 4.83394C7.57223 4.62921 7.77275 4.49995 7.99206 4.49995C8.63088 4.49995 9.14875 5.04074 9.14875 5.70784V6.49995H10.1291C10.6775 6.49995 11.0893 7.02303 10.9833 7.58488L10.5714 9.7667C10.4909 10.1928 10.1331 10.4999 9.71723 10.4999H5.43527C5.19488 10.4999 4.99999 10.2055 4.99999 9.95449V7.59086C4.99999 7.33982 5.19488 7.13631 5.43527 7.13631H6.33304C6.34637 7.13631 6.35957 7.13694 6.3726 7.13816C6.38115 7.11372 6.39105 7.08974 6.40227 7.06635L7.47395 4.83394Z" fill={'currentColor'} /></svg>;
};
Recommended.displayName = 'Recommended';
Recommended.isGlyph = true;
Recommended.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Recommended;