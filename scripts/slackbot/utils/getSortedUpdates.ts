import { ComponentUpdateObject, SortedUpdates } from '../slackbot.types';

import { parseChangeLog } from './parseChangeLog';

export const getSortedUpdates = async (
  updates: Array<ComponentUpdateObject>,
): Promise<SortedUpdates> => {
  const sortedUpdates: SortedUpdates = {
    major: [],
    minor: [],
    patch: [],
    dependency: [],
  };

  for (const component of updates) {
    const { majorUpdates, minorUpdates, patchUpdates } = await parseChangeLog(
      component,
    );

    if (majorUpdates)
      sortedUpdates.major.push({ ...component, updates: majorUpdates });
    else if (minorUpdates)
      sortedUpdates.minor.push({ ...component, updates: minorUpdates });
    else if (patchUpdates) {
      if (!patchUpdates[0].includes('Updated dependencies')) {
        sortedUpdates.patch.push(component);
      } else {
        sortedUpdates.dependency.push(component);
      }
    }
  }

  return sortedUpdates;
};
