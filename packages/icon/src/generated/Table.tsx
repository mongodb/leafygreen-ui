/**
* This is a generated file. Do not modify it manually.
*
* @script packages/icon/scripts/prebuild/index.ts
* @checksum 0160de820c7c58f776c5047aa35a1d21
*/
import * as React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';

export interface TableProps extends LGGlyph.ComponentProps {}

const Table = ({
  className,
  size = 16,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: TableProps) => {
  const fillStyle = css`
    color: ${fill};
  `;

  const noFlexShrink = css`
    flex-shrink: 0;
  `;

  const accessibleProps = generateAccessibleProps(role, 'Table', { 
    title, 
    'aria-label': ariaLabel, 
    'aria-labelledby': ariaLabelledby 
  });

  const svgElement = <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path fillRule="evenodd" clipRule="evenodd" d="M1 3.25C1 2.55964 1.55964 2 2.25 2H13.75C14.4404 2 15 2.55964 15 3.25V12.75C15 13.4404 14.4404 14 13.75 14H2.25C1.55964 14 1 13.4404 1 12.75V3.25ZM3 7.37V4H7.37V7.37H3ZM3 8.62V12H7.37V8.62H3ZM8.62 12H13V8.62H8.62V12ZM13 7.37V4H8.62V7.37H13Z" fill="currentColor" /></svg>;

  return React.cloneElement(svgElement, {
    className: cx(
      {
        [fillStyle]: fill != null,
      },
      noFlexShrink,
      className,
    ),
    height: typeof size === 'number' ? size : sizeMap[size],
    width: typeof size === 'number' ? size : sizeMap[size],
    role,
    ...accessibleProps,
    ...props,
  });
};

Table.displayName = 'Table';
Table.isGlyph = true;

export default Table;