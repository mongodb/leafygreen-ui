import React, { useContext, useMemo } from 'react';

import Checkbox from '@leafygreen-ui/checkbox';
import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import Icon, { isComponentGlyph } from '@leafygreen-ui/icon';
import { palette } from '@leafygreen-ui/palette';

import { InternalComboboxOptionProps } from '../Combobox.types';
import { ComboboxContext } from '../ComboboxContext';
import { wrapJSX } from '../utils';

import {
  checkIconStyle,
  disallowPointer,
  displayNameStyle,
  flexSpan,
} from './ComboboxOption.styles';

export const OptionContent = ({
  disabled,
  displayName,
  glyph,
  isSelected,
}: Pick<
  InternalComboboxOptionProps,
  'disabled' | 'displayName' | 'glyph' | 'isSelected'
>) => {
  const { multiselect, darkMode, withIcons, inputValue, size } =
    useContext(ComboboxContext);
  const optionTextId = useIdAllocator({ prefix: 'combobox-option-text' });

  const icon = useMemo((): JSX.Element => {
    if (glyph) {
      if (isComponentGlyph(glyph)) {
        return glyph;
      }
      console.error(
        '`ComboboxOption` instance did not render icon because it is not a known glyph element.',
        glyph,
      );
    }

    return <></>;
  }, [glyph]);

  const checkbox = (
    <Checkbox
      aria-labelledby={optionTextId}
      checked={isSelected}
      tabIndex={-1}
      disabled={disabled}
      darkMode={darkMode}
    />
  );

  return multiselect ? (
    <>
      <span className={cx(flexSpan, disallowPointer)}>
        {withIcons ? icon : checkbox}
        <span id={optionTextId} className={displayNameStyle(isSelected)}>
          {wrapJSX(displayName, inputValue, 'strong')}
        </span>
      </span>
      {withIcons && checkbox}
    </>
  ) : (
    // Single select
    <>
      <span className={cx(flexSpan, disallowPointer)}>
        {icon}
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
};
