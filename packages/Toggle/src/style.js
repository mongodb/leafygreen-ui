import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css } = emotion;
const transitionInMS = 150;

export const inputStyle = css`
  margin: 0;
  position: absolute;
  left: 100%;
  top: 100%;
  pointer-events: none;
  opacity: 0;
`;

export const grooveStyle = css`
  transition: ${transitionInMS}ms all ease-in-out, 0 background-color linear;
  display: inline-block;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  // We're animating this pseudo-element in order to give the toggle groove
  // background an animation in and out.
  &:before {
    content: '';
    transition: ${transitionInMS}ms all ease-in-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50px;
    background-color: ${colors.mongodb.blue};
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: scale(0.85);
  }

  .${inputStyle}:checked:not(:disabled) ~ & {
    transition-delay: ${transitionInMS}ms;
    // We set background-color here to avoid a small issue with overflow clipping
    // that makes this look less seamless than it should.
    background-color: ${colors.mongodb.blue};
    border: 1px solid #2e9ed3;

    &:before {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const grooveVariants = {
  default: css`
    background-color: rgba(29, 36, 36, 0.1);
    border: 1px solid rgba(18, 22, 22, 0.05);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);

    .${inputStyle}:disabled ~ & {
      background-color: rgba(29, 36, 36, 0.08);
      box-shadow: none;
      border: 1px solid rgba(0, 0, 0, 0.03);

      &:before {
        opacity: 0;
      }
    }
  `,

  dark: css`
    background-color: rgba(29, 36, 36, 0.6);
    border: 1px solid rgba(18, 22, 22, 0.1);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.15);

    .${inputStyle}:disabled ~ & {
      background-color: rgba(255, 255, 255, 0.15);
      box-shadow: none;
      border: 1px solid rgba(255, 255, 255, 0.1);

      &:before {
        opacity: 0;
      }
    }
  `,
};

export const sliderStyle = css`
  transition: all ${transitionInMS}ms ease-in-out;
  border-radius: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;

  .${inputStyle}:disabled ~ .${grooveStyle} > & {
    &:before,
    &:after {
      display: none;
    }
  }

  .${inputStyle}:not(:disabled) ~ .${grooveStyle} > & {
    &:before,
    &:after {
      content: '';
      transition: opacity ${transitionInMS}ms ease-in-out;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    &:before {
      opacity: 1;
    }

    &:after {
      opacity: 0;
      background-image: linear-gradient(
        rgba(220, 220, 220, 0),
        rgba(220, 220, 220, 0.5)
      );
    }
  }
`;

export const sliderVariants = {
  default: css`
    background-color: white;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.25),
      inset 0 -1px 0 #f1f1f1;

    .${inputStyle}:disabled ~ .${grooveStyle} > & {
      background-color: rgba(0, 0, 0, 0.08);
      background-image: none;
      box-shadow: none;
    }

    &:before {
      background-image: linear-gradient(
        rgba(220, 220, 220, 0),
        rgba(220, 220, 220, 0.5)
      );
    }
  `,

  dark: css`
    background-color: #6f767b;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.25),
      inset 0 -1px 0 #454d53;

    .${inputStyle}:disabled ~ .${grooveStyle} > & {
      background-color: rgba(255, 255, 255, 0.15);
      background-image: none;
      box-shadow: none;
    }

    &:before {
      background-image: linear-gradient(
        rgba(88, 95, 98, 0),
        rgba(88, 95, 98, 0.5)
      );
    }

    .${inputStyle}:checked:not(:disabled) ~ .${grooveStyle} > & {
      background-color: white;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.25),
        inset 0 -1px 0 #f1f1f1;

        &:before {
          opacity: 0;
        }

        &:after {
          opacity: 1;
        }
    }
  `,
};

export const sliderSizes = {
  default: css`
    height: 28px;
    width: 28px;
    left: 1px;

    .${inputStyle}:checked ~ .${grooveStyle} > & {
      transform: translate3d(30px, 0, 0);
    }
  `,

  small: css`
    height: 20px;
    width: 20px;
    left: 0;

    .${inputStyle}:checked ~ .${grooveStyle} > & {
      transform: translate3d(18px, 0, 0);
    }

    .${inputStyle}:disabled ~ .${grooveStyle} > & {
      height: 18px;
      width: 18px;
      left: 1px;
    }
  `,

  xsmall: css`
    height: 12px;
    width: 12px;
    left: 0;

    .${inputStyle}:checked ~ .${grooveStyle} > & {
      transform: translate3d(12px, 0, 0);
    }

    .${inputStyle}:disabled ~ .${grooveStyle} > & {
      height: 10px;
      width: 10px;
      left: 1px;
    }
  `,
};

// We use a div for the focus state rather than a pseudo-element
// because said pseudo-element would need to be on the label element
// which can't use the contained input's focus pseudo-class.
export const focusState = css`
  transition: all ${transitionInMS}ms ease-in-out;
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: -2px;
  border: 2px solid rgba(67, 177, 229, 0.25);
  border-radius: 50px;
  opacity: 0;
  transform: scale(0.8);

  .${inputStyle}:focus ~ & {
    opacity: 1;
    transform: scale(1);
  }
`;

export const containerStyle = css`
  position: relative;
  display: inline-block;
  cursor: pointer;

  /* Use [disabled] instead of &:disabled as this isn't an input element */
  &[disabled] {
    cursor: not-allowed;
  }
`;

export const containerSizes = {
  default: css`
    height: 32px;
    width: 62px;
  `,

  small: css`
    height: 22px;
    width: 40px;
  `,

  xsmall: css`
    height: 14px;
    width: 26px;
  `,
};

const labelStyleBase = `
  transition: all ${transitionInMS}ms ease-in-out;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 11px;
  line-height: 11px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 11px;
  color: white;
`;

export const onLabelStyle = css`
  ${labelStyleBase};
  left: 9px;
  color: #bbebff;

  .${inputStyle}:hover ~ .${grooveStyle} > &,
  .${inputStyle}:focus ~ .${grooveStyle} > & {
    color: white;
  }
`;

export const offLabelStyle = css`
  ${labelStyleBase};
  right: 6px;
  color: #9fa1a2;
`;
