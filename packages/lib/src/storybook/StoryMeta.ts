import { mergeWith } from 'lodash';

import { StoryMetaType } from './StoryMeta.types';

/**
 *
 * Storybook 7.x requires a statically defined object as the default export.
 *
 * Use {@link StoryMetaType} (and {@link baseStoryMeta} as necessary)
 *
 * Example:
 *
 * ```ts
 * const meta: StoryMetaType<typeof Component> = {
 *  component: Component,
 *  ...baseStoryMeta
 * }
 * export default meta
 * ```
 *
 *
 * @deprecated
 */
export const StoryMeta = <
  T extends React.ElementType,
  XP extends Record<string, any>,
>(
  meta: StoryMetaType<T, XP> = {} as StoryMetaType<T, XP>,
): StoryMetaType<T, XP> => {
  return mergeWith(meta, {}, (metaVal, baseVal) => {
    if (Array.isArray(metaVal)) return metaVal.concat(baseVal);
    if (typeof metaVal === 'string') return metaVal;
    // default to _.merge behavior
    return;
  });
};
