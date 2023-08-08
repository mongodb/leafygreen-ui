import { ComponentUpdateObject, SortedUpdates } from '../release-bot.types';

import { getChangeType } from './getChangeType';
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

  for (const componentUpdate of updates) {
    const { majorUpdates, minorUpdates, patchUpdates } = await parseChangeLog(
      componentUpdate,
    );

    const updateType = getChangeType(componentUpdate);

    switch (updateType) {
      case 'major': {
        sortedUpdates.major.push({ ...componentUpdate, updates: majorUpdates });
        break;
      }

      case 'minor': {
        sortedUpdates.minor.push({ ...componentUpdate, updates: minorUpdates });
        break;
      }

      case 'patch':
      default: {
        if (!patchUpdates?.[0].includes('Updated dependencies')) {
          sortedUpdates.patch.push(componentUpdate);
        } else {
          sortedUpdates.dependency.push(componentUpdate);
        }
      }
    }
  }

  return sortedUpdates;
};
