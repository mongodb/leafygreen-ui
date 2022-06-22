import { css, cx } from '@leafygreen-ui/emotion';
import React, { useCallback, useContext, useMemo } from 'react';
import { uiColors } from '@leafygreen-ui/palette';
import { isComponentType } from '@leafygreen-ui/lib';
import { useForwardedRef, useIdAllocator } from '@leafygreen-ui/hooks';
import Checkbox from '@leafygreen-ui/checkbox';
import Icon, { isComponentGlyph } from '@leafygreen-ui/icon';
import {
  ComboboxOptionProps,
  ComboboxSize,
  InternalComboboxOptionProps,
  Theme,
} from './Combobox.types';
import { ComboboxContext, useDarkMode } from './ComboboxContext';
import { wrapJSX } from './utils';
import { fontFamilies, typeScales } from '@leafygreen-ui/tokens';
import { menuItemPadding } from './Menu.styles';

/**
 * Styles
 */

const comboboxOptionBaseStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  color: inherit;
  cursor: pointer;
  overflow: hidden;
  font-family: ${fontFamilies.legacy};

  // Left wedge
  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: 3px;
    height: 22px;
    background-color: transparent;
    border-radius: 0 2px 2px 0;
    transform: scale3d(0, 0.3, 0);
    transition: 150ms ease-in-out;
    transition-property: transform, background-color;
  }
`;

const comboboxOptionThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:hover {
      outline: none;
      background-color: ${uiColors.gray.light2};
    }
  `,
  [Theme.Dark]: css``, // TODO: DarkMode
};

const comboboxOptionSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.Default]: css`
    font-size: ${typeScales.body1.fontSize + 1}px; // TODO: update this;
    line-height: ${typeScales.body1.lineHeight + 1}px; // TODO: update this
    padding: ${menuItemPadding[ComboboxSize.Default].y}px
      ${menuItemPadding[ComboboxSize.Default].x}px;
  `,
  [ComboboxSize.Large]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    padding: ${menuItemPadding[ComboboxSize.Large].y}px
      ${menuItemPadding[ComboboxSize.Large].x}px;
  `,
};

const comboboxOptionActiveStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    outline: none;
    background-color: ${uiColors.blue.light3};

    &:before {
      background-color: ${uiColors.blue.base};
      transform: scaleY(1);
    }
  `,
  [Theme.Dark]: css``, // TODO: DarkMode
};

const comboboxOptionDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    cursor: not-allowed;
    color: ${uiColors.gray.base};

    &:hover {
      background-color: inherit;
    }
  `,
  [Theme.Dark]: css``, // TODO: DarkMode
};

const flexSpan = css`
  display: inline-flex;
  gap: 8px;
  justify-content: start;
  align-items: inherit;
  overflow-wrap: anywhere;
`;

const disallowPointer = css`
  pointer-events: none;
`;

const displayNameStyle = (isSelected: boolean) => css`
  font-weight: ${isSelected ? 'bold' : 'normal'};
`;

/**
 * Component
 */
const InternalComboboxOption = React.forwardRef<
  HTMLLIElement,
  InternalComboboxOptionProps
>(
  (
    {
      displayName,
      glyph,
      isSelected,
      isFocused,
      disabled,
      setSelected,
      className,
    }: InternalComboboxOptionProps,
    forwardedRef,
  ) => {
    const { multiselect, darkMode, withIcons, inputValue, size } =
      useContext(ComboboxContext);
    const theme = useDarkMode(darkMode);
    const optionTextId = useIdAllocator({ prefix: 'combobox-option-text' });
    const optionRef = useForwardedRef(forwardedRef, null);

    const handleOptionClick = useCallback(
      (e: React.SyntheticEvent) => {
        // stopPropagation will not stop the keyDown event (only click)
        // since the option is never `focused`, only `aria-selected`
        // the keyDown event does not actually fire on the option element
        e.stopPropagation();

        // If user clicked on the option, or the checkbox
        // Ignore extra click events on the checkbox wrapper
        if (
          !disabled &&
          (e.target === optionRef.current ||
            (e.target as Element).tagName === 'INPUT')
        ) {
          setSelected();
        }
      },
      [disabled, optionRef, setSelected],
    );

    const renderedIcon = useMemo(() => {
      if (glyph) {
        if (isComponentGlyph(glyph) || isComponentType(glyph, 'Icon')) {
          return glyph;
        }
        console.error(
          '`ComboboxOption` instance did not render icon because it is not a known glyph element.',
          glyph,
        );
      }
    }, [glyph]);

    const renderedChildren = useMemo(() => {
      // Multiselect
      if (multiselect) {
        const checkbox = (
          <Checkbox
            // Using empty label due to this bug: https://jira.mongodb.org/browse/PD-1681
            label=""
            aria-labelledby={optionTextId}
            checked={isSelected}
            tabIndex={-1}
            animate={false}
            disabled={disabled}
          />
        );

        return (
          <>
            <span className={cx(flexSpan, disallowPointer)}>
              {withIcons ? renderedIcon : checkbox}
              <span id={optionTextId} className={displayNameStyle(isSelected)}>
                {wrapJSX(displayName, inputValue, 'strong')}
              </span>
            </span>
            {withIcons && checkbox}
          </>
        );
      }

      // Single select
      return (
        <>
          <span className={cx(flexSpan, disallowPointer)}>
            {renderedIcon}
            <span className={displayNameStyle(isSelected)}>
              {wrapJSX(displayName, inputValue, 'strong')}
            </span>
          </span>
          {isSelected && (
            <Icon
              glyph="Checkmark"
              color={darkMode ? uiColors.blue.light1 : uiColors.blue.base}
            />
          )}
        </>
      );
    }, [
      multiselect,
      renderedIcon,
      isSelected,
      displayName,
      inputValue,
      darkMode,
      optionTextId,
      disabled,
      withIcons,
    ]);

    return (
      <li
        ref={optionRef}
        role="option"
        aria-selected={isFocused}
        aria-label={displayName}
        tabIndex={-1}
        className={cx(
          comboboxOptionBaseStyle,
          comboboxOptionSizeStyle[size],
          comboboxOptionThemeStyle[theme],
          {
            [comboboxOptionActiveStyle[theme]]: isFocused,
            [comboboxOptionDisabledStyle[theme]]: disabled,
          },
          className,
        )}
        onClick={handleOptionClick}
        onKeyDown={handleOptionClick}
      >
        {renderedChildren}
      </li>
    );
  },
);
InternalComboboxOption.displayName = 'ComboboxOption';

export { InternalComboboxOption };
export default function ComboboxOption(_: ComboboxOptionProps): JSX.Element {
  throw Error('`ComboboxOption` must be a child of a `Combobox` instance');
}
ComboboxOption.displayName = 'ComboboxOption';
