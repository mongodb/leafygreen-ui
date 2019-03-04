import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { border } from 'polished';

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

export const baseTextStyle = css`
  cursor: pointer;
  display: block;
  margin: 0;
  text-align: center;
  padding: 16px 10px;
`;
export const baseInputStyle = css`
  display: block;
  left: 0;
  height: 100%;
  top: 0;
  position: absolute;
  visibility: hidden;
  width: 100%;
`;
export const baseLabelStyle = css`
  padding: 0;
  position: relative;
  display: block;
  box-sizing: content-box;
  padding: ${internalSpacing}px;
  border: ${defaultBorderSize}px solid ${colors.gray[5]};
  margin-left: ${borderDifference}px;
  margin-right: 12px;
  font-weight: normal;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  position: relative;
  transition: border-color 300ms ease-in;

  &:hover {
    border-color: ${colors.gray[3]};
    transition: border-color 150ms ease-in-out;

    .rich-radio-illustration-is-image {
      filter: none;
    }
  }
`;

export const checkedVariant = {
  checked: css`
    padding: ${internalSpacing}px;
    border-radius: ${borderRadiusChecked}px;
    border: ${selectedBorderSize}px solid ${colors.green[2]};
    margin-top: 0;
    margin-left: 0;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.15);
    transition: border-color 300ms ease-out;

    &:hover {
      border-color: ${colors.green[2]};
    }
  `,
};

export const richRadioInputStyleVariants = {
  green: css`
    visibility: hidden;

    &:before {
      background: white;
      border-radius: 100%;
      border: 1px solid ${colors.green[2]};
      content: '';
      cursor: pointer;
      display: inline-block;
      height: 16px;
      left: 0;
      top: 0;
      vertical-align: top;
      visibility: visible;
      width: 16px;
    }

    &:checked {
      &:before {
        background-color: ${colors.green[2]};
        box-shadow: inset 0 0 0 2px white;
        border-width: 2px;
      }
    }

    &:focus {
      &:before {
        outline: none;
        border-color: white;
      }
    }
  `,
};

export const richRadioInputSizeVaraints = {
  tight: css`
    padding-right: 4px;
    padding-left: 4px;
  `,

  full: css`
    width: calc(100% - 36px);
  `,

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
};

export const baseGroupStyle = css`
  display: flex;
  margin-left: 15px;
`;
