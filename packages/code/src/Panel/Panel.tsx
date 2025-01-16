import React from 'react';
import ClipboardJS from 'clipboard';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import CopyButton from '../CopyButton/CopyButton';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

import {
  getBasePanelStyle,
  getPanelTitleStyles,
  panelIconsStyles,
  panelLeftStyles,
} from './Panel.styles';
import { Body } from '@leafygreen-ui//typography';
import { LanguageOption, PanelProps } from './Panel.types';
import { isComponentType } from '@leafygreen-ui/lib';
import { useCodeContext } from '../CodeContext/CodeContext';
import { LGIDs } from '../constants';

function Panel({
  languageOptions,
  onChange,
  onCopy,
  customActionButtons = [],
  showCustomActionButtons,
  title,
  className,
}: PanelProps) {
  const { theme } = useDarkMode();
  const { contents, language: languageProp } = useCodeContext();

  const language = typeof languageProp === 'string' ? undefined : languageProp;
  const hasTitle = !!title;

  const filteredCustomActionIconButtons = customActionButtons.filter(
    (item: React.ReactElement) => isComponentType(item, 'IconButton') === true,
  );

  const showCustomActionsInPanel =
    showCustomActionButtons && !!filteredCustomActionIconButtons.length;

  const isLanguageAnOption = languageOptions?.some(
    option => option === language,
  );

  const shouldRenderLanguageSwitcher =
    language !== undefined &&
    languageOptions !== undefined &&
    languageOptions.length !== 0 &&
    onChange !== undefined &&
    isLanguageAnOption;

  return (
    <div
      className={cx(getBasePanelStyle({ hasTitle, theme, className }))}
      data-testid={LGIDs.panel}
    >
      {title && <Body className={getPanelTitleStyles(theme)}>{title}</Body>}

      <div className={panelLeftStyles}>
        {shouldRenderLanguageSwitcher && (
          <LanguageSwitcher
            onChange={onChange}
            language={language as LanguageOption}
            languageOptions={languageOptions}
          />
        )}

        <div className={panelIconsStyles}>
          {showCustomActionsInPanel && (
            <>
              {filteredCustomActionIconButtons?.map(
                (action: React.ReactNode) => action,
              )}
            </>
          )}
          {ClipboardJS.isSupported() && (
            <CopyButton onCopy={onCopy} contents={contents} />
          )}
        </div>
      </div>
    </div>
  );
}

Panel.displayName = 'Panel';

export default Panel;
