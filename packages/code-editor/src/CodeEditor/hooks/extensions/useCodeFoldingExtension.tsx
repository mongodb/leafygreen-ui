import React from 'react';
import { renderToString } from 'react-dom/server';
import { type EditorView } from '@codemirror/view';

import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';

import { useExtension } from './useExtension';

export function useCodeFoldingExtension(
  view: EditorView | null,
  enable: boolean,
  module?: typeof import('@codemirror/language'),
) {
  return useExtension(
    view || null,
    {
      enable,
      module,
    },
    ({ enable, module }) => {
      if (!enable || !module || !module.foldGutter) {
        return [];
      }

      return module.foldGutter({
        markerDOM: (open: boolean) => {
          const icon = document.createElement('span');
          icon.className = 'cm-custom-fold-marker';
          icon.innerHTML = renderToString(
            open ? (
              <Icon
                glyph="ChevronDown"
                size="small"
                className={css`
                  margin-top: 2px;
                `}
              />
            ) : (
              <Icon
                glyph="ChevronRight"
                size="small"
                className={css`
                  margin-top: 2px;
                `}
              />
            ),
          );
          return icon;
        },
      });
    },
  );
}
