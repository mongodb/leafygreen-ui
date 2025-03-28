export const DEFAULT_LGID_ROOT = 'lg-confirmation_modal';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    input: `${DEFAULT_LGID_ROOT}-confirmation_input`,
    title: `${DEFAULT_LGID_ROOT}-title`,
    confirm: `${DEFAULT_LGID_ROOT}-footer-confirm_button`,
    cancel: `${DEFAULT_LGID_ROOT}-footer-cancel_button`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
