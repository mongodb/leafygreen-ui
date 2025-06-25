import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-form_field';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    contentEnd: `${root}-content_end`,
    description: `${root}-description`,
    errorMessage: `${root}-error_message`,
    feedback: `${root}-feedback`,
    input: `${root}-input`,
    label: `${root}-label`,
    optional: `${root}-optional`,
    successMessage: `${root}-success_message`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
