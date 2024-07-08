/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum cf00d0f1005af63c1de4421f798c699d
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ProjectProps extends LGGlyph.ComponentProps {}
const Project = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ProjectProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Project', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M1 2C1 1.72386 1.22386 1.5 1.5 1.5H14.5C14.7761 1.5 15 1.72386 15 2V4C15 4.27614 14.7761 4.5 14.5 4.5H1.5C1.22386 4.5 1 4.27614 1 4V2Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M2.75 5.5C2.33579 5.5 2 5.83579 2 6.25V13.75C2 14.1642 2.33579 14.5 2.75 14.5H13.25C13.6642 14.5 14 14.1642 14 13.75V6.25C14 5.83579 13.6642 5.5 13.25 5.5H2.75ZM6.25 7C5.97386 7 5.75 7.22386 5.75 7.5C5.75 7.77614 5.97386 8 6.25 8H9.75C10.0261 8 10.25 7.77614 10.25 7.5C10.25 7.22386 10.0261 7 9.75 7H6.25Z" fill={'currentColor'} /></svg>;
};
Project.displayName = 'Project';
Project.isGlyph = true;
Project.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Project;