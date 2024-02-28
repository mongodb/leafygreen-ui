/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum af7e0fb62eeafd1be79c5280a224061f
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SearchIndexProps extends LGGlyph.ComponentProps {}
const SearchIndex = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SearchIndexProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'SearchIndex', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8.81572 12.7544C9.73678 13.6754 11.1421 13.8164 12.2116 13.1777L13.8338 14.7999C14.1006 15.0667 14.5331 15.0667 14.7999 14.7999C15.0667 14.5331 15.0667 14.1006 14.7999 13.8338L13.1777 12.2116C13.8164 11.1421 13.6754 9.73678 12.7544 8.81572C11.6667 7.72809 9.90335 7.72809 8.81572 8.81572C7.72809 9.90335 7.72809 11.6667 8.81572 12.7544ZM11.7883 9.78181C12.3424 10.3359 12.3424 11.2342 11.7883 11.7883C11.2342 12.3424 10.3359 12.3424 9.78181 11.7883C9.22773 11.2342 9.22773 10.3359 9.78181 9.78181C10.3359 9.22773 11.2342 9.22773 11.7883 9.78181Z" fill={'currentColor'} /><path d="M12 3.66667C12 3.75035 11.9994 3.83206 11.9983 3.91184C11.9994 3.94108 12 3.97047 12 4V4.21428C12 4.49502 11.8763 4.76461 11.6065 5.02898C11.3319 5.2981 10.9246 5.54074 10.4197 5.74366C9.41078 6.14907 8.10976 6.35714 7 6.35714C5.89024 6.35714 4.58922 6.14907 3.58034 5.74366C3.07537 5.54074 2.66813 5.2981 2.39348 5.02898C2.12368 4.76461 2 4.49502 2 4.21428V4C2 3.96691 2.00073 3.934 2.00217 3.90128C2.00073 3.82496 2 3.74677 2 3.66667C2 1.85714 4.53444 1 7 1C9.46556 1 12 1.85714 12 3.66667Z" fill={'currentColor'} /><path d="M2 5.81314V7.64286C2 7.92359 2.12368 8.19318 2.39348 8.45755C2.66813 8.72667 3.07537 8.96932 3.58034 9.17224C4.58922 9.57765 5.89024 9.78571 7 9.78571C7.04434 9.78571 7.08899 9.78538 7.13391 9.78472C7.3015 9.17079 7.6264 8.59083 8.10862 8.10862C9.16114 7.05609 10.6793 6.75302 12 7.1994V5.81314C11.6435 6.11014 11.1998 6.35041 10.7229 6.54204C9.59874 6.99378 8.19143 7.21428 7 7.21428C5.80857 7.21428 4.40126 6.99378 3.2771 6.54204C2.8002 6.35041 2.35654 6.11014 2 5.81314Z" fill={'currentColor'} /><path d="M7 10.6429H7.00266C6.97218 11.4587 7.20413 12.2826 7.69852 12.977C7.46653 12.9923 7.23296 13 7 13C4.53444 13 2 12.1429 2 10.3333C2 10.2503 2.00057 10.1683 2.00171 10.0875C2.00057 10.0585 2 10.0293 2 10V9.24171C2.35654 9.53872 2.8002 9.77898 3.2771 9.97062C4.40126 10.4223 5.80857 10.6429 7 10.6429Z" fill={'currentColor'} /></svg>;
};
SearchIndex.displayName = 'SearchIndex';
SearchIndex.isGlyph = true;
SearchIndex.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default SearchIndex;