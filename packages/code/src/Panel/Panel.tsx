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
  getBasePanelStyle,
  basePanelThemeStyle,
  panelIconsStyles,
  panelLeftStyles,
} from './Panel.styles';
import { Body } from '@leafygreen-ui//typography';

type PanelProps = Partial<Omit<LanguageSwitcherProps, 'language'>> & {
  onCopy?: Function;
  contents: string;
  showCopyButton?: boolean;
  language?: LanguageOption;
  customActionButtons?: Array<React.ReactElement>;
  showCustomActionButtons?: boolean;
  className?: string;
  title?: string;
};

function Panel({
  language,
  languageOptions,
  contents,
  onChange,
  onCopy,
  // showCopyButton,
  customActionButtons,
  showCustomActionButtons,
  title,
  className,
}: PanelProps) {
  const { theme } = useDarkMode();

  return (
    <div
      className={cx(getBasePanelStyle, basePanelThemeStyle[theme], className)}
      data-testid="leafygreen-code-panel" // TODO: update testid
    >
      <div>{title && <Body>{title}</Body>}</div>

      <div className={panelLeftStyles}>
        {language !== undefined &&
          languageOptions !== undefined &&
          onChange !== undefined && (
            <LanguageSwitcher
              onChange={onChange}
              language={language}
              languageOptions={languageOptions}
            />
          )}

        <div className={panelIconsStyles}>
          {showCustomActionButtons && (
            <>{customActionButtons?.map((action: React.ReactNode) => action)}</>
          )}
          <CopyButton
            onCopy={onCopy}
            contents={contents}
            withLanguageSwitcher={!!language}
          />
        </div>
      </div>
    </div>
  );
}

Panel.displayName = 'Panel';

export default Panel;
