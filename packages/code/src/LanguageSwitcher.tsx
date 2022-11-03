import React from 'react';
import { usePrevious } from '@leafygreen-ui/hooks';
import { isComponentType, Theme } from '@leafygreen-ui/lib';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import Button, { ButtonProps } from '@leafygreen-ui/button';
import FileIcon from '@leafygreen-ui/icon/dist/File';
import { Select, Option } from '@leafygreen-ui/select';
import { LanguageOption, PopoverProps } from './types';
import { palette } from '@leafygreen-ui/palette';

const containerStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const menuButtonStyle = css`
  // Override default menuButton styles
  margin-top: 0;
  width: 100%;
  height: 100%;
  border-radius: 0px;
  border: 0;
  font-size: 12px;

  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 0 0 0;
    border: 0;
  }

  // Override button defaults
  > *:last-child {
    grid-template-columns: 16px 1fr 16px;
    padding: 0 12px;
    > svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const buttonModeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
    border-right: 1px solid ${palette.gray.light2};
    box-shadow: 0 0 0 0;

    &:hover,
    &:active,
    &:focus {
      border-right: 1px solid ${palette.gray.light2};
    }

    &:hover {
      background-color: ${palette.gray.light2};
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark2};
    border-right: 1px solid ${palette.gray.dark1};
    color: ${palette.gray.light2};

    &:hover,
    &:focus,
    &:active {
      border-right: 1px solid ${palette.gray.dark2};
    }

    &:hover,
    &:active {
      background-color: ${palette.gray.dark1};
    }
  `,
};

const buttonFocusStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus {
      background-color: ${palette.blue.light2};
    }
  `,
  [Theme.Dark]: css`
    &:focus {
      background-color: ${palette.blue.light1};
    }
  `,
};

const selectStyle = css`
  min-width: 144px;
  height: 100%;
`;

const iconMargin = css`
  margin-right: ${spacing[3]}px;
`;

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
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
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
        className={cx(className, menuButtonStyle, buttonModeStyle[theme], {
          [buttonFocusStyle[theme]]: showFocus,
        })}
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
