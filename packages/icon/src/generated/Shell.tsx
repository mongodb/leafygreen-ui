/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 593a865af0acd27b39968999bba315a0
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ShellProps extends LGGlyph.ComponentProps {}
const Shell = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ShellProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Shell', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M1.8 5.2L5.2 7.4L1.41036 9.92642C1.18282 10.0781 1.11937 10.3845 1.26793 10.6141L1.82463 11.4744C1.9761 11.7085 2.28977 11.7735 2.52176 11.6188L7.5 8.3C7.8 8.1 8 7.8 8 7.5C8 7.2 7.8 6.9 7.6 6.7L2.52235 3.28412C2.29032 3.12804 1.97539 3.19258 1.82347 3.42736L1.27593 4.27357C1.12424 4.50799 1.19394 4.82121 1.43071 4.96919L1.8 5.2ZM6.7 13C6.7 13.2761 6.92386 13.5 7.2 13.5H14.9C15.1761 13.5 15.4 13.2761 15.4 13V12C15.4 11.7239 15.1761 11.5 14.9 11.5H7.2C6.92386 11.5 6.7 11.7239 6.7 12V13Z" fill={'currentColor'} /></svg>;
};
Shell.displayName = 'Shell';
Shell.isGlyph = true;
Shell.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Shell;