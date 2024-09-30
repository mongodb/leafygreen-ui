/**
* This is a generated file. Do not modify it manually.
*
* @script ./node_modules/.bin/ts-node packages/icon/scripts/build.ts
* @checksum 944c4a3d45c0ff1cf5c6a8227b3d7964
*/
import * as React from "react";
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { generateAccessibleProps, sizeMap } from '../glyphCommon';
import { LGGlyph } from '../types';
export interface EmptyDatabaseProps extends LGGlyph.ComponentProps {}
const EmptyDatabase = ({
  className,
  size = 16,
  title,
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledby,
  fill,
  role = 'img',
  ...props
}: EmptyDatabaseProps) => {
  const fillStyle = css`
        color: ${fill};
      `;
  const noFlexShrink = css`
        flex-shrink: 0;
      `;
  const accessibleProps = generateAccessibleProps(role, 'EmptyDatabase', {
    title,
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby
  });
  return <svg className={cx({
    [fillStyle]: fill != null
  }, noFlexShrink, className)} height={typeof size === 'number' ? size : sizeMap[size]} width={typeof size === 'number' ? size : sizeMap[size]} role={role} {...accessibleProps} {...props} viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M7.5076 1.60749C7.65108 1.60258 7.79684 1.6001 7.94477 1.6001C8.09386 1.6001 8.24086 1.60262 8.38565 1.6076C8.79962 1.62183 9.12367 1.96896 9.10944 2.38293C9.09521 2.7969 8.74808 3.12094 8.33411 3.10671C8.20677 3.10233 8.07695 3.1001 7.94477 3.1001C7.81361 3.1001 7.68494 3.1023 7.55885 3.10661C7.14487 3.12076 6.79781 2.79664 6.78366 2.38267C6.76951 1.9687 7.09363 1.62164 7.5076 1.60749ZM6.22702 2.44453C6.33363 2.84479 6.09558 3.25569 5.69532 3.3623C5.44384 3.42928 5.21813 3.50667 5.01884 3.59163C4.6378 3.75406 4.19723 3.57685 4.0348 3.19582C3.87236 2.81478 4.04957 2.37421 4.4306 2.21178C4.70259 2.09583 4.99664 1.99609 5.30926 1.91283C5.70952 1.80622 6.12041 2.04427 6.22702 2.44453ZM9.68375 2.4478C9.7895 2.04731 10.1999 1.80839 10.6004 1.91415C10.9145 1.9971 11.2105 2.09628 11.4846 2.21139C11.8665 2.37176 12.0461 2.81136 11.8858 3.19327C11.7254 3.57518 11.2858 3.75478 10.9039 3.59442C10.7008 3.50916 10.4717 3.43158 10.2174 3.36443C9.81691 3.25868 9.57799 2.84829 9.68375 2.4478ZM12.462 3.52915C12.8556 3.40016 13.2793 3.61467 13.4083 4.00828C13.4757 4.21408 13.5109 4.42898 13.5109 4.64941C13.5109 4.86988 13.4764 5.08588 13.4029 5.293C13.2643 5.68335 12.8355 5.88747 12.4452 5.74892C12.0548 5.61036 11.8507 5.1816 11.9893 4.79125C12.0016 4.75666 12.0109 4.71148 12.0109 4.64941C12.0109 4.59034 12.0018 4.533 11.9829 4.47543C11.8539 4.08181 12.0684 3.65815 12.462 3.52915ZM3.47822 3.52968C3.87322 3.65438 4.09235 4.07567 3.96765 4.47067C3.94918 4.52918 3.94 4.58817 3.94 4.64941C3.94 4.70884 3.94906 4.7523 3.96103 4.78591C4.1 5.17611 3.89634 5.60509 3.50613 5.74406C3.11593 5.88304 2.68695 5.67937 2.54797 5.28917C2.47477 5.08363 2.44 4.86895 2.44 4.64941C2.44 4.4333 2.47316 4.22209 2.53723 4.01912C2.66193 3.62412 3.08322 3.40499 3.47822 3.52968ZM4.10042 5.91355C4.21305 5.51494 4.6275 5.28312 5.0261 5.39575C5.23484 5.45474 5.46953 5.50827 5.73012 5.55697C6.13729 5.63306 6.40567 6.02482 6.32958 6.43199C6.25348 6.83915 5.86172 7.10753 5.45456 7.03144C5.16019 6.97643 4.87998 6.9132 4.61821 6.83923C4.2196 6.72659 3.98778 6.31215 4.10042 5.91355ZM11.8289 5.92656C11.9389 6.32588 11.7045 6.73883 11.3051 6.8489C11.0414 6.92162 10.7584 6.9838 10.46 7.03795C10.0525 7.11192 9.66211 6.84149 9.58814 6.43394C9.51417 6.02638 9.7846 5.63603 10.1922 5.56206C10.4572 5.51395 10.6952 5.46109 10.9065 5.40284C11.3058 5.29276 11.7188 5.52724 11.8289 5.92656ZM6.80347 6.4788C6.84074 6.06627 7.20537 5.76205 7.6179 5.79932C7.72557 5.80904 7.83491 5.81847 7.94587 5.82766C8.05862 5.81866 8.16958 5.80942 8.27873 5.7999C8.69138 5.76392 9.05507 6.06926 9.09105 6.48191C9.12704 6.89456 8.82169 7.25825 8.40904 7.29423C8.27596 7.30584 8.14077 7.317 8.00358 7.32779C7.96371 7.33092 7.92366 7.33087 7.8838 7.32762C7.74838 7.31657 7.61472 7.30514 7.48295 7.29323C7.07042 7.25597 6.7662 6.89133 6.80347 6.4788Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M3.76945 9.31366C3.93133 8.93239 4.37164 8.75454 4.75291 8.91641C4.98254 9.01391 5.23645 9.09728 5.50262 9.16779C5.90302 9.27387 6.14162 9.68445 6.03554 10.0849C5.92946 10.4853 5.51888 10.7239 5.11848 10.6178C4.80042 10.5335 4.47639 10.4286 4.1667 10.2971C3.78543 10.1352 3.60757 9.69494 3.76945 9.31366ZM12.2243 9.32973C12.3825 9.71254 12.2005 10.1511 11.8177 10.3093C11.5048 10.4386 11.1774 10.5418 10.8559 10.6246C10.4548 10.728 10.0459 10.4867 9.94248 10.0855C9.83911 9.68444 10.0805 9.27548 10.4816 9.1721C10.7523 9.10232 11.0108 9.01974 11.2447 8.92307C11.6275 8.76486 12.0661 8.94693 12.2243 9.32973ZM6.77957 10.1849C6.80522 9.77144 7.16116 9.45709 7.57458 9.48275C7.70493 9.49083 7.80922 9.4952 7.87976 9.49752C7.915 9.49869 7.94174 9.49934 7.95902 9.49969L7.97456 9.49997L7.99052 9.49969C8.00809 9.49934 8.03523 9.4987 8.07097 9.49755C8.14249 9.49525 8.24816 9.49094 8.38021 9.48297C8.79367 9.45799 9.14909 9.77292 9.17406 10.1864C9.19904 10.5998 8.88411 10.9553 8.47065 10.9802C8.32308 10.9892 8.20324 10.9941 8.11916 10.9968C8.0771 10.9981 8.04391 10.9989 8.02061 10.9994L7.99316 10.9999L7.98522 11L7.98272 11L7.98151 11H7.96737L7.96593 11L7.96343 11L7.95548 10.9999L7.92816 10.9994C7.90499 10.9989 7.87203 10.9981 7.83029 10.9967C7.74684 10.994 7.62799 10.9889 7.48168 10.9799C7.06827 10.9542 6.75392 10.5983 6.77957 10.1849Z" fill={'currentColor'} /><path fillRule="evenodd" clipRule="evenodd" d="M3 6.85005C3.41421 6.85005 3.75 7.18584 3.75 7.60005V8.22861C3.75 8.64282 3.41421 8.97861 3 8.97861C2.58579 8.97861 2.25 8.64282 2.25 8.22861V7.60005C2.25 7.18584 2.58579 6.85005 3 6.85005ZM13 6.85005C13.4142 6.85005 13.75 7.18584 13.75 7.60005V8.22861C13.75 8.64282 13.4142 8.97861 13 8.97861C12.5858 8.97861 12.25 8.64282 12.25 8.22861V7.60005C12.25 7.18584 12.5858 6.85005 13 6.85005ZM3 10.6214C3.41421 10.6214 3.75 10.9572 3.75 11.3714V11.7228C3.75972 11.7327 3.76966 11.7425 3.77984 11.7524C4.0771 12.0409 4.08424 12.5157 3.79578 12.8129C3.50732 13.1102 3.0325 13.1173 2.73524 12.8289C2.61288 12.7102 2.50042 12.5838 2.4 12.45C2.30263 12.3201 2.25 12.1622 2.25 12V11.3714C2.25 10.9572 2.58579 10.6214 3 10.6214ZM13 10.6214C13.4142 10.6214 13.75 10.9572 13.75 11.3714V12C13.75 12.1622 13.6974 12.3201 13.6 12.45C13.494 12.5912 13.3727 12.7208 13.2422 12.8393C12.9355 13.1177 12.4612 13.0949 12.1827 12.7883C11.9043 12.4816 11.9271 12.0073 12.2337 11.7288C12.2393 11.7238 12.2447 11.7188 12.25 11.7139V11.3714C12.25 10.9572 12.5858 10.6214 13 10.6214ZM11.7533 12.9525C11.8873 13.3444 11.6783 13.7708 11.2864 13.9049C11.0264 13.9938 10.7562 14.0727 10.4803 14.1409C10.0782 14.2403 9.67167 13.9949 9.57228 13.5928C9.4729 13.1907 9.7183 12.7841 10.1204 12.6847C10.3566 12.6264 10.5847 12.5596 10.8009 12.4857C11.1928 12.3516 11.6192 12.5606 11.7533 12.9525ZM4.22533 13.0017C4.35896 12.6096 4.78512 12.4001 5.17719 12.5338C5.38606 12.605 5.61107 12.6688 5.85122 12.7239C6.25496 12.8164 6.50721 13.2188 6.41464 13.6225C6.32206 14.0262 5.91972 14.2785 5.51599 14.1859C5.22886 14.1201 4.95403 14.0424 4.69326 13.9536C4.3012 13.8199 4.0917 13.3938 4.22533 13.0017ZM9.13633 13.6577C9.15486 14.0715 8.83443 14.422 8.42063 14.4405C8.2798 14.4468 8.13941 14.4501 8 14.4501C7.8606 14.4501 7.72277 14.4478 7.5866 14.4434C7.1726 14.4301 6.84782 14.0836 6.86118 13.6696C6.87455 13.2556 7.22099 12.9308 7.63499 12.9442C7.75487 12.9481 7.87657 12.9501 8 12.9501C8.11625 12.9501 8.23426 12.9474 8.35353 12.942C8.76733 12.9235 9.1178 13.2439 9.13633 13.6577Z" fill={'currentColor'} /></svg>;
};
EmptyDatabase.displayName = 'EmptyDatabase';
EmptyDatabase.isGlyph = true;
EmptyDatabase.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};
export default EmptyDatabase;