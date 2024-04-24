/* eslint-disable react/jsx-key */
import {
  CombinedArgs,
  createDynamicStories,
  DynamicStoryConfig,
} from '@lg-tools/storybook-utils';

import { Variant } from '.';

export default {
  // Define the imports & default exports
  // TODO: We could consider formatting this differently
  // (since it's all custom & defined in `DynamicStoryConfig`)
  baseCsf: `
import Badge from ".";
export default { 
  title: 'Components/Badge/Indexed',
  component: Badge,
  args: { children: 'Badge' },
  tags: ['autodocs'] 
};
  `,
  // Use `createDynamicStories` to generate the dynamic stories
  stories: () => {
    const combinations = createDynamicStories({
      darkMode: [false, true],
      variant: Object.values(Variant),
    } satisfies CombinedArgs);

    return combinations;
  },
} satisfies DynamicStoryConfig;
