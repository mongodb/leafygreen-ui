/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum d80a6992819bcd97a003e3f401311184
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface HighlightProps extends LGGlyph.ComponentProps {}
const Highlight = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: HighlightProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Highlight', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M8.85275 12.0315C8.87165 12.0114 8.89799 12 8.92557 12H14.75C14.8881 12 15 12.1119 15 12.25V13.75C15 13.8881 14.8881 14 14.75 14H7.23145C7.14381 14 7.09857 13.8953 7.15863 13.8315L8.85275 12.0315Z" fill={'currentColor'} /><path d="M4.01887 9.19347L4.39384 8.8185L7.57582 12.0005L7.20114 12.3752C6.99596 12.5803 6.71178 12.6863 6.42236 12.6655L5.84842 12.6242C5.55901 12.6034 5.27482 12.7094 5.06964 12.9146L4.92888 13.0553L3.33789 11.4643L3.47895 11.3233C3.68396 11.1183 3.7899 10.8344 3.76932 10.5452L3.7285 9.97156C3.70792 9.68237 3.81386 9.39848 4.01887 9.19347Z" fill={'currentColor'} /><path d="M11.4334 1.77892C11.8239 1.38839 12.4571 1.38839 12.8476 1.77892L14.6154 3.54668C15.0059 3.93721 15.0059 4.57037 14.6154 4.9609L8.28006 11.2962L5.09808 8.11425L11.4334 1.77892Z" fill={'currentColor'} /><path d="M2.63228 12.1672L4.22462 13.7596L4.05424 13.9317C4.00728 13.9792 3.9433 14.0059 3.87655 14.0059L1.38588 14.0059C1.16267 14.0059 1.05135 13.7356 1.20981 13.5784L2.63228 12.1672Z" fill={'currentColor'} /></svg>;
};
Highlight.displayName = 'Highlight';
Highlight.isGlyph = true;
Highlight.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Highlight;