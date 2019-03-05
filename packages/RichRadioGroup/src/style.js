import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css } = emotion;

const defaultBorderSize = 1;
const selectedBorderSize = 3;
const borderDifference = 2;
const externalSpacing = 10;
const internalSpacing = 15;

const borderRadius = 3;
const borderRadiusChecked = 5;

const largeWidth = 375;
const mediumWidth = 235;
const smallWidth = 175;

export const baseInputStyle = css`
  visibility: hidden;
  display: none;
`;
export const container = css`
  display: block;
  float: left;
  box-sizing: content-box;
  padding: ${internalSpacing}px;
  border: ${defaultBorderSize}px solid ${colors.gray[5]};
  border-radius: ${borderRadius}px;
  margin-top: ${borderDifference}px;
  margin-left: ${borderDifference}px;
  margin-right: ${externalSpacing + borderDifference}px;
  margin-bottom: ${externalSpacing + borderDifference}px;
  font-weight: normal;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  position: relative;
  text-align: center;

  &:hover {
    transition: border-color 150ms ease-out;
    border-color: ${colors.gray[3]};
  }

  &[disabled] {
    background: ${colors.gray[8]};
    border-color: ${colors.gray[7]};
    box-shadow: none;
    color: ${colors.gray[5]};
    cursor: not-allowed;

    &:hover {
      background: ${colors.gray[8]};
      border-color: ${colors.gray[7]};
    }
  }
`;
export const baseTextStyle = css`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  vertical-align: top;
  overflow-wrap: break-word;
`;

export const checkedVariants = {
  default: css`
    border-radius: ${borderRadiusChecked}px;
    border: ${selectedBorderSize}px solid ${colors.green[2]};
    transition: border-color 150ms ease-out;
    margin-top: 0px;
    margin-left: 0px;
    margin-right: ${externalSpacing}px;
    margin-bottom: ${externalSpacing}px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.15);

    &:hover {
      border-color: ${colors.green[2]};
    }
  `,

  green: css`
    background-color: rgba(196, 219, 179, 0.3);
  `,
};

export const richRadioInputSizeVaraints = {
  small: css`
    width: ${smallWidth - 2 * selectedBorderSize - 2 * internalSpacing}px;
    padding: ${internalSpacing - 5 * internalSpacing}px;
  `,

  medium: css`
    width: ${mediumWidth - 2 * selectedBorderSize - 2 * internalSpacing}px;
  `,

  large: css`
    width: ${largeWidth - 2 * selectedBorderSize - 2 * internalSpacing}px;
    min-height: 120px;
  `,

  tight: css`
    padding-right: 4px;
    padding-left: 4px;
  `,

  full: css`
    width: calc(100% - 36px);
  `,
};

export const baseGroupStyle = css`
  display: flex;
  margin-left: 15px;
`;

// export const baseInputStyle = css`
//   border: 2px solid blue;
// `
// export const container = css`
//   display: flex;
//   margin-right: ${externalSpacing}px;
//   box-sizing: content-box !important;
// `;

// export const wrapperStyle = css`
//   position: absolute;
//   padding: ${internalSpacing}px;
//   border: ${defaultBorderSize}px solid ${colors.gray[5]};
//   border-radius: ${borderRadius}px;
//   box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
//   cursor: pointer;
//   height: 100%;
//   margin-right: ${externalSpacing}px;

//   &:hover {
//     border-color: ${colors.gray[3]};
//     transition: border-color 150ms ease-out;
//   }
// `;
// export const baseTextStyle = css`
//   text-align: center;
//   width: 100%;
//   font-size: 14px;
//   font-weight: bold;
//   padding: 16px 10px;
//   box-sizing: content-box;
//   margin: 0px;
// `;

// export const baseInputStyle = css`
//   visibility: hidden;
//   width: 1px;
//   cursor: pointer;

//   &:checked + .${wrapperStyle} {
//     border-radius: ${borderRadiusChecked}px;
//     border: ${selectedBorderSize}px solid ${colors.green[2]};
//     transition: border-color 300ms ease-out;
//     z-index: -1;
//   }

//   &:disabled {
//     & + .${wrapperStyle} {
//       cursor: default;
//       background: ${colors.gray[8]};
//       border-color: ${colors.gray[7]};
//       z-index: -1;
//     }

//     & ~ .${baseTextStyle} {
//       color: ${colors.gray[5]};
//     }
//   }
// `;

// export const richRadioVariants = {
//   green: css`
//     &:checked + .${wrapperStyle} {
//       border: 1px solid ${colors.green[2]};
//       background-color: rgba(196, 219, 179, 0.3);
//       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) inset;

//       &:hover {
//         border-color: ${colors.green[2]};
//       }
//     }
//   `,
// };

// export const richSizedVariants = {
//   tight: css`
//     padding-right: 4px;
//     padding-left: 4px;
//   `,

//   full: css`
//     width: calc(100% - 36px);
//   `,
// };
