/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 9b504a9d04e38cd8adab286023bd14b6
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface EllipsisProps extends LGGlyph.ComponentProps {}
const Ellipsis = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: EllipsisProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Ellipsis', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2.75 6C3.7165 6 4.5 6.7835 4.5 7.75C4.5 8.7165 3.7165 9.5 2.75 9.5C1.7835 9.5 1 8.7165 1 7.75C1 6.7835 1.7835 6 2.75 6ZM7.75 6C8.7165 6 9.5 6.7835 9.5 7.75C9.5 8.7165 8.7165 9.5 7.75 9.5C6.7835 9.5 6 8.7165 6 7.75C6 6.7835 6.7835 6 7.75 6ZM14.5 7.75C14.5 6.7835 13.7165 6 12.75 6C11.7835 6 11 6.7835 11 7.75C11 8.7165 11.7835 9.5 12.75 9.5C13.7165 9.5 14.5 8.7165 14.5 7.75Z" fill={'currentColor'} /></svg>;
};
Ellipsis.displayName = 'Ellipsis';
Ellipsis.isGlyph = true;
Ellipsis.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Ellipsis;