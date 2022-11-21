import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { isComponentType } from '@leafygreen-ui/lib';
import { useForwardedRef, useIdAllocator } from '@leafygreen-ui/hooks';
import Checkbox from '@leafygreen-ui/checkbox';
import Icon, { isComponentGlyph } from '@leafygreen-ui/icon';
import {
  ComboboxOptionProps,
  InternalComboboxOptionProps,
  ComboboxSize as Size,
} from './Combobox.types';
import { ComboboxContext } from './ComboboxContext';
import { wrapJSX } from './utils';
import { spacing, typeScales } from '@leafygreen-ui/tokens';
import { menuItemHeight, menuItemPadding } from './ComboboxMenu/Menu.styles';

import { InputOption } from '@leafygreen-ui/internal';

/**
 * Styles
 */

const comboboxOptionBaseStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: inherit;
  overflow: hidden;
`;

const comboboxOptionSizeStyle: Record<Size, string> = {
  [Size.Default]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    min-height: ${menuItemHeight[Size.Default]}px;
    padding: ${menuItemPadding[Size.Default].y}px
      ${menuItemPadding[Size.Default].x}px;
    gap: ${spacing[1]}px;

    &:before {
      max-height: ${menuItemHeight[Size.Default]}px;
    }
  `,
  [Size.Large]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    min-height: ${menuItemHeight[Size.Large]}px;
    padding: ${menuItemPadding[Size.Large].y}px
      ${menuItemPadding[Size.Large].x}px;
    gap: ${spacing[2]}px;

    &:before {
      max-height: ${menuItemHeight[Size.Large]}px;
    }
  `,
};

const checkIconStyle: Record<Size, string> = {
  [Size.Default]: css`
    min-width: ${spacing[3]}px;
  `,
  [Size.Large]: css`
    min-width: ${spacing[4]}px;
  `,
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
            aria-labelledby={optionTextId}
            checked={isSelected}
            tabIndex={-1}
            disabled={disabled}
            darkMode={darkMode}
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
              className={checkIconStyle[size]}
              color={darkMode ? palette.blue.light1 : palette.blue.base}
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
      size,
      darkMode,
      optionTextId,
      disabled,
      withIcons,
    ]);

    return (
      <InputOption
        ref={optionRef}
        aria-label={displayName}
        focused={isFocused}
        disabled={disabled}
        showWedge
        className={cx(
          comboboxOptionBaseStyle,
          comboboxOptionSizeStyle[size],
          className,
        )}
        onClick={handleOptionClick}
        onKeyDown={handleOptionClick}
      >
        {renderedChildren}
      </InputOption>
    );
  },
);
InternalComboboxOption.displayName = 'ComboboxOption';

export { InternalComboboxOption };
export function ComboboxOption(_: ComboboxOptionProps): JSX.Element {
  throw Error('`ComboboxOption` must be a child of a `Combobox` instance');
}
ComboboxOption.displayName = 'ComboboxOption';

ComboboxOption.propTypes = {
  displayName: PropTypes.string,
  value: PropTypes.string,
  glyph: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
