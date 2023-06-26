/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 679292b66898b993ccdfa922672e2330
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ResizeProps extends LGGlyph.ComponentProps {}
const Resize = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ResizeProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Resize', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M14.7706 5.71967C15.0631 6.01256 15.0631 6.48744 14.7706 6.78033L6.77898 14.7803C6.4864 15.0732 6.01202 15.0732 5.71944 14.7803C5.42685 14.4874 5.42685 14.0126 5.71944 13.7197L13.711 5.71967C14.0036 5.42678 14.478 5.42678 14.7706 5.71967Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M14.7806 10.2197C15.0731 10.5126 15.0731 10.9874 14.7806 11.2803L11.2842 14.7803C10.9917 15.0732 10.5173 15.0732 10.2247 14.7803C9.93212 14.4874 9.93212 14.0126 10.2247 13.7197L13.721 10.2197C14.0136 9.92678 14.488 9.92678 14.7806 10.2197Z" fill={'currentColor'} /></svg>;
};
Resize.displayName = 'Resize';
Resize.isGlyph = true;
Resize.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Resize;