/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 1a3d381274cc44c597a9dea43b6dfd30
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface DatabaseProps extends LGGlyph.ComponentProps {}
const Database = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: DatabaseProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Database', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M13.5 4.45183C13.5 4.54132 13.4994 4.6287 13.4981 4.71402C13.4994 4.7453 13.5 4.77673 13.5 4.80831V5.03747C13.5 5.3377 13.364 5.62601 13.0672 5.90874C12.7651 6.19655 12.3171 6.45605 11.7616 6.67306C10.6519 7.10662 9.22074 7.32913 8 7.32913C6.77926 7.32913 5.34814 7.10662 4.23838 6.67306C3.68291 6.45605 3.23494 6.19655 2.93283 5.90874C2.63605 5.62601 2.5 5.3377 2.5 5.03747V4.80831C2.5 4.77292 2.5008 4.73772 2.50239 4.70273C2.5008 4.62111 2.5 4.53749 2.5 4.45183C2.5 2.51664 5.28789 1.59998 8 1.59998C10.7121 1.59998 13.5 2.51664 13.5 4.45183Z" fill={'currentColor'} /><path d="M2.5 6.74736V8.70414C2.5 9.00437 2.63605 9.29268 2.93283 9.57541C3.23494 9.86322 3.68291 10.1227 4.23838 10.3397C5.34814 10.7733 6.77926 10.9958 8 10.9958C9.22074 10.9958 10.6519 10.7733 11.7616 10.3397C12.3171 10.1227 12.7651 9.86322 13.0672 9.57541C13.364 9.29268 13.5 9.00437 13.5 8.70414V6.74736C13.1078 7.06499 12.6198 7.32193 12.0952 7.52688C10.8586 8.00998 9.31057 8.2458 8 8.2458C6.68943 8.2458 5.14138 8.00998 3.90481 7.52688C3.38022 7.32193 2.8922 7.06499 2.5 6.74736Z" fill={'currentColor'} /><path d="M12.0952 11.1935C12.6198 10.9886 13.1078 10.7317 13.5 10.414V11.225C13.5 11.2601 13.4992 11.295 13.4977 11.3297C13.4992 11.4126 13.5 11.4965 13.5 11.5814C13.5 13.5166 10.7121 14.4333 8 14.4333C5.28789 14.4333 2.5 13.5166 2.5 11.5814C2.5 11.4926 2.50063 11.405 2.50188 11.3185C2.50063 11.2875 2.5 11.2563 2.5 11.225V10.414C2.8922 10.7317 3.38022 10.9886 3.90481 11.1935C5.14138 11.6766 6.68943 11.9125 8 11.9125C9.31057 11.9125 10.8586 11.6767 12.0952 11.1935Z" fill={'currentColor'} /></svg>;
};
Database.displayName = 'Database';
Database.isGlyph = true;
Database.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Database;