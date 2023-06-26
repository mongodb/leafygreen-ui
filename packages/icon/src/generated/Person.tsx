/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum ce32424461a0a7efce64f715a4342c8a
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PersonProps extends LGGlyph.ComponentProps {}
const Person = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: PersonProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Person', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M11.5 4.5C11.5 6.433 9.933 8 8 8C6.067 8 4.5 6.433 4.5 4.5C4.5 2.567 6.067 1 8 1C9.933 1 11.5 2.567 11.5 4.5Z" fill={'currentColor'} /><path d="M8 8C7.29183 8 6.63278 7.78968 6.08191 7.42809C6.66376 7.15352 7.31395 7 8 7C8.68605 7 9.33624 7.15352 9.91809 7.42809C9.36722 7.78968 8.70817 8 8 8Z" fill={'currentColor'} /><path d="M4.591 8.56241C4.89921 8.20507 5.42858 8.22348 5.84253 8.45005C6.48309 8.80067 7.21827 9 8 9C8.78173 9 9.51691 8.80067 10.1575 8.45005C10.5714 8.22348 11.1008 8.20507 11.409 8.56241C12.0889 9.3507 12.5 10.3773 12.5 11.5V14H3.5V11.5C3.5 10.3773 3.91111 9.3507 4.591 8.56241Z" fill={'currentColor'} /></svg>;
};
Person.displayName = 'Person';
Person.isGlyph = true;
Person.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Person;