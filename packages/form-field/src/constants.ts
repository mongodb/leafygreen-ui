const LGID_ROOT = 'lg-form_field';

export const LGIDS_FORM_FIELD = {
  root: LGID_ROOT,
  description: `${LGID_ROOT}-description`,
  errorMessage: `${LGID_ROOT}-error_message`,
  feedback: `${LGID_ROOT}-feedback`,
  input: `${LGID_ROOT}-input`,
  label: `${LGID_ROOT}-label`,
  optional: `${LGID_ROOT}-optional`,
  successMessage: `${LGID_ROOT}-success_message`,
} as const;

export const DEFAULT_MESSAGES = {
  error: 'This input needs your attention',
  success: 'Success',
} as const;
