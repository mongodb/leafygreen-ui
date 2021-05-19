import React from 'react';
import { usePrevious } from '@leafygreen-ui/hooks';
import { isComponentType } from '@leafygreen-ui/lib';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import Button, { ButtonProps } from '@leafygreen-ui/button';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import { Select, Option } from '@leafygreen-ui/select';
import { LanguageOption } from './types';
import { uiColors } from '@leafygreen-ui/palette';

const containerStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: -2px;
  margin-left: -1px;
`;

const menuButtonStyle = css`
  border-radius: 4px 0px 0px 0px;
  margin-left: -12px;
  border: 0;

  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 0 0 0;
    border: 0;
  }
`;

const buttonModeStyle = {
  light: css`
    background-color: ${uiColors.white};
    border-right: 1px solid ${uiColors.gray.light2};
    box-shadow: 0 0 0 0;

    &:hover,
    &:active,
    &:focus {
      border-right: 1px solid ${uiColors.gray.light2};
    }

    &:hover {
      background-color: ${uiColors.gray.light2};
    }
  `,
  dark: css`
    border-right: 1px solid ${uiColors.gray.dark3};

    &:hover,
    &:focus,
    &:active {
      border-right: 1px solid ${uiColors.gray.dark3};
    }

    &:hover,
    &:active {
      background-color: ${uiColors.gray.dark1};
    }
  `,
};

const buttonFocusStyle = {
  light: css`
    &:focus {
      background-color: ${uiColors.blue.light2};
    }
  `,
  dark: css`
    &:focus {
      background-color: ${uiColors.focus};
    }
  `,
};

const selectWidth = css`
  width: 144px;
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

interface Props {
  language: LanguageOption;
  languageOptions: Array<LanguageOption>;
  onChange: (arg0: LanguageOption) => void;
  darkMode?: boolean;
}

function LanguageSwitcher({
  language,
  languageOptions,
  onChange,
  darkMode,
}: Props) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const mode = darkMode ? 'dark' : 'light';

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
      color: ${darkMode ? uiColors.white : uiColors.gray.dark1};
    `,
  );

  // Placeholder for file icon
  let renderedLogo = <CopyIcon className={iconStyle} />;

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

  return (
    <div className={containerStyle}>
      <Select
        darkMode={darkMode}
        onChange={handleChange}
        aria-labelledby="Language Picker"
        value={language?.displayName}
        className={selectWidth}
        allowDeselect={false}
        // Component missing displayName
        // eslint-disable-next-line
        __INTERNAL__menuButtonSlot__={React.forwardRef(
          // Linter complaining that className and children are missing from props validation
          // Even though we are validating them with Button props
          // eslint-disable-next-line
          ({ className, children, ...props }: ButtonProps, ref) => (
            <Button
              {...props}
              className={cx(className, menuButtonStyle, buttonModeStyle[mode], {
                [buttonFocusStyle[mode]]: showFocus,
              })}
              darkMode={darkMode}
              ref={ref}
              leftGlyph={renderedLogo}
            >
              {children}
            </Button>
          ),
        )}
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
