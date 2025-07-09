import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-form_footer';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    backButton: `${root}-back_button`,
    backButtonIcon: `${root}-back_button-icon`,
    backSplitButton: `${root}-back_split_button`,
    cancelButton: `${root}-cancel_button`,
    cancelSplitButton: `${root}-cancel_split_button`,
    primaryButton: `${root}-primary_button`,
    primarySplitButton: `${root}-primary_button`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
