import React from 'react';
import { usePrevious } from '@leafygreen-ui/hooks';
import { css } from '@leafygreen-ui/emotion';
import { Select, Option } from '@leafygreen-ui/select';
import { LanguageOption } from './types';

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

  const renderedLogo = React.cloneElement(language.image, {
    className: css`
      margin-right: 16px;
    `,
  });

  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        width: 100%;
      `}
    >
      {/* {renderedLogo} */}

      <Select
        darkMode={darkMode}
        onChange={handleChange}
        aria-labelledby="Language Picker"
        value={language?.displayName}
        className={css`
          width: 144px;
        `}
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
