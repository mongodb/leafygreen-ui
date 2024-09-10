/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 2e7ecb7e84d0149540b3bfdfb0b8931f
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CapProps extends LGGlyph.ComponentProps {}
const Cap = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CapProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Cap', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M2.96929 8.00791V10.3071C2.96929 10.3383 2.96986 10.3693 2.97099 10.4002C2.96986 10.4862 2.96929 10.5734 2.96929 10.6618C2.96929 12.5877 5.50373 13.5 7.96929 13.5C10.4348 13.5 12.9693 12.5877 12.9693 10.6618C12.9693 10.5773 12.9686 10.4938 12.9672 10.4113C12.9686 10.3767 12.9693 10.342 12.9693 10.3071V8.00118L8.70622 9.78705C8.20883 9.99541 7.64838 9.99409 7.15198 9.78338L2.96929 8.00791Z" fill={'currentColor'} /><path d="M7.56463 2.58331C7.81791 2.4729 8.10559 2.47221 8.3594 2.5814L14.7092 5.31304C15.1145 5.4874 15.1118 6.06303 14.7048 6.23351L8.35054 8.89542C8.10185 8.9996 7.82162 8.99894 7.57343 8.89358L1.30463 6.23261C0.90058 6.0611 0.897823 5.48941 1.3002 5.31401L7.56463 2.58331Z" fill={'currentColor'} /><path d="M13.9693 7.62582V9.10335C13.6704 9.27626 13.4693 9.59943 13.4693 9.96957C13.4693 10.5219 13.917 10.9696 14.4693 10.9696C15.0216 10.9696 15.4693 10.5219 15.4693 9.96957C15.4693 9.59943 15.2682 9.27626 14.9693 9.10336V7.20691L13.9693 7.62582Z" fill={'currentColor'} /></svg>;
};
Cap.displayName = 'Cap';
Cap.isGlyph = true;
Cap.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Cap;