import React from 'react';

import { usePrevious } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Option, RenderMode, Select, Size } from '@leafygreen-ui/select';

import { useCodeContext } from '../CodeContext/CodeContext';
import { LGIDs } from '../constants';
import { LanguageOption } from '../Panel/Panel.types';

import { containerStyle, selectStyle } from './LanguageSwitcher.styles';

interface Props {
  language: LanguageOption;
  languageOptions: Array<LanguageOption>;
  onChange: (arg0: LanguageOption) => void;
}

function LanguageSwitcher({ language, languageOptions, onChange }: Props) {
  const { darkMode } = useDarkMode();
  const previousLanguage = usePrevious(language);
  const { isLoading } = useCodeContext();

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

  return (
    <div className={containerStyle}>
      <Select
        darkMode={darkMode}
        onChange={handleChange}
        aria-labelledby="Language Picker"
        value={language?.displayName}
        className={selectStyle}
        allowDeselect={false}
        renderMode={RenderMode.TopLayer}
        size={Size.XSmall}
        data-testid={LGIDs.select}
        disabled={isLoading}
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
