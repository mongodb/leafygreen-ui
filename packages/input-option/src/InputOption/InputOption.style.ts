import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  fontFamilies,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { ActionType } from './InputOption.types';
import { FormState, formThemeStyles, menuThemeStyles, State } from './themes';

export const titleClassName = createUniqueClassName('input-option-title');
export const descriptionClassName = createUniqueClassName(
  'input-option-description',
);
export const leftGlyphClassName = createUniqueClassName(
  'input-option-left-glyph',
);

const hoverSelector = '&:hover, &[data-hover="true"]';
const focusSelector = '&:focus, &:focus-visible, &[data-focus="true"]';

export const inputOptionStyles = css`
  position: relative;
  list-style: none;
  outline: none;
  border: unset;
  margin: 0;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  font-family: ${fontFamilies.default};
  padding: ${spacing[2]}px ${spacing[2] + spacing[1]}px;

  transition: background-color ${transitionDuration.default}ms ease-in-out;

  ${focusSelector} {
    outline: none;
    border: unset;
  }
`;

/** in px */
const wedgeWidth = spacing[1];
/** in px */
const wedgePaddingY = spacing[2];

export const inputOptionWedge = css`
  // Left wedge
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: ${wedgeWidth}px;
    height: calc(100% - ${2 * wedgePaddingY}px);
    min-height: ${spacing[3]}px;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 0 6px 6px 0;
    transform: scale3d(0, 0.3, 0) translateY(-50%);
    transform-origin: 0%; // 0% since we use translateY
    transition: ${transitionDuration.default}ms ease-in-out;
    transition-property: transform, background-color;
  }
`;

export const disabledStyles = css`
  cursor: not-allowed;

  &:before {
    content: unset;
  }
`;

export const getFormElementStyle = ({
  theme,
  checked,
  highlighted,
  disabled,
  showWedge = true,
  isInteractive,
}: {
  theme: Theme;
  checked?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  showWedge?: boolean;
  isInteractive?: boolean;
}) => {
  let state: FormState = 'default';

  if (disabled) {
    state = State.Disabled;
  } else if (highlighted) {
    state = State.Focus;
  } else if (checked) {
    state = State.Checked;
  }

  const shouldShowWedge = state === State.Focus && showWedge;

  const wedgeStyles = css`
    &:before {
      transform: scaleY(1) translateY(-50%);
      background-color: ${formThemeStyles[theme][state].wedge};
    }
  `;

  const hoverStyles = css`
    ${hoverSelector} {
      outline: none;
      background-color: ${formThemeStyles[theme].hover.backgroundColor};

      &,
      & .${leftGlyphClassName} {
        color: ${formThemeStyles[theme].hover.leftGlyph};
      }
    }
  `;

  return cx(
    css`
      background-color: ${formThemeStyles[theme][state].backgroundColor};

      .${titleClassName} {
        color: ${formThemeStyles[theme][state].title};
        font-weight: ${checked && !disabled ? 'bold' : 'normal'};
      }

      &,
      & .${descriptionClassName} {
        color: ${formThemeStyles[theme][state].description};
      }

      &,
      & .${leftGlyphClassName} {
        color: ${formThemeStyles[theme][state].leftGlyph};
      }
    `,
    {
      [wedgeStyles]: shouldShowWedge,
      [hoverStyles]: !disabled && isInteractive,
    },
  );
};

export const getMenuElementStyle = ({
  theme,
  checked,
  highlighted,
  disabled,
  actionType,
  showWedge,
  isInteractive,
}: {
  theme: Theme;
  checked?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  actionType: ActionType;
  showWedge?: boolean;
  isInteractive?: boolean;
}) => {
  let state: State = 'default';

  if (disabled) {
    state = State.Disabled;
  } else if (highlighted) {
    state = State.Focus;
  } else if (checked) {
    state = State.Checked;
  } else if (actionType === ActionType.Destructive) {
    state = State.Destructive;
  }

  const wedge = css`
    &:before {
      transform: scaleY(1) translateY(-50%);
      background-color: ${menuThemeStyles[theme][state].wedge};
    }
  `;

  const shouldOverride = state === State.Checked || state === State.Destructive;

  const overrideHoverBgColor =
    theme === Theme.Light ? palette.gray.dark3 : palette.gray.dark2;

  const hover = css`
    ${hoverSelector} {
      outline: none;
      background-color: ${shouldOverride
        ? overrideHoverBgColor
        : menuThemeStyles[theme].hover.backgroundColor};

      &,
      & .${leftGlyphClassName} {
        color: ${menuThemeStyles[theme].hover.leftGlyph};
      }
    }
  `;

  const titleHoverOverride = css`
    ${hoverSelector} {
      &,
      & .${titleClassName} {
        color: ${state === State.Destructive
          ? palette.red.light2
          : palette.white};
      }
    }
  `;

  return cx(
    css`
      background-color: ${menuThemeStyles[theme][state].backgroundColor};

      .${titleClassName} {
        color: ${menuThemeStyles[theme][state].title};
        font-weight: ${checked && !disabled ? 'bold' : 'normal'};
      }

      &,
      & .${descriptionClassName} {
        color: ${menuThemeStyles[theme][state].description};
      }

      &,
      & .${leftGlyphClassName} {
        color: ${menuThemeStyles[theme][state].leftGlyph};
      }
    `,
    {
      [wedge]: showWedge && (state === 'focus' || state === 'checked'),
      [hover]: !disabled && isInteractive,
      [titleHoverOverride]:
        shouldOverride && !disabled && theme === Theme.Dark && isInteractive,
    },
  );
};
