import { LgIdString } from '@leafygreen-ui/lib';

export const DEFAULT_LGID_ROOT = 'lg-wizard';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  const ids = {
    step: `${root}-step`,
    footer: `${root}-footer`,
    footerPrimaryButton: `${root}-footer-primary_button`,
    footerBackButton: `${root}-footer-back_button`,
    footerCancelButton: `${root}-footer-cancel_button`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
