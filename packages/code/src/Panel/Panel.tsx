import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import CopyButton from '../CopyButton/CopyButton';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import {
  LanguageOption,
  LanguageSwitcher as LanguageSwitcherProps,
} from '../types';

import {
  basePanelStyle,
  basePanelThemeStyle,
  languageSwitcherPanelThemeStyles,
  sidePanelThemeStyles,
} from './Panel.styles';

type PanelProps = Partial<Omit<LanguageSwitcherProps, 'language'>> & {
  onCopy?: Function;
  contents: string;
  showCopyButton?: boolean;
  language?: LanguageOption;
  isMultiline?: boolean;
  customActionButtons?: Array<React.ReactElement>;
  showCustomActionButtons?: boolean;
  className?: string;
  topBarTitle?: string;
};

function Panel({
  language,
  languageOptions,
  contents,
  onChange,
  onCopy,
  showCopyButton,
  customActionButtons,
  showCustomActionButtons,
  className,
  topBarTitle,
}: PanelProps) {
  const { theme } = useDarkMode();

  return (
    <div
      className={cx(
        basePanelStyle,
        basePanelThemeStyle[theme],
        {
          //   [sidePanelThemeStyles[theme]]: !language,
          [languageSwitcherPanelThemeStyles[theme]]: !!language,
        },
        className,
      )}
      data-testid="leafygreen-code-panel"
    >
      <div>{topBarTitle && <div className="">{topBarTitle}</div>}</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {language !== undefined &&
          languageOptions !== undefined &&
          onChange !== undefined && (
            <LanguageSwitcher
              onChange={onChange}
              language={language}
              languageOptions={languageOptions}
            />
          )}

        {showCustomActionButtons && (
          <>{customActionButtons?.map((action: React.ReactNode) => action)}</>
        )}

        {showCopyButton && (
          <CopyButton
            onCopy={onCopy}
            contents={contents}
            withLanguageSwitcher={!!language}
          />
        )}
      </div>
    </div>
  );
}

Panel.displayName = 'Panel';

export default Panel;
