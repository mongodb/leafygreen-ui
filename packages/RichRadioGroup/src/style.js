import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { border } from 'polished';

const { css } = emotion;

const defaultBorderSize = '1px';
const selectedBorderSize = '3px';
const borderDifference = '2px';
const externalSpacing = '10px';
const internalSpacing = '15px';

const borderRadius = '3px';
const borderRadiusChecked = '5px';

const largeWidth = '375px';
const mediumWidth = '235px';
const smallWidth = '175px';

// export const baseInputStyle =  css`
//   margin-right: ${internalSpacing};
//   height: 16px;
//   width: 16px;
//   display: block;
//   left: 0;
//   height: 100%;
//   top: 0;
//   position: absolute;
//   visibility: hidden;
//   width: 100%;

//   &-is-hidden {
//     display: none;
//   }

//   &-is-green {
//     visibility: hidden;

//     &:before {
//       background: white;
//       border-radius: 100%;
//       border: 1px solid ${colors.green[2]};
//       content: '';
//       cursor: pointer;
//       display: inline-block;
//       height: 16px;
//       left: 0;
//       top: 0;
//       vertical-align: top;
//       visibility: visible;
//       width: 16px;
//     }

//     &:checked {
//       &:before {
//         background-color: ${colors.green[2]};
//         box-shadow: inset 0 0 0 2px white;
//         border-width: 2px;
//       }
//     }

//     &:focus {
//       &:before {
//         outline: none;
//         border-color: white;
//       }
//     }
//   }
// `

// export const baseLabelStyle = css `
//   cursor: pointer;
//   display: block;
//   margin: 0;
//   text-align: center;
//   padding: 16px 10px;
// `

// export const richRadio = css`
//   display: block;
//   box-sizing: content-box;
//   padding: ${internalSpacing};
//   border: ${defaultBorderSize} solid ${colors.gray[5]};
//   border-radius: ${borderRadius};
//   margin-left: ${borderDifference};
//   margin-right: ${externalSpacing + borderDifference};
//   font-weight: normal;
//   box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
//   cursor: pointer;
//   position: relative;

//   &:hover {
//     border-color: ${colors.gray[3]};
//     .transition(border-color 150ms ease-out);
//   }

//   .${baseInputStyle}:disabled + & {
//     border: 1px solid ${colors.gray[6]};
//     color: ${colors.gray[5]};
//     box-shadow: none;
//     cursor: default;

//     &:hover {
//       border: 1px solid ${colors.gray[6]};
//     }

//     &-not-allowed:hover {
//       cursor: not-allowed;
//     }
//   }

//   .${baseInputStyle}:checked + & {
//     border-radius: ${borderRadius}-checked;
//     border: ${selectedBorderSize} solid ${colors.green[2]};
//     margin-top: 0;
//     margin-left: 0;
//     margin-right: ${externalSpacing};
//     margin-bottom: ${externalSpacing};
//     box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.15);

//     &:hover {
//       border-color: ${colors.green[2]};
//     }
//   }
// `;

export const baseInputStyle = css`
  display: block;
  left: 0;
  height: 100%;
  top: 0;
  position: absolute;
  visibility: hidden;
  width: 100%;
`

export const baseLabelStyle = css`
  padding: 0;
  position: relative;
  display: block;
  box-sizing: content-box;
  padding: ${internalSpacing};
  border: ${defaultBorderSize} solid ${colors.gray[5]};
  border-radius: ${borderRadius};
  margin-left: ${borderDifference};
  margin-right: 12px;
  font-weight: normal;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: ${colors.gray[3]};
    .transition(border-color 150ms ease-out);

    .rich-radio-illustration-is-image {
      filter: none;
    }
  }

  .${baseInputStyle}:disabled + & {

  }

  .${baseInputStyle}:checked + label {
    visibility: visible;
    border-radius: ${borderRadiusChecked};
    border: ${selectedBorderSize} solid ${colors.green[2]};
    margin-top: 0;
    margin-left: 0;
    margin-right: ${externalSpacing};
    margin-bottom: ${externalSpacing};
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.15);

    &:hover {
      border-color: ${colors.green[2]};
    }

    &.rich-radio-illustration-item {
      fill: ${colors.gray[2]};
    }

    &.rich-radio-is-disabled:hover {
      border: @selected-border-size solid ${colors.green[2]};
    }
  }
`

export const baseTextStyle = css`
  cursor: pointer;
  display: block;
  margin: 0;
  text-align: center;
  padding: 16px 10px;
`


// export const richRadioInputSizeVaraints = {
//   tight: css`
//     padding-right; 4px;
//     padding-left: 4px;
//   `,

//   full: css`
//     width: 100% - ${selectedBorderSize * 2 + internalSpacing * 2};
//   `,

//   small: css`
//     width: ${smallWidth - 2 * selectedBorderSize - 2 * internalSpacing};
//     padding: ${internalSpacing - 5 * internalSpacing};
//   `,

//   medium: css`
//     width: ${mediumWidth - 2 * selectedBorderSize - 2 * internalSpacing};
//   `,

//   large: css`
//       width: ${largeWidth - 2 * selectedBorderSize - 2 * internalSpacing}
//       min-height: 120px;
//   `,
// };


export const baseGroupStyle = css`
  display: flex;
  margin-left: 15px;
`;
