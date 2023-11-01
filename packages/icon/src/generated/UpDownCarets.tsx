/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum a891b4efc92445086a5d6d0b39dd3957
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface UpDownCaretsProps extends LGGlyph.ComponentProps {}
const UpDownCarets = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: UpDownCaretsProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'UpDownCarets', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><g id="Glyphs-/-Up-Down-Carets" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><path d="M7.5273,1.2109 C7.7873,0.9299 8.2123,0.9299 8.4753,1.2109 L11.8023,4.7729 C12.2243,5.2249 11.9253,5.9999 11.3273,5.9999 L4.6733,5.9999 C4.0743,5.9999 3.7753,5.2249 4.1973,4.7729 L7.5273,1.2109 Z M11.3273,9.9999 C11.9253,9.9999 12.2243,10.7749 11.8023,11.2279 L8.4753,14.7889 C8.2123,15.0699 7.7873,15.0699 7.5273,14.7889 L4.1973,11.2279 C3.7753,10.7749 4.0743,9.9999 4.6733,9.9999 L11.3273,9.9999 Z" id="Fill-1" fill={'currentColor'} /></g></svg>;
};
UpDownCarets.displayName = 'UpDownCarets';
UpDownCarets.isGlyph = true;
UpDownCarets.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default UpDownCarets;