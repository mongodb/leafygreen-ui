/**
 * This is a generated file. Do not modify it manually.
 *
 * @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
 * @checksum 0275ddeaa8216579a1a5cf5dba5d5420
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface BeakerProps extends LGGlyph.ComponentProps {}

const Beaker = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: BeakerProps) => {
  const fillStyle = css`
    color: ${fill};
  `;
  const noFlexShrink = css`
    flex-shrink: 0;
  `;
  const accessibleProps = generateAccessibleProps(role, 'Beaker', {
    title,
    ariaLabel,
    ariaLabelledby,
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
      <g fill="none">
        <path
          d="M10.6228524,1.00001152 C10.8648722,0.999459406 11.09109,1.09759802 11.251189,1.25866733 C11.412397,1.41890495 11.5105356,1.64512277 11.5099811,1.88714257 C11.5105356,2.12902376 11.412397,2.3553802 11.251189,2.51547921 C11.1003772,2.66726139 10.8905158,2.76207327 10.6644366,2.77219208 L10.6644366,2.77219208 L10.6644366,5.33862772 C10.6638821,5.45284554 10.6986742,5.57801386 10.7593871,5.68183564 L10.7593871,5.68183564 L14.2749118,11.3286871 L14.276991,11.3320139 C14.5093079,11.7190238 14.6326747,12.1503901 14.6326747,12.5864693 C14.6329514,12.9867861 14.5274663,13.3902911 14.3148326,13.7567861 C14.3138623,13.7588653 14.3127534,13.7605287 14.3117831,13.7624693 C14.3105356,13.7646871 14.3095653,13.7666277 14.3081791,13.7688455 L14.3081791,13.7688455 L14.2132683,13.9265748 C14.0128326,14.2334198 13.7482386,14.4860139 13.4408722,14.6680337 C13.0788128,14.8830238 12.6575653,15.0000115 12.2169118,15.0000115 L12.2169118,15.0000115 L3.81691182,15.0000115 C3.37625836,15.0002911 2.95709004,14.8824693 2.59724846,14.6674792 C2.23685242,14.4527663 1.93606034,14.1417168 1.72217915,13.7630238 L1.72217915,13.7630238 L1.72051578,13.7599743 C1.52146628,13.3941723 1.41986232,12.9960733 1.42000046,12.5971426 C1.4197237,12.1587069 1.54309004,11.7197168 1.78663459,11.3288257 L1.78663459,11.3288257 L1.78705044,11.3281327 L5.31615935,5.68155842 C5.3767336,5.57773663 5.41152568,5.45284554 5.41097123,5.33862772 L5.41097123,5.33862772 L5.41097123,2.77219208 C5.18489202,2.76207327 4.97503063,2.66726139 4.82408014,2.51547921 C4.66301083,2.3553802 4.56487222,2.12902376 4.56542667,1.88714257 C4.56487222,1.64512277 4.66301083,1.41890495 4.82408014,1.25866733 C4.98431776,1.09759802 5.21039697,0.999459406 5.45241677,1.00001152 L5.45241677,1.00001152 Z M8.90404053,2.77427129 L7.18509004,2.77427129 L7.18509004,5.33862772 C7.18522865,5.79563762 7.04938707,6.23116238 6.8197039,6.60819208 L6.8197039,6.60819208 L6.81859499,6.61013267 L3.296694,12.2673802 C3.226694,12.3795188 3.19453558,12.4965089 3.19439697,12.6096178 C3.1946742,12.7117762 3.22031776,12.8108851 3.27507024,12.9055584 L3.27507024,12.9055584 L3.27839697,12.9112416 C3.39025836,13.1155584 3.59208014,13.2386475 3.83077321,13.2396178 L3.83077321,13.2396178 L12.2307732,13.2396178 C12.350397,13.239202 12.4536643,13.2088455 12.5469514,13.1534 C12.6388524,13.0980931 12.720496,13.0164495 12.7842584,12.9086079 C12.8431692,12.8017366 12.8699217,12.6909842 12.870199,12.5810634 C12.870199,12.4669842 12.8405356,12.3545683 12.78509,12.2553208 L12.78509,12.2553208 L9.27178311,6.61179604 C9.02061479,6.22381584 8.90334747,5.78149901 8.90404053,5.33862772 L8.90404053,5.33862772 L8.90404053,2.77427129 Z M9.5096445,9.4072495 L11.0633673,11.8970317 C11.1289316,11.9998832 11.100793,12.0935861 11.0726544,12.1404376 C11.0446544,12.1964376 10.9792287,12.262002 10.8668128,12.262002 L10.8668128,12.262002 L5.1947336,12.262002 C5.07303063,12.262002 5.00760489,12.1871505 4.98889202,12.1404376 C4.96075341,12.0841604 4.93261479,11.990596 4.99817915,11.8970317 L4.99817915,11.8970317 L6.55190192,9.4072495 L9.5096445,9.4072495 Z"
          fill={'currentColor'}
        />
      </g>
    </svg>
  );
};

Beaker.displayName = 'Beaker';
Beaker.isGlyph = true;
Beaker.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
export default Beaker;
