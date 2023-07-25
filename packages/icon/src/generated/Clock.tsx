/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum f9ac5e36f8cc3b2a5d97a850a82ac44d
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ClockProps extends LGGlyph.ComponentProps {}
const Clock = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ClockProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Clock', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM7.25 4.75C7.25 4.33579 7.58579 4 8 4C8.41421 4 8.75 4.33579 8.75 4.75V7.90966L10.4939 9.43556C10.8056 9.70832 10.8372 10.1821 10.5644 10.4939C10.2917 10.8056 9.81786 10.8372 9.50613 10.5644L7.51059 8.81833C7.5014 8.8104 7.4924 8.80226 7.48361 8.79391C7.41388 8.7278 7.35953 8.65117 7.32087 8.56867C7.27541 8.47195 7.25 8.36394 7.25 8.25V4.75Z" fill={'currentColor'} /></svg>;
};
Clock.displayName = 'Clock';
Clock.isGlyph = true;
Clock.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Clock;