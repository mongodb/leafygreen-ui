/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 46465b0d3376115e4d03df6d0564620a
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ServerlessProps extends LGGlyph.ComponentProps {}
const Serverless = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ServerlessProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Serverless', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M2.13223 10.8487C0.834955 9.84256 0 8.26878 0 6.5C0 3.46243 2.46243 1 5.5 1C7.74673 1 9.67881 2.34714 10.5326 4.27774C10.9869 4.09848 11.482 4 12 4C14.2091 4 16 5.79086 16 8C16 9.05152 15.5943 10.0083 14.9308 10.7222C14.8896 10.7907 14.8395 10.8552 14.7805 10.9142L13.0092 12.8124C12.6426 13.2337 12.1024 13.5 11.5 13.5L7.79198 13.5C7.4062 14.383 6.52516 15 5.5 15C4.11929 15 3 13.8807 3 12.5C3 12.1448 3.07407 11.8069 3.2076 11.501C3.59316 10.6175 4.47447 10 5.5 10C6.52515 10 7.40619 10.617 7.79197 11.5L11.5 11.5L12.6664 10.25L8.49996 10.25C7.81664 9.34027 6.72814 8.75 5.5 8.75C4.02153 8.75 2.7429 9.6056 2.13223 10.8487Z" fill={'currentColor'} /></svg>;
};
Serverless.displayName = 'Serverless';
Serverless.isGlyph = true;
Serverless.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Serverless;