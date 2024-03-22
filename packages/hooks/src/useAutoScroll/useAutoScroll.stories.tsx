import React, { useRef } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import range from 'lodash/range';

import { css } from '@leafygreen-ui/emotion';

import { useAutoScroll, useDynamicRefs } from '..';

import { testItemHeight } from './constants.test';

const testItems = 16;

const meta: StoryMetaType<any> = {
  title: 'hooks/useAutoScroll',
  component: undefined,
  argTypes: {
    selected: {
      type: 'number',
      min: 0,
      max: testItems - 1,
    },
  },
  parameters: {
    default: 'Basic',
    controls: { exclude: ['as', 'darkMode'] },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

export const Basic = ({ selected }: { selected?: number }) => {
  const data = range(testItems);
  const menuRef = useRef<HTMLUListElement>(null);
  const itemRefs = useDynamicRefs<HTMLLIElement>({ prefix: 'item' });

  useAutoScroll(itemRefs(`${selected}`), menuRef);

  return (
    <div
      className={css`
        position: relative;
        width: 100px;
      `}
    >
      <ul
        ref={menuRef}
        data-testid={'menu'}
        className={css`
          position: relative;
          max-height: ${testItemHeight * 4}px;
          overflow: auto;
        `}
      >
        {data.map(x => (
          <li
            key={x}
            ref={itemRefs(`${x}`)}
            data-testid={`item-${x}`}
            className={css`
              position: relative;
              height: ${testItemHeight}px;
              color: ${x === selected ? 'red' : 'inherit'};
            `}
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
};
