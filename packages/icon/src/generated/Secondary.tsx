/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum cc288159527964f3ceef8eeb46787d45
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface SecondaryProps extends LGGlyph.ComponentProps {}
const Secondary = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: SecondaryProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Secondary', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5ZM8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" fill={'currentColor'} /><path d="M11 9.6705C11 11.1111 9.78621 12 8.11724 12C6.33793 12 5.06897 10.8966 5 9.39464H6.97241C7.04138 10.069 7.56552 10.3908 8.17241 10.3908C8.76552 10.3908 9.06896 10.1456 9.06896 9.77778C9.06896 9.37931 8.8069 9.18008 8.2 9.01149L6.90345 8.64368C5.70345 8.30651 5.15172 7.38697 5.15172 6.2682C5.15172 4.95019 6.2 4 7.92414 4C9.44138 4 10.6 4.88889 10.7103 6.42146H8.8069C8.71034 5.83908 8.31034 5.63985 7.89655 5.63985C7.41379 5.63985 7.08276 5.85441 7.08276 6.22222C7.08276 6.65134 7.45517 6.81992 7.86897 6.9272L9.08276 7.29502C10.4345 7.67816 11 8.4751 11 9.6705Z" fill={'currentColor'} /></svg>;
};
Secondary.displayName = 'Secondary';
Secondary.isGlyph = true;
Secondary.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Secondary;