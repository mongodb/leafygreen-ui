import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css } = emotion;

export const radioBoxSizes = {
  default: css`
    width: 139px;
    padding: -60px;
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
  padding: 15px;
  font-weight: normal;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  vertical-align: top;
  overflow-wrap: break-word;
  background-color: white;
  border: 1px solid ${colors.gray[5]};
  border-radius: 2px;
  box-shadow
  : 0 1px 1px rgba(0, 0, 0, 0.15);
  z-index: 2;

  &:hover {
    border-color: ${colors.gray[3]};
  }
`;

export const radioInput = css`
  opacity: 0;
  position: absolute;
  pointer-events: none;

  &:checked ~ .${radioDisplay} {
    border-color: ${colors.green[2]};
    transition: border-color 0ms;
  }

  &:focus:not(:checked) ~ .${radioDisplay} {
    border-color: rgba(67, 177, 229, 0.25);
    border-radius: 3px;
  }

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
  transition: all 150ms ease-in-out;
  top: -2px;
  bottom: -2px;
  right: -2px;
  left: -2px;
  transform: scale(0.9, 0.8);
  opacity: 0;
  z-index: -1;

  .${radioInput}:checked ~ & {
    border-radius: 3px;
    background-color: ${colors.green[2]};
    transform: scale(1);
    opacity: 1;
    z-index: 1;
  }
`;

export const radioWrapper = css`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    margin-right: 12px;
  }
`;
