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
  font-weight: normal;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  vertical-align: top;
  overflow-wrap: break-word;
  background-color: white;
  z-index: 5;

  &:focus {
    transition: all 150ms ease-in-out;
    border: 2px solid rgba(196, 219, 179, 0.7);
    outline: transparent;
  }
`;

export const radioInput = css`
  visibility: hidden;
  position: absolute;
  pointer-events: none;

  &:disabled ~ .${radioDisplay} {
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

// We use a div for the checked state rather than a pseudo-element
// because said pseudo-element would need to be on the label element
// which can't use the contained input's checked pseudo-class.
export const checkedState = css`
  position: absolute;
  background-color: ${colors.gray[5]};
  top: -1px;
  bottom: -1px;
  right: -1px;
  left: -1px;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  transition: all 150ms ease-in-out;

  .${radioInput}:hover:not(:disabled):not(:checked) + & {
    background-color: ${colors.gray[3]};
  }

  .${radioInput}:checked + & {
    border-radius: 3px;
    background-color: ${colors.green[2]};
    z-index: -1;
    opacity: 1;
    top: -3px;
    bottom: -3px;
    right: -3px;
    left: -3px;
  }
`;

export const radioWrapper = css`
  display: flex;
  position: relative;
  
  &:not(:last-of-type) {
    margin-right: 12px;
  }
`;
