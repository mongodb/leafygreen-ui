import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import { range } from 'lodash';

import { css } from '@leafygreen-ui/emotion';

import useDynamicRefs from '../useDynamicRefs';

import { useAutoScroll } from './useAutoScroll';

const itemHeight = 25;

const TestComponent = ({ selected }: { selected?: number }) => {
  const data = range(10);
  const menuRef = useRef<HTMLUListElement>(null);
  const itemRefs = useDynamicRefs<HTMLLIElement>({ prefix: 'item' });

  useAutoScroll(itemRefs(`${selected}`), menuRef);

  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <ul
        ref={menuRef}
        data-testid={'menu'}
        className={css`
          position: relative;
          max-height: ${itemHeight * 4}px;
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
              height: ${itemHeight}px;
            `}
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
};

describe('packages/hooks/useAutoScroll', () => {
  test('scrolls to the selected element', async () => {
    const { getByTestId, rerender } = render(<TestComponent selected={0} />);
    const menu = getByTestId('menu');
    setTimeout(() => {
      expect(menu.scrollTop).toBe(0);
    }, 0);
    rerender(<TestComponent selected={5} />);
    setTimeout(() => {
      expect(menu.scrollTop).toBe(5);
    }, 0);
  });
});
