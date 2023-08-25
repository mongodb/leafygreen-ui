/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum aa2473471f0b80a88bb68d6374e6bfbe
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface RefreshProps extends LGGlyph.ComponentProps {}
const Refresh = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: RefreshProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Refresh', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M8.03289 2C10.7318 2 12.9831 3.71776 13.5 6L14.9144 6C15.4555 6 15.7061 6.67202 15.297 7.02629L12.8153 9.17546C12.5957 9.36566 12.2697 9.36566 12.0501 9.17545L9.56844 7.02629C9.15937 6.67202 9.40991 6 9.95107 6H11.3977C10.929 4.91456 9.7172 4 8.03289 4C7.00662 4 6.15578 4.33954 5.54157 4.85039C5.29859 5.05248 4.92429 5.0527 4.72549 4.80702L4.11499 4.05254C3.95543 3.85535 3.96725 3.56792 4.1591 3.40197C5.16255 2.53394 6.52815 2 8.03289 2Z" fill={'currentColor'} /><path d="M3.94991 6.84265C3.73028 6.65245 3.40429 6.65245 3.18466 6.84265L0.703017 8.99182C0.293944 9.34608 0.544489 10.0181 1.08564 10.0181H2.50411C3.02878 12.2913 5.27531 14 7.96711 14C9.47186 14 10.8375 13.4661 11.8409 12.598C12.0327 12.4321 12.0446 12.1447 11.885 11.9475L11.2745 11.193C11.0757 10.9473 10.7014 10.9475 10.4584 11.1496C9.84422 11.6605 8.99338 12 7.96711 12C6.29218 12 5.08453 11.0956 4.6102 10.0181H6.04893C6.59009 10.0181 6.84063 9.34608 6.43156 8.99182L3.94991 6.84265Z" fill={'currentColor'} /></svg>;
};
Refresh.displayName = 'Refresh';
Refresh.isGlyph = true;
Refresh.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Refresh;