export const DEFAULT_LGID_ROOT = 'lg-select';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    errorMessage: `${root}-error_message`,
    popover: `${root}-popover`,
    trigger: `${root}-trigger`,
    buttonText: `${root}-button_text`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
