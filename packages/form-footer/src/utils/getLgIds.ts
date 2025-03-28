export const DEFAULT_LGID_ROOT = 'lg-form_footer';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    backButton: `${root}-back_button`,
    backButtonIcon: `${root}-back_button-icon`,
    cancelButton: `${root}-cancel_button`,
    primaryButton: `${root}-primary_button`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
