import React from 'react';
import ClipboardJS from 'clipboard';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { Body } from '@leafygreen-ui/typography';

import { useCodeContext } from '../CodeContext/CodeContext';
import CopyButton from '../CopyButton/CopyButton';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

import {
  getBasePanelStyle,
  getPanelTitleStyles,
  panelIconsStyles,
  panelLeftStyles,
} from './Panel.styles';
import { PanelProps } from './Panel.types';

function Panel({
  languageOptions,
  onChange,
  onCopy,
  customActionButtons = [],
  showCustomActionButtons,
  title,
  className,
  ...rest
}: PanelProps) {
  const { theme } = useDarkMode();
  const { contents, language, lgids } = useCodeContext();

  const hasTitle = !!title;

  const filteredCustomActionIconButtons = customActionButtons.filter(
    (item: React.ReactElement) => isComponentType(item, 'IconButton'),
  );

  const showCustomActionsInPanel =
    showCustomActionButtons && !!filteredCustomActionIconButtons.length;

  const currentLanguage = languageOptions?.find(
    option => option.displayName === language,
  );

  const shouldRenderLanguageSwitcher =
    language !== undefined &&
    languageOptions !== undefined &&
    languageOptions.length !== 0 &&
    onChange !== undefined &&
    !!currentLanguage;

  return (
    <div
      className={cx(getBasePanelStyle({ hasTitle, theme, className }))}
      data-lgid={lgids.panel}
      data-testid={lgids.panel}
      {...rest}
    >
      {hasTitle && (
        <Body
          data-lgid={lgids.title}
          data-testid={lgids.title}
          className={getPanelTitleStyles(theme)}
        >
          {title}
        </Body>
      )}

      <div className={panelLeftStyles}>
        {shouldRenderLanguageSwitcher && (
          <LanguageSwitcher
            onChange={onChange}
            language={currentLanguage}
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
