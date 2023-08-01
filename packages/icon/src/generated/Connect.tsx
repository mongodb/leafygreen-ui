/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 2a17a3433fb169d96721be3451fc8b7c
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ConnectProps extends LGGlyph.ComponentProps {}
const Connect = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ConnectProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Connect', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M12.8674 8.89755C14.165 7.59995 14.3939 5.63211 13.554 4.09804L14.8289 2.82315C15.057 2.59505 15.057 2.22522 14.8289 1.99712L14.0029 1.17108C13.7748 0.942981 13.405 0.942983 13.1769 1.17109L11.8867 2.4612C10.3625 1.66314 8.43194 1.90377 7.15275 3.18294L5.2772 5.05844C5.26266 5.06875 5.24879 5.08041 5.23576 5.09343L3.18162 7.14751C1.90122 8.42791 1.66139 10.3609 2.46214 11.8858L1.17108 13.1769C0.942974 13.405 0.942974 13.7748 1.17108 14.0029L1.99711 14.8289C2.22521 15.057 2.59504 15.057 2.82315 14.8289L4.10098 13.5511C5.63447 14.3882 7.59986 14.1585 8.89625 12.8621L10.7718 10.9866C10.7863 10.9763 10.8002 10.9646 10.8132 10.9516L12.8674 8.89755ZM6.56112 6.77578L4.68548 8.65134C3.9392 9.39765 3.9392 10.612 4.68548 11.3583C5.43176 12.1045 6.64608 12.1046 7.39242 11.3583L9.44653 9.3042C9.45953 9.2912 9.47337 9.27956 9.48788 9.26927L11.3635 7.39371C12.1098 6.64741 12.1098 5.4331 11.3635 4.68679C10.6172 3.94051 9.40292 3.94049 8.65658 4.68679L6.60247 6.74085C6.58947 6.75385 6.57563 6.7655 6.56112 6.77578Z" fill={'currentColor'} /></svg>;
};
Connect.displayName = 'Connect';
Connect.isGlyph = true;
Connect.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Connect;