/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 1526003ef4d9aa0d0b75b6f1a902aa04
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface HorizontalDragProps extends LGGlyph.ComponentProps {}
const HorizontalDrag = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: HorizontalDragProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'HorizontalDrag', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M4 9C4.55228 9 5 9.44772 5 10C5 10.5523 4.55228 11 4 11C3.44772 11 3 10.5523 3 10C3 9.44772 3.44772 9 4 9Z" fill={'currentColor'} /><path d="M4 5C4.55228 5 5 5.4477 5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.4477 3.44772 5 4 5Z" fill={'currentColor'} /><path d="M8 9C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9Z" fill={'currentColor'} /><path d="M12 9C12.5523 9 13 9.44772 13 10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10C11 9.44772 11.4477 9 12 9Z" fill={'currentColor'} /><path d="M8 5C8.55228 5 9 5.4477 9 6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6C7 5.4477 7.44772 5 8 5Z" fill={'currentColor'} /><path d="M12 5C12.5523 5 13 5.4477 13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.4477 11.4477 5 12 5Z" fill={'currentColor'} /></svg>;
};
HorizontalDrag.displayName = 'HorizontalDrag';
HorizontalDrag.isGlyph = true;
HorizontalDrag.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default HorizontalDrag;