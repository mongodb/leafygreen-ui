/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum cf81808fbfb036f9eb03f921219cfc8b
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface FilterProps extends LGGlyph.ComponentProps {}
const Filter = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: FilterProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Filter', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M6 6.14834L2.19955 2.20776C1.79746 1.79085 2.04373 1 2.57564 1H13.4244C13.9563 1 14.2025 1.79085 13.8005 2.20776L10 6.14834V11.7731C10 11.9173 9.93776 12.0545 9.82925 12.1494L6.82925 14.7744C6.50596 15.0573 6 14.8277 6 14.3981V6.14834Z" fill={'currentColor'} /></svg>;
};
Filter.displayName = 'Filter';
Filter.isGlyph = true;
Filter.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Filter;