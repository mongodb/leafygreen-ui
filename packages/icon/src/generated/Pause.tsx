/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 0dd07e363132d108f31290cfc995f2c3
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PauseProps extends LGGlyph.ComponentProps {}
const Pause = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: PauseProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Pause', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M4.5 2C3.94772 2 3.5 2.44772 3.5 3V13C3.5 13.5523 3.94772 14 4.5 14H5.5C6.05228 14 6.5 13.5523 6.5 13V3C6.5 2.44772 6.05228 2 5.5 2H4.5Z" fill={'currentColor'} /><path d="M10.5 2C9.94772 2 9.5 2.44772 9.5 3V13C9.5 13.5523 9.94771 14 10.5 14H11.5C12.0523 14 12.5 13.5523 12.5 13V3C12.5 2.44772 12.0523 2 11.5 2H10.5Z" fill={'currentColor'} /></svg>;
};
Pause.displayName = 'Pause';
Pause.isGlyph = true;
Pause.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Pause;