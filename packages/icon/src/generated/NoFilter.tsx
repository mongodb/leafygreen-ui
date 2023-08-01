/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 419f1458999a56a8ec9fd70c0bc44af3
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface NoFilterProps extends LGGlyph.ComponentProps {}
const NoFilter = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: NoFilterProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'NoFilter', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M2.60553 1.2041C2.21353 0.905115 1.65113 0.934737 1.29289 1.29297C0.902369 1.68349 0.902369 2.31666 1.29289 2.70718L7 8.41429V14.3981C7 14.8277 7.50596 15.0573 7.82925 14.7744L10.779 12.1933L13.2908 14.7051C13.6813 15.0956 14.3145 15.0956 14.705 14.7051C15.0955 14.3146 15.0955 13.6814 14.705 13.2909L12.8869 11.4728L12.8806 11.4791L2.60553 1.2041Z" fill={'currentColor'} /><path d="M10.5732 7.14947C10.7307 7.30696 11 7.19542 11 6.9727V6.14834L14.8005 2.20776C15.2025 1.79085 14.9563 1 14.4244 1H5.0273C4.80458 1 4.69304 1.26929 4.85053 1.42678L10.5732 7.14947Z" fill={'currentColor'} /></svg>;
};
NoFilter.displayName = 'NoFilter';
NoFilter.isGlyph = true;
NoFilter.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default NoFilter;