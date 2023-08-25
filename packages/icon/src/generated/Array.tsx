/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 302cbbf56d0c7b179f5273015cb6bdf0
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ArrayProps extends LGGlyph.ComponentProps {}
const Array = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ArrayProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Array', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M2.5 1C2.22386 1 2 1.22386 2 1.5V14.5C2 14.7761 2.22386 15 2.5 15H6.5C6.77614 15 7 14.7761 7 14.5V13.5C7 13.2239 6.77614 13 6.5 13H4V3H6.5C6.77614 3 7 2.77614 7 2.5V1.5C7 1.22386 6.77614 1 6.5 1H2.5Z" fill={'currentColor'} /><path d="M13.5 1C13.7761 1 14 1.22386 14 1.5V14.5C14 14.7761 13.7761 15 13.5 15H9.5C9.22386 15 9 14.7761 9 14.5V13.5C9 13.2239 9.22386 13 9.5 13H12V3H9.5C9.22386 3 9 2.77614 9 2.5V1.5C9 1.22386 9.22386 1 9.5 1H13.5Z" fill={'currentColor'} /></svg>;
};
Array.displayName = 'Array';
Array.isGlyph = true;
Array.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Array;