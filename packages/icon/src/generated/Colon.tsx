/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 7f32401256260ec3b5cbee7348a1663c
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ColonProps extends LGGlyph.ComponentProps {}
const Colon = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ColonProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Colon', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M10 4.5C10 5.60457 9.10457 6.5 8 6.5C6.89543 6.5 6 5.60457 6 4.5C6 3.39543 6.89543 2.5 8 2.5C9.10457 2.5 10 3.39543 10 4.5Z" fill={'currentColor'} /><path d="M10 11.5C10 12.6046 9.10457 13.5 8 13.5C6.89543 13.5 6 12.6046 6 11.5C6 10.3954 6.89543 9.5 8 9.5C9.10457 9.5 10 10.3954 10 11.5Z" fill={'currentColor'} /></svg>;
};
Colon.displayName = 'Colon';
Colon.isGlyph = true;
Colon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Colon;