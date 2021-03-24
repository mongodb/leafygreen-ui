import React from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import CopyButton from './CopyButton';
import LanguageSwitcher from './LanguageSwitcher';
import { variantColors } from './globalStyles';
import {
  Mode,
  LanguageOption,
  LanguageSwitcher as LanguageSwitcherProps,
} from './types';

const singleLineComponentHeight = 36;

const copyStyle = css`
  width: 38px;
  border-left: solid 1px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding-top: 6px;
`;

const singleLineCopyStyle = css`
  min-height: ${singleLineComponentHeight}px;
  padding-top: ${spacing[1]}px;
`;

const languagePickerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
`;

function getSidebarVariantStyle(mode: Mode): string {
  const colors = variantColors[mode];

  switch (mode) {
    case Mode.Light:
      return css`
        border-color: ${colors[1]};
        background-color: white;
      `;

    case Mode.Dark:
      return css`
        border-color: ${colors[1]};
        background-color: ${colors[1]};
      `;
  }
}

type PanelProps = Partial<Omit<LanguageSwitcherProps, 'language'>> & {
  onCopy?: Function;
  contents: string;
  darkMode?: boolean;
  showCopyButton?: boolean;
  language?: LanguageOption;
  isMultiline?: boolean;
};

function Panel({
  language,
  languageOptions,
  contents,
  onChange,
  onCopy,
  showCopyButton,
  darkMode,
  isMultiline,
}: PanelProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <div
      className={cx(
        copyStyle,
        { [singleLineCopyStyle]: !isMultiline },
        { [languagePickerStyle]: !!language },
        getSidebarVariantStyle(mode),
      )}
    >
      {/* This is an ugly inline but its the only way to prove to typescript that all of the properties are known */}
      {language !== undefined &&
        languageOptions !== undefined &&
        onChange !== undefined && (
          <LanguageSwitcher
            onChange={onChange}
            language={language}
            languageOptions={languageOptions}
          />
        )}
      {showCopyButton && (
        <CopyButton onCopy={onCopy} darkMode={darkMode} contents={contents} />
      )}
    </div>
  );
}

Panel.displayName = 'Panel';

export default Panel;
