/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/prebuild.ts
* @checksum b34ae103ea50c39c0c94fb8532bcba6d
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ListProps extends LGGlyph.ComponentProps {}
const List = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ListProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'List', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M3.125 2.75C2.43464 2.75 1.875 3.30964 1.875 4C1.875 4.69036 2.43464 5.25 3.125 5.25C3.81536 5.25 4.375 4.69036 4.375 4C4.375 3.30964 3.81536 2.75 3.125 2.75Z" fill={'currentColor'} /><path d="M3.125 6.75C2.43464 6.75 1.875 7.30964 1.875 8C1.875 8.69036 2.43464 9.25 3.125 9.25C3.81536 9.25 4.375 8.69036 4.375 8C4.375 7.30964 3.81536 6.75 3.125 6.75Z" fill={'currentColor'} /><path d="M1.875 12C1.875 11.3096 2.43464 10.75 3.125 10.75C3.81536 10.75 4.375 11.3096 4.375 12C4.375 12.6904 3.81536 13.25 3.125 13.25C2.43464 13.25 1.875 12.6904 1.875 12Z" fill={'currentColor'} /><path d="M6.625 3C6.07272 3 5.625 3.44772 5.625 4C5.625 4.55228 6.07272 5 6.625 5H13.125C13.6773 5 14.125 4.55228 14.125 4C14.125 3.44772 13.6773 3 13.125 3H6.625Z" fill={'currentColor'} /><path d="M5.625 8C5.625 7.44772 6.07272 7 6.625 7H13.125C13.6773 7 14.125 7.44772 14.125 8C14.125 8.55228 13.6773 9 13.125 9H6.625C6.07272 9 5.625 8.55228 5.625 8Z" fill={'currentColor'} /><path d="M6.625 11C6.07272 11 5.625 11.4477 5.625 12C5.625 12.5523 6.07272 13 6.625 13H13.125C13.6773 13 14.125 12.5523 14.125 12C14.125 11.4477 13.6773 11 13.125 11H6.625Z" fill={'currentColor'} /></svg>;
};
List.displayName = 'List';
List.isGlyph = true;
export default List;