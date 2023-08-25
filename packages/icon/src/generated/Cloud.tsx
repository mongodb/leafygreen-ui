/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum f2ccceca3d49749fd36090adcd5653cb
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface CloudProps extends LGGlyph.ComponentProps {}
const Cloud = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: CloudProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Cloud', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path d="M12.5714 8.14286C12.5714 9.91806 11.672 11.4832 10.304 12.4074L10.2902 12.4167C9.4721 12.9655 8.48773 13.2857 7.42857 13.2857L2.85714 13.2857C1.27919 13.2857 0 12.0065 0 10.4286C0 9.03717 0.994597 7.87807 2.31162 7.62345C2.57202 5.02705 4.76357 3 7.42857 3C9.67227 3 11.5804 4.43682 12.283 6.44054C12.4698 6.97334 12.5714 7.54624 12.5714 8.14286Z" fill={'currentColor'} /><path d="M13.8214 8.14286C13.8214 10.1439 12.902 11.9302 11.4626 13.1025C11.8104 13.2213 12.1834 13.2857 12.5714 13.2857C14.465 13.2857 16 11.7507 16 9.85715C16 8.33414 15.007 7.04306 13.633 6.5961C13.7561 7.09139 13.8214 7.6095 13.8214 8.14286Z" fill={'currentColor'} /></svg>;
};
Cloud.displayName = 'Cloud';
Cloud.isGlyph = true;
Cloud.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Cloud;