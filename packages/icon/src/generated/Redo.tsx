/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum aadcfead2ab4d169edd3c2e33dbcab77
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface RedoProps extends LGGlyph.ComponentProps {}
const Redo = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: RedoProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Redo', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M4.01756 9.40216C3.96845 9.72987 3.70455 10 3.37318 10H2.57318C2.24181 10 1.97003 9.73064 2.00272 9.40089C2.18023 7.6104 3.14483 6.05139 4.54567 5.07473C5.02468 4.73549 5.56726 4.46519 6.15478 4.28051C6.72834 4.09832 7.33928 4.00002 7.97318 4.00002C7.98266 3.99998 7.99215 4.00002 8.00164 4.00002C10.7006 4.00002 12.9519 5.71778 13.4688 8.00002H14.8831C15.4243 8.00002 15.6748 8.67204 15.2657 9.02631L12.7841 11.1755C12.5645 11.3657 12.2385 11.3657 12.0188 11.1755L9.53719 9.02631C9.12812 8.67204 9.37866 8.00002 9.91982 8.00002H11.3664C10.8977 6.91458 9.68595 6.00002 8.00164 6.00002C7.81503 6.00002 7.63422 6.01124 7.45958 6.03269C6.75401 6.12312 6.10595 6.39739 5.56496 6.80592C5.54654 6.8206 5.52833 6.83543 5.51032 6.85041C5.4936 6.86432 5.47625 6.87728 5.45838 6.88926C4.69892 7.50399 4.16907 8.39119 4.01756 9.40216Z" fill={'currentColor'} /></svg>;
};
Redo.displayName = 'Redo';
Redo.isGlyph = true;
Redo.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Redo;