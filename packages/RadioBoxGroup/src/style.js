import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css } = emotion;

const selectedBorderSize = 3;
const borderDifference = 2;
const externalSpacing = 10;
const internalSpacing = 15;

export const radioBoxSizes = {
  default: css`
    width: ${175 - 2 * selectedBorderSize - 2 * internalSpacing}px;
    padding: ${internalSpacing - 5 * internalSpacing}px;
  `,

  tightContentBox: css`
    padding-right: 4px;
    padding-left: 4px;
  `,

  full: css`
    flex: 1;
  `,
};

export const baseGroupStyle = css`
  display: flex;
`;

export const radioDisplay = css`
  box-sizing: content-box;
  padding: ${internalSpacing}px;
  border: 1px solid ${colors.gray[5]};
  border-radius: 3px;
  margin-top: ${borderDifference}px;
  margin-right: 12px;
  margin-bottom: 12px;
  font-weight: normal;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  text-align: center;

  font-size: 14px;
  font-weight: bold;
  text-align: center;
  vertical-align: top;
  overflow-wrap: break-word;

  &:hover {
    transition: border-color 150ms ease-out;
    border-color: ${colors.gray[3]};
  }

  &:focus {
    transition: all 150ms ease-in-out;
    border: 2px solid rgba(196, 219, 179, 0.7);
    transform: scale(1.05);
    outline: transparent;
  }
`;

export const radioInput = css`
  visibility: hidden;
  position: absolute;
  pointer-events: none;

  &:checked + .${radioDisplay} {
    border-radius: 5px;
    border: ${selectedBorderSize}px solid ${colors.green[2]};
    transition: border-color 150ms ease-out;
    margin-top: 0px;
    margin-left: -2px;
    margin-right: ${externalSpacing}px;
    margin-bottom: ${externalSpacing}px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.15);
    transition: border-color 150ms ease-out;

    &:hover {
      border-color: ${colors.green[2]};
    }
  }

  &:disabled + .${radioDisplay} {
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

export const radioWrapper = css`
  display: flex;

  &:last-of-type > .${radioDisplay} {
    margin-right: 0px;
  }

  &:last-of-type > .${radioInput}:checked ~ .${radioDisplay} {
    margin-right: -2px;
  }
`;
