export const DEFAULT_LGID_ROOT = 'lg-password_input';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  const ids = {
    root,
    stateNotifications: `${root}-state_notifications`,
  } as const;
  return ids;
};

export type GetLgIdsReturnType = ReturnType<typeof getLgIds>;
