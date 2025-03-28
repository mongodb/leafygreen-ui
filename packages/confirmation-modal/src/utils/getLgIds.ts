export const DEFAULT_LGID_ROOT = 'lg-confirmation_modal';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    input: `${root}-confirmation_input`,
    title: `${root}-title`,
    confirm: `${root}-footer-confirm_button`,
    cancel: `${root}-footer-cancel_button`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
