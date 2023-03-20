import React from 'react';

import Button, { ButtonProps } from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import { usePrevious } from '@leafygreen-ui/hooks';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import FileIcon from '@leafygreen-ui/icon/dist/File';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { Option, Select } from '@leafygreen-ui/select';

import { LanguageOption, PopoverProps } from '../types';

import {
  buttonModeStyle,
  containerStyle,
  iconMargin,
  menuButtonStyle,
  selectStyle,
} from './LanguageSwitcher.styles';

function isLeafyGreenIcon(element: React.ReactNode) {
  if (isComponentGlyph(element) || isComponentType(element, 'Icon')) {
    return true;
  }

  return false;
}

interface Props extends PopoverProps {
  language: LanguageOption;
  languageOptions: Array<LanguageOption>;
  onChange: (arg0: LanguageOption) => void;
}

function LanguageSwitcher({
  language,
  languageOptions,
  onChange,
  usePortal,
  portalClassName,
  portalContainer,
  scrollContainer,
  popoverZIndex,
}: Props) {
  const { theme, darkMode } = useDarkMode();
  const previousLanguage = usePrevious(language);

  const handleChange = (val: string) => {
    if (val === '' && previousLanguage !== undefined) {
      return onChange(previousLanguage);
    }

    const selectedOption = languageOptions.find(
      option => option.displayName === val,
    );

    if (selectedOption !== undefined) {
      onChange(selectedOption);
    }
  };

  const iconStyle = cx(
    iconMargin,
    css`
      color: ${darkMode ? palette.gray.light1 : palette.gray.base};
    `,
  );

  // Placeholder for file icon
  let renderedLogo = <FileIcon className={iconStyle} />;

  if (language.image != null) {
    if (isLeafyGreenIcon(language.image)) {
      renderedLogo = React.cloneElement(language.image, {
        className: iconStyle,
      });
    } else {
      renderedLogo = React.cloneElement(language.image, {
        className: iconMargin,
      });
    }
  }

  // eslint-disable-next-line react/display-name
  const LanguageSwitcherButton = React.forwardRef(
    ({ className, children, ...props }: ButtonProps, ref) => (
      <Button
        {...props}
        className={cx(className, menuButtonStyle, buttonModeStyle[theme])}
        darkMode={darkMode}
        ref={ref}
        leftGlyph={renderedLogo}
      >
        {children}
      </Button>
    ),
  );

  const popoverProps = {
    popoverZIndex,
    usePortal,
    portalClassName,
    portalContainer,
    scrollContainer,
  } as const;

  return (
    <div className={containerStyle}>
      <Select
        darkMode={darkMode}
        onChange={handleChange}
        aria-labelledby="Language Picker"
        value={language?.displayName}
        className={selectStyle}
        allowDeselect={false}
        {...popoverProps}
        // Component missing displayName
        // eslint-disable-next-line
        __INTERNAL__menuButtonSlot__={LanguageSwitcherButton}
      >
        {languageOptions?.map(option => (
          <Option key={option?.displayName} value={option?.displayName}>
            {option?.displayName}
          </Option>
        ))}
      </Select>
    </div>
  );
}

LanguageSwitcher.displayName = 'LanguageSwitcher';

export default LanguageSwitcher;
