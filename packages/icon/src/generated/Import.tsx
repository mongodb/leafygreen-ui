/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 5911c32f808ef936ad3910fb071b7a7e
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface ImportProps extends LGGlyph.ComponentProps {}
const Import = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: ImportProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Import', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M11.6225 8.79871C11.7258 8.69129 11.7258 8.52138 11.6225 8.41396L8.81811 5.49829C8.64501 5.31832 8.34095 5.4409 8.34095 5.69066V7.09645C6.48177 7.0133 5 5.47969 5 3.6V3.5C5 2.67157 4.32843 2 3.5 2C2.67157 2 2 2.67157 2 3.5V3.6C2 7.13668 4.82458 10.0136 8.34095 10.0981V11.522C8.34095 11.7718 8.64501 11.8944 8.81811 11.7144L11.6225 8.79871Z" fill={'currentColor'} /><path d="M3.95001 11C3.95001 10.5858 4.2858 10.25 4.70001 10.25C5.11423 10.25 5.45001 10.5858 5.45001 11L5.45001 12.75C5.45001 13.0262 5.67387 13.25 5.95001 13.25H12.814C13.0901 13.25 13.314 13.0262 13.314 12.75V5.88602C13.314 5.60988 13.0901 5.38602 12.814 5.38602L10.8711 5.38602C10.4569 5.38602 10.1211 5.05024 10.1211 4.63602C10.1211 4.22181 10.4569 3.88602 10.8711 3.88602H12.814C13.9186 3.88602 14.814 4.78145 14.814 5.88602V12.75C14.814 13.8546 13.9186 14.75 12.814 14.75H5.95001C4.84544 14.75 3.95001 13.8546 3.95001 12.75V11Z" fill={'currentColor'} /></svg>;
};
Import.displayName = 'Import';
Import.isGlyph = true;
Import.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Import;