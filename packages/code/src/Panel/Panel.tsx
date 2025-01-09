import React from 'react';

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
import { PanelProps } from './Panel.types';
import { isComponentType } from '@leafygreen-ui/lib';
import { useCodeContext } from '../CodeContext/CodeContext';
import { LGIDs } from '../constants';

function Panel({
  language,
  languageOptions,
  onChange,
  onCopy,
  customActionButtons = [],
  showCustomActionButtons,
  title,
  className,
}: PanelProps) {
  const { theme } = useDarkMode();
  const { contents } = useCodeContext();

  const hasTitle = !title;

  const filteredCustomActionIconButtons = customActionButtons.filter(
    (item: React.ReactElement) => isComponentType(item, 'IconButton') === true,
  );

  const showCustomActionsInPanel =
    showCustomActionButtons && !!filteredCustomActionIconButtons.length;

  return (
    <div
      className={cx(getBasePanelStyle({ hasTitle, theme, className }))}
      data-testid={LGIDs.panel}
    >
      {title && <Body className={getPanelTitleStyles(theme)}>{title}</Body>}

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
          {showCustomActionsInPanel && (
            <>{customActionButtons?.map((action: React.ReactNode) => action)}</>
          )}
          <CopyButton onCopy={onCopy} contents={contents} />
        </div>
      </div>
    </div>
  );
}

Panel.displayName = 'Panel';

export default Panel;
