/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum ec3ece655f5978cced49ca88abe86a57
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface VerticalEllipsisProps extends LGGlyph.ComponentProps {}
const VerticalEllipsis = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: VerticalEllipsisProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'VerticalEllipsis', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M9.5 2.75C9.5 3.7165 8.7165 4.5 7.75 4.5C6.7835 4.5 6 3.7165 6 2.75C6 1.7835 6.7835 1 7.75 1C8.7165 1 9.5 1.7835 9.5 2.75ZM9.5 7.75C9.5 8.7165 8.7165 9.5 7.75 9.5C6.7835 9.5 6 8.7165 6 7.75C6 6.7835 6.7835 6 7.75 6C8.7165 6 9.5 6.7835 9.5 7.75ZM7.75 14.5C8.7165 14.5 9.5 13.7165 9.5 12.75C9.5 11.7835 8.7165 11 7.75 11C6.7835 11 6 11.7835 6 12.75C6 13.7165 6.7835 14.5 7.75 14.5Z" fill={'currentColor'} /></svg>;
};
VerticalEllipsis.displayName = 'VerticalEllipsis';
VerticalEllipsis.isGlyph = true;
VerticalEllipsis.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default VerticalEllipsis;