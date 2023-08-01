/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 696bb2c284a47b68d7a4980a038183ff
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface GovernmentBuildingProps extends LGGlyph.ComponentProps {}
const GovernmentBuilding = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: GovernmentBuildingProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'GovernmentBuilding', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M11 5V4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4V5H11Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M1.5 6C1.22386 6 1 6.22386 1 6.5C1 6.77614 1.22386 7 1.5 7H2V13H1.5C1.22386 13 1 13.2239 1 13.5C1 13.7761 1.22386 14 1.5 14H14.5C14.7761 14 15 13.7761 15 13.5C15 13.2239 14.7761 13 14.5 13H14V7H14.5C14.7761 7 15 6.77614 15 6.5C15 6.22386 14.7761 6 14.5 6H1.5ZM4.5 8.5C4.5 8.22386 4.72386 8 5 8C5.27614 8 5.5 8.22386 5.5 8.5V11.5C5.5 11.7761 5.27614 12 5 12C4.72386 12 4.5 11.7761 4.5 11.5V8.5ZM8 8C7.72386 8 7.5 8.22386 7.5 8.5V11.5C7.5 11.7761 7.72386 12 8 12C8.27614 12 8.5 11.7761 8.5 11.5V8.5C8.5 8.22386 8.27614 8 8 8ZM10.5 8.5C10.5 8.22386 10.7239 8 11 8C11.2761 8 11.5 8.22386 11.5 8.5V11.5C11.5 11.7761 11.2761 12 11 12C10.7239 12 10.5 11.7761 10.5 11.5V8.5Z" fill={'currentColor'} /></svg>;
};
GovernmentBuilding.displayName = 'GovernmentBuilding';
GovernmentBuilding.isGlyph = true;
GovernmentBuilding.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default GovernmentBuilding;