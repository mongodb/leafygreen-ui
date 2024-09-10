/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 30d6247446ac7b94463fd9b1f68b2527
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface HomeProps extends LGGlyph.ComponentProps {}
const Home = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: HomeProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'Home', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M7.68697 1.75127C7.86982 1.60448 8.13013 1.60448 8.31298 1.75127L14.7458 6.91541C14.9651 7.09144 14.9961 7.41362 14.8145 7.62829L14.1709 8.38896C13.9949 8.5969 13.6849 8.62574 13.4736 8.45382L8.31555 4.25677C8.13175 4.10721 7.8682 4.10721 7.6844 4.25677L2.52637 8.45381C2.31508 8.62574 2.00506 8.5969 1.8291 8.38895L1.18546 7.62829C1.00382 7.41362 1.03486 7.09144 1.25415 6.91541L7.68697 1.75127Z" fill={'currentColor'} /><path d="M7.68763 5.24987C7.87024 5.10378 8.12971 5.10378 8.31232 5.24987L12.8123 8.84987C12.9309 8.94476 13 9.08841 13 9.24031V13.5C13 13.7761 12.7761 14 12.5 14H9.49998C9.22383 14 8.99997 13.7761 8.99997 13.5V11.5C8.99997 11.2239 8.77612 11 8.49997 11H7.49997C7.22383 11 6.99997 11.2239 6.99997 11.5V13.5C6.99997 13.7761 6.77612 14 6.49997 14H3.49997C3.22383 14 2.99997 13.7761 2.99997 13.5V9.24031C2.99997 9.08841 3.06902 8.94476 3.18763 8.84987L7.68763 5.24987Z" fill={'currentColor'} /></svg>;
};
Home.displayName = 'Home';
Home.isGlyph = true;
Home.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default Home;