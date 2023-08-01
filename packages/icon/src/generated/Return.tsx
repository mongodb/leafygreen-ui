/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 088ef2cc9a4519b2bddcd4a7af33d5e1
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ReturnProps extends LGGlyph.ComponentProps {}
const Return = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ReturnProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Return', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><g id="Return"><path id="Union" d="M5 2C4.44772 2 4 2.44772 4 3C4 3.55228 4.44772 4 5 4H10C11.3807 4 12.5 5.11929 12.5 6.5C12.5 7.88071 11.3807 9 10 9H5.20328L6.65079 7.75927C7.07012 7.39985 7.11868 6.76855 6.75926 6.34923C6.39983 5.9299 5.76853 5.88134 5.34921 6.24076L1.84921 9.24076C1.62756 9.43074 1.5 9.70809 1.5 10C1.5 10.2919 1.62756 10.5693 1.84921 10.7593L5.34921 13.7593C5.76853 14.1187 6.39983 14.0701 6.75926 13.6508C7.11868 13.2315 7.07012 12.6002 6.65079 12.2408L5.20324 11H10C12.4853 11 14.5 8.98528 14.5 6.5C14.5 4.01472 12.4853 2 10 2H5Z" fill={'currentColor'} /></g></svg>;
};
Return.displayName = 'Return';
Return.isGlyph = true;
Return.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Return;