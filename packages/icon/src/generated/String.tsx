/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 18153fd33ca7f9f7251f6cc9f4b3f9db
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface StringProps extends LGGlyph.ComponentProps {}
const String = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: StringProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'String', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M10.6897 14H5.31034L5.15987 13.8629V13.1086L5.31034 12.9714H5.91223C6.2884 12.9714 6.66458 12.6286 6.66458 12.2857V3.5H5.76176C3.7116 3.5 3.22257 4.22857 3.09091 5.32571L2.94044 5.46286H2.11285L2 5.32571L2.28213 2.13714L2.4326 2H13.5674L13.7179 2.13714L14 5.32571L13.8871 5.46286H13.0596L12.9091 5.32571C12.7774 4.22857 12.2884 3.5 10.2382 3.5H9.33542V12.2857C9.33542 12.6286 9.7116 12.9714 10.0878 12.9714H10.6897L10.8401 13.1086V13.8629L10.6897 14Z" fill={'currentColor'} /></svg>;
};
String.displayName = 'String';
String.isGlyph = true;
String.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default String;