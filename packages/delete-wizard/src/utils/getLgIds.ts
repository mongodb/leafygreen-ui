import { LgIdString } from '@leafygreen-ui/lib';
import { getLgIds as getWizardLgIds } from '@leafygreen-ui/wizard';

export const DEFAULT_LGID_ROOT = 'lg-delete_wizard';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  const wizardRoot: LgIdString = `${root}-wizard`;
  const wizardLgIds = getWizardLgIds(wizardRoot);
  const ids = {
    root,
    header: `${root}-header`,
    wizard: wizardRoot,
    ...wizardLgIds,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
