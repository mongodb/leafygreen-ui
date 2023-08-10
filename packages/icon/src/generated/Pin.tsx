/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum af3241bbc283fa461885e25ad52d20b7
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PinProps extends LGGlyph.ComponentProps {}
const Pin = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: PinProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Pin', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M10 8.5V3.3H10.6833C11.0423 3.3 11.3333 3.00898 11.3333 2.65C11.3333 2.29101 11.0423 2 10.6833 2H5.31667C4.95768 2 4.66667 2.29101 4.66667 2.65C4.66667 3.00898 4.95768 3.3 5.31667 3.3H6V8.5L4.38343 9.55077C4.14428 9.70621 4 9.97208 4 10.2573C4 10.7227 4.37728 11.1 4.84269 11.1H7.46667V14.4667C7.46667 14.7612 7.70545 15 8 15C8.29455 15 8.53333 14.7612 8.53333 14.4667V11.1H11.1573C11.6227 11.1 12 10.7227 12 10.2573C12 9.97208 11.8557 9.70622 11.6166 9.55077L10 8.5Z" fill={'currentColor'} /></svg>;
};
Pin.displayName = 'Pin';
Pin.isGlyph = true;
Pin.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Pin;