/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 7a5a6107c2395960a1a08c7428133f60
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface EmailProps extends LGGlyph.ComponentProps {}
const Email = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: EmailProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Email', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M2.49388 4L7.20766 9.05051C7.64505 9.51914 8.35419 9.51914 8.79158 9.05051L13.5054 4H2.49388Z" fill={'currentColor'} /><path d="M1.13324 4.25647C1.04729 4.48631 1 4.73721 1 4.99995V11C1 11.369 1.09326 11.7146 1.25591 12.0114L4.8135 8.19963L1.13324 4.25647Z" fill={'currentColor'} /><path d="M2.86667 13C2.5187 13 2.19297 12.898 1.91411 12.7204L5.47346 8.90674L6.69282 10.2132C7.42179 10.9943 8.6037 10.9943 9.33268 10.2132L10.6793 8.77044L14.2535 12.6C13.9415 12.8512 13.5536 13 13.1333 13H2.86667Z" fill={'currentColor'} /><path d="M14.8392 11.8133C14.9425 11.5648 15 11.2896 15 11V4.99995C15 4.74466 14.9554 4.50054 14.874 4.27606L11.3392 8.06332L14.8392 11.8133Z" fill={'currentColor'} /></svg>;
};
Email.displayName = 'Email';
Email.isGlyph = true;
Email.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Email;