import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-code_editor';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    editor: `${root}-editor`,
    content: `${root}-content`,
    panel: `${root}-panel`,
    panelTitle: `${root}-panel_title`,
    panelFormatButton: `${root}-panel_format_button`,
    panelCopyButton: `${root}-panel_copy_button`,
    panelSecondaryMenuButton: `${root}-panel_secondary_menu_button`,
    panelSecondaryMenu: `${root}-panel_secondary_menu`,
    copyButton: `${root}-copy_button`,
    loader: `${root}-loader`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
