/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 48037fafafbd1afebb42cc9312aee6a0
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface UniversityProps extends LGGlyph.ComponentProps {}

const University = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: UniversityProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'University', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
  });
  return (
    <svg
      className={cx(
        {
          [fillStyle]: fill != null,
        },
        noFlexShrink,
        className,
      )}
      height={typeof size === 'number' ? size : sizeMap[size]}
      width={typeof size === 'number' ? size : sizeMap[size]}
      role={role}
      {...accessibleProps}
      {...props}
      viewBox="0 0 16 16"
    >
      <g
        id="Glyphs-/-University"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M14.1791869,2.0013334 C12.8472194,2.07769464 10.1998123,2.35563971 8.56547844,3.36625977 C8.45269871,3.43599157 8.38877399,3.5599865 8.38877399,3.68962872 L8.38877399,12.6238931 C8.38877399,12.9074855 8.69575848,13.0867257 8.95461713,12.9551192 C10.6361046,12.100168 13.0679176,11.8669102 14.2703343,11.8030712 C14.6808623,11.7812186 14.9999999,11.4487649 14.9999999,11.0502624 L14.9999999,2.75512436 C15.0002428,2.32028274 14.626903,1.97579781 14.1791869,2.0013334 Z M7.43452132,3.36625977 C5.80043048,2.35563971 3.15302345,2.07794017 1.82105591,2.0013334 C1.37333981,1.97579781 1,2.32028274 1,2.75512436 L1,11.0505079 C1,11.449256 1.31913748,11.7817097 1.72966543,11.8033168 C2.93256824,11.8671557 5.36559655,12.1006591 7.04708405,12.9561013 C7.30521353,13.0874623 7.61122578,12.9084676 7.61122578,12.6256118 L7.61122578,3.6852091 C7.61122578,3.55532134 7.54754412,3.43623711 7.43452132,3.36625977 Z"
          id="Shape"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

University.displayName = 'University';
University.isGlyph = true;
University.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default University;
