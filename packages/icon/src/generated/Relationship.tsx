/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 593173f0dea89c81df364cc746b8f26a
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface RelationshipProps extends LGGlyph.ComponentProps {}
const Relationship = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: RelationshipProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Relationship', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M0.5 2C0.5 1.44772 0.947715 1 1.5 1H3.5C4.05228 1 4.5 1.44772 4.5 2V3H5.99999C7.3807 3 8.49998 4.11929 8.49998 5.5V10.5C8.49998 11.3284 9.17156 12 9.99999 12H11.5V11C11.5 10.4477 11.9477 10 12.5 10H14.5C15.0523 10 15.5 10.4477 15.5 11V14C15.5 14.5523 15.0523 15 14.5 15H12.5C11.9477 15 11.5 14.5523 11.5 14V13H9.99999C8.61928 13 7.49998 11.8807 7.49998 10.5V5.5C7.49998 4.67157 6.82841 4 5.99999 4H4.5V5C4.5 5.55228 4.05228 6 3.5 6H1.5C0.947715 6 0.5 5.55228 0.5 5V2Z" fill={'currentColor'} /></svg>;
};
Relationship.displayName = 'Relationship';
Relationship.isGlyph = true;
Relationship.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Relationship;