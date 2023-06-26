/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum c623c7aa2bfd7d1ee8d0a6496cc3354d
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface Diagram3Props extends LGGlyph.ComponentProps {}
const Diagram3 = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: Diagram3Props) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Diagram3', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M1.75 1C1.33579 1 1 1.33579 1 1.75V3.25C1 3.66421 1.33579 4 1.75 4H4.25C4.66421 4 5 3.66421 5 3.25V1.75C5 1.33579 4.66421 1 4.25 1H1.75ZM11 1.75C11 1.33579 11.3358 1 11.75 1H14.25C14.6642 1 15 1.33579 15 1.75V3.25C15 3.66421 14.6642 4 14.25 4H11.75C11.3358 4 11 3.66421 11 3.25V1.75ZM11 10.75C11 10.3358 11.3358 10 11.75 10H14.25C14.6642 10 15 10.3358 15 10.75V12.25C15 12.6642 14.6642 13 14.25 13H11.75C11.3358 13 11 12.6642 11 12.25V10.75ZM1 10.75C1 10.3358 1.33579 10 1.75 10H4.25C4.66421 10 5 10.3358 5 10.75V12.25C5 12.6642 4.66421 13 4.25 13H1.75C1.33579 13 1 12.6642 1 12.25V10.75ZM6 5C5.44772 5 5 5.44772 5 6V8C5 8.55228 5.44772 9 6 9H10C10.5523 9 11 8.55228 11 8V6C11 5.44772 10.5523 5 10 5H6Z" fill={'currentColor'} /></svg>;
};
Diagram3.displayName = 'Diagram3';
Diagram3.isGlyph = true;
Diagram3.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Diagram3;