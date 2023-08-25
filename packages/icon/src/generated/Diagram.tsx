/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 733175f4eed74e2aa2cd758f21e0a377
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface DiagramProps extends LGGlyph.ComponentProps {}
const Diagram = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: DiagramProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Diagram', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M6 2.75C6 2.33579 6.33579 2 6.75 2H9.25C9.66421 2 10 2.33579 10 2.75V4.25C10 4.66421 9.66421 5 9.25 5H8.5V7H13.25C13.6642 7 14 7.33579 14 7.75V10H14.25C14.6642 10 15 10.3358 15 10.75V12.25C15 12.6642 14.6642 13 14.25 13H12.25C11.8358 13 11.5 12.6642 11.5 12.25V10.75C11.5 10.3358 11.8358 10 12.25 10H13V8H8.5V10H9C9.41421 10 9.75 10.3358 9.75 10.75V12.25C9.75 12.6642 9.41421 13 9 13H7C6.58579 13 6.25 12.6642 6.25 12.25V10.75C6.25 10.3358 6.58579 10 7 10H7.5V8H3V10H3.75C4.16421 10 4.5 10.3358 4.5 10.75V12.25C4.5 12.6642 4.16421 13 3.75 13H1.75C1.33579 13 1 12.6642 1 12.25V10.75C1 10.3358 1.33579 10 1.75 10H2V7.75C2 7.33579 2.33579 7 2.75 7H7.5V5H6.75C6.33579 5 6 4.66421 6 4.25V2.75Z" fill={'currentColor'} /></svg>;
};
Diagram.displayName = 'Diagram';
Diagram.isGlyph = true;
Diagram.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Diagram;