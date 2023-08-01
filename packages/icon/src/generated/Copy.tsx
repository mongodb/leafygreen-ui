/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 4b68057222fad9e1bee74a4f80b09907
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CopyProps extends LGGlyph.ComponentProps {}
const Copy = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CopyProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Copy', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M1 5.71428V10.2857C1 11.2325 1.76751 12 2.71429 12H5.75V7.10957C5.75 6.54414 5.97724 6.00244 6.38065 5.60623L8.67403 3.35381C8.77447 3.25516 8.88376 3.16757 9 3.09182V2.71429C9 1.76751 8.23249 1 7.28571 1H5.8V4.42857C5.8 5.13865 5.22437 5.71428 4.51429 5.71428H1ZM9 4.78571L7.25654 6.49804C7.24689 6.50752 7.23749 6.5172 7.22834 6.52708C7.22208 6.53383 7.21594 6.54068 7.20991 6.54762C7.07504 6.70295 7 6.90234 7 7.10957V7.79762H9H10.0095C10.4829 7.79762 10.8667 7.41386 10.8667 6.94047V4H10.1505C9.92587 4 9.7102 4.0882 9.54992 4.24562L9 4.78571ZM4.86667 1H4.15053C3.92587 1 3.7102 1.0882 3.54992 1.24562L1.25654 3.49804C1.09244 3.65921 1 3.87957 1 4.10957V4.79762H4.00952C4.48291 4.79762 4.86667 4.41386 4.86667 3.94047V1ZM7 12V8.71428H9H10.5143C11.2244 8.71428 11.8 8.13865 11.8 7.42857V4H13.2857C14.2325 4 15 4.76751 15 5.71429V13.2857C15 14.2325 14.2325 15 13.2857 15H8.71429C7.76751 15 7 14.2325 7 13.2857V12Z" fill={'currentColor'} /></svg>;
};
Copy.displayName = 'Copy';
Copy.isGlyph = true;
Copy.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Copy;