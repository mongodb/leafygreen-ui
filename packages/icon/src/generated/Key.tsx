/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 041a3d00ad207ef5b3f0cbcb57ab9bd8
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface KeyProps extends LGGlyph.ComponentProps {}
const Key = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: KeyProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Key', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M6 10C6.55427 10 7.08222 9.88726 7.56215 9.68347L8.87868 11L8.43934 11.4393C7.85355 12.0251 7.85355 12.9749 8.43934 13.5607C9.02513 14.1464 9.97487 14.1464 10.5607 13.5607L11 13.1213L11.4393 13.5607C12.0251 14.1464 12.9749 14.1464 13.5607 13.5607C14.1464 12.9749 14.1464 12.0251 13.5607 11.4393L9.68347 7.56215C9.88726 7.08222 10 6.55427 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10ZM5.25 6.5C5.94036 6.5 6.5 5.94036 6.5 5.25C6.5 4.55964 5.94036 4 5.25 4C4.55964 4 4 4.55964 4 5.25C4 5.94036 4.55964 6.5 5.25 6.5Z" fill={'currentColor'} /></svg>;
};
Key.displayName = 'Key';
Key.isGlyph = true;
Key.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Key;