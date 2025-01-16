/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/prebuild.ts
* @checksum b2502575644d942c6f37bcf6c1f164cd
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface NoteProps extends LGGlyph.ComponentProps {}
const Note = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: NoteProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Note', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M4.5 6.25C4.5 5.83579 4.83579 5.5 5.25 5.5H8.75C9.16421 5.5 9.5 5.83579 9.5 6.25C9.5 6.66421 9.16421 7 8.75 7H5.25C4.83579 7 4.5 6.66421 4.5 6.25Z" fill={'currentColor'} /><path d="M4.5 8.75C4.5 8.33579 4.83579 8 5.25 8H6.75C7.16421 8 7.5 8.33579 7.5 8.75C7.5 9.16421 7.16421 9.5 6.75 9.5H5.25C4.83579 9.5 4.5 9.16421 4.5 8.75Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M15 10L11 14H3C1.89543 14 1 13.1046 1 12V4C1 2.89543 1.89543 2 3 2H13C14.1046 2 15 2.89543 15 4V10ZM13 4H3L3 12H10V10C10 9.44772 10.4477 9 11 9H13V4Z" fill={'currentColor'} /></svg>;
};
Note.displayName = 'Note';
Note.isGlyph = true;
export default Note;