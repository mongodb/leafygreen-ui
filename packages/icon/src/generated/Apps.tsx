/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/prebuild.ts
* @checksum da931e2449f5c7dadff04e5eb0de1c64
*/
import * as React from "react";
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface AppsProps extends LGGlyph.ComponentProps {}
const Apps = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: AppsProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Apps', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M7 3H3V7H7V3ZM7 9H3V13H7V9ZM9 3H13V7H9V3ZM13 9H9V13H13V9Z" fill={'currentColor'} /></svg>;
};
Apps.displayName = 'Apps';
Apps.isGlyph = true;
export default Apps;