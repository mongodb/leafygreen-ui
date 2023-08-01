/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum eaa307c7678fec14d8892381afbe5636
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface PersonGroupProps extends LGGlyph.ComponentProps {}
const PersonGroup = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: PersonGroupProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'PersonGroup', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M4.80769 8.92308C6.44331 8.92308 7.76923 7.59715 7.76923 5.96154C7.76923 4.32593 6.44331 3 4.80769 3C3.17208 3 1.84615 4.32593 1.84615 5.96154C1.84615 7.59715 3.17208 8.92308 4.80769 8.92308Z" fill={'currentColor'} /><path d="M2.98214 9.30389C2.63188 9.11218 2.18394 9.0966 1.92316 9.39897C1.34786 10.066 1 10.9347 1 11.8846V14H8.61539V11.8846C8.61539 10.9347 8.26752 10.066 7.69223 9.39897C7.43144 9.0966 6.98351 9.11218 6.63325 9.30389C6.09123 9.60056 5.46916 9.76923 4.80769 9.76923C4.14623 9.76923 3.52415 9.60056 2.98214 9.30389Z" fill={'currentColor'} /><path d="M9.61539 11.8846V13H15V11.0942C15 10.3601 14.7259 9.68888 14.2727 9.17347C14.0672 8.93982 13.7143 8.95186 13.4383 9.1C13.0113 9.32925 12.5212 9.45958 12 9.45958C11.4789 9.45958 10.9887 9.32925 10.5617 9.1C10.2857 8.95186 9.93282 8.93982 9.72735 9.17347C9.51772 9.41185 9.34641 9.68357 9.22282 9.97942C9.47531 10.5638 9.61539 11.2083 9.61539 11.8846Z" fill={'currentColor'} /><path d="M14.3334 6.28846C14.3334 7.55234 13.2887 8.57692 12 8.57692C10.7114 8.57692 9.66668 7.55234 9.66668 6.28846C9.66668 5.02458 10.7114 4 12 4C13.2887 4 14.3334 5.02458 14.3334 6.28846Z" fill={'currentColor'} /></svg>;
};
PersonGroup.displayName = 'PersonGroup';
PersonGroup.isGlyph = true;
PersonGroup.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default PersonGroup;