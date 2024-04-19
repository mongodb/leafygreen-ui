const LGID_ROOT = 'lg-form_field';

export const LGIDS_FORM_FIELD = {
  root: LGID_ROOT,
  errorMessage: `${LGID_ROOT}-error_message`,
  feedback: `${LGID_ROOT}-feedback`,
  successMessage: `${LGID_ROOT}-success_message`,
  optional: `${LGID_ROOT}-optional`,
} as const;

export const DEFAULT_MESSAGES = {
  error: 'This input needs your attention',
  success: 'Success',
} as const;
