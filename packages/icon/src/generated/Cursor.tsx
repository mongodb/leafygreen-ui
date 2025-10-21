/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 3fedcd4b74e1a26cd1508de5c95f65d5
*/
import * as React from "react";
import { useId } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, getGlyphLabel, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CursorProps extends LGGlyph.ComponentProps {}
const Cursor = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CursorProps) => {
  const titleId = useId();
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const safeTitle = title || getGlyphLabel('Cursor');
  const accessibleProps = generateAccessibleProps(role, 'Cursor', {
    title,
    titleId,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><title id={titleId}>{safeTitle}</title><path fillRule="evenodd" clipRule="evenodd" d="M8.53436 8.53438L9.00697 8.26403L11.3957 6.89757L4.64845 4.64847L6.89754 11.3958L8.26401 9.00699L8.53436 8.53438ZM10 10.0001L14.4801 7.4373C15.2139 7.10378 15.1582 6.04354 14.3936 5.78866L3.16879 2.04707C2.47551 1.81597 1.81595 2.47553 2.04704 3.16881L5.78864 14.3936C6.04352 15.1582 7.10375 15.2139 7.43728 14.4801L10 10.0001Z" fill={'currentColor'} /></svg>;
};
Cursor.displayName = 'Cursor';
Cursor.isGlyph = true;
export default Cursor;