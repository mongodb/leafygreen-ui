/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum c311217e6a22a0b5511d7bc07c19199d
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface DownloadProps extends LGGlyph.ComponentProps {}
const Download = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: DownloadProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Download', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M9.52439 2.5747V8.13199H11.2363C11.942 8.13199 12.2687 8.91538 11.7353 9.32836L8.49897 11.8337C8.21256 12.0554 7.78744 12.0554 7.50102 11.8337L4.26475 9.32836C3.73129 8.91538 4.05802 8.13199 4.76373 8.13199H6.375V2.5747C6.375 1.70502 7.08002 1 7.9497 1C8.81938 1 9.52439 1.70502 9.52439 2.5747ZM2.5 11H4.30042L6.70523 12.8617C7.46018 13.4461 8.53982 13.4461 9.29477 12.8617L11.6996 11H13.5C14.3284 11 15 11.6716 15 12.5C15 13.3284 14.3284 14 13.5 14H2.5C1.67157 14 1 13.3284 1 12.5C1 11.6716 1.67157 11 2.5 11Z" fill={'currentColor'} /></svg>;
};
Download.displayName = 'Download';
Download.isGlyph = true;
Download.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Download;