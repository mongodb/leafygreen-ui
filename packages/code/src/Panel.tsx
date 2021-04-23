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

function getPanelStyles(
  mode: Mode,
  withLanguageSwitcher: boolean,
  isMultiline: boolean,
) {
  if (!withLanguageSwitcher) {
    return cx(
      copyStyle,
      singleLineCopyStyle,
      { [singleLineCopyStyle]: !isMultiline },
      getSidebarVariantStyle(mode),
    );
  }

  const colors = variantColors[mode];

  return css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 12px;
    padding-right: 8px;
    background-color: ${colors[4]};
    border-bottom: 1px solid ${colors[1]};
  `;
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
  isMultiline = false,
}: PanelProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <div className={getPanelStyles(mode, !!language, isMultiline)}>
      {language !== undefined &&
        languageOptions !== undefined &&
        onChange !== undefined && (
          <LanguageSwitcher
            onChange={onChange}
            language={language}
            languageOptions={languageOptions}
            darkMode={darkMode}
          />
        )}

      {showCopyButton && (
        <CopyButton
          onCopy={onCopy}
          darkMode={darkMode}
          contents={contents}
          withLanguageSwitcher={!!language}
        />
      )}
    </div>
  );
}

Panel.displayName = 'Panel';

export default Panel;
