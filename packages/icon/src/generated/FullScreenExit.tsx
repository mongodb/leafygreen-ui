/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 537736c152784914ddde9f3d227597aa
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface FullScreenExitProps extends LGGlyph.ComponentProps {}
const FullScreenExit = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: FullScreenExitProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'FullScreenExit', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M10.5 7C10.2239 7 10 6.77614 10 6.5V2.5C10 2.22386 10.2239 2 10.5 2H11.5C11.7761 2 12 2.22386 12 2.5V4.5C12 4.77614 12.2239 5 12.5 5L14.5 5C14.7761 5 15 5.22386 15 5.5V6.5C15 6.77614 14.7761 7 14.5 7H10.5Z" fill={'currentColor'} /><path d="M6 9.5C6 9.22386 5.77614 9 5.5 9H1.5C1.22386 9 1 9.22386 1 9.5V10.5C1 10.7761 1.22386 11 1.5 11H3.5C3.77614 11 4 11.2239 4 11.5L4 13.5C4 13.7761 4.22386 14 4.5 14H5.5C5.77614 14 6 13.7761 6 13.5V9.5Z" fill={'currentColor'} /><path d="M10.5 9C10.2239 9 10 9.22386 10 9.5V13.5C10 13.7761 10.2239 14 10.5 14H11.5C11.7761 14 12 13.7761 12 13.5V11.5C12 11.2239 12.2239 11 12.5 11H14.5C14.7761 11 15 10.7761 15 10.5V9.5C15 9.22386 14.7761 9 14.5 9H10.5Z" fill={'currentColor'} /><path d="M5.5 7C5.77614 7 6 6.77614 6 6.5L6 2.5C6 2.22386 5.77614 2 5.5 2H4.5C4.22386 2 4 2.22386 4 2.5L4 4.5C4 4.77614 3.77614 5 3.5 5L1.5 5C1.22386 5 1 5.22386 1 5.5V6.5C1 6.77614 1.22386 7 1.5 7L5.5 7Z" fill={'currentColor'} /></svg>;
};
FullScreenExit.displayName = 'FullScreenExit';
FullScreenExit.isGlyph = true;
FullScreenExit.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default FullScreenExit;