import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Popover, { Align, Justify } from './Popover';
import { calculatePosition, getElementPosition } from './positionUtils';

afterAll(cleanup);

describe('packages/Popover', () => {
  const { container, unmount } = render(
    <>
      <button>Trigger Element</button>
      <Popover justify={Justify.Start} align={Align.Top} active>
        Content to appear inside of Popover component
      </Popover>
    </>,
  );

  test('should show popover when trigger is clicked', () => {
    // eslint-disbale
    expect(document.body.children[1].firstChild.innerHTML).toBe(
      'Content to appear inside of Popover component',
    );
  });

  test('renders children inside of a portaled component', () => {
    expect(
      container.innerHTML.includes('<button>Trigger Element</button>'),
    ).toBe(true);

    expect(
      container.innerHTML.includes(
        'Content to appear inside of Popover component',
      ),
    ).toBe(false);
  });

  test('does not render children when active is false', () => {
    const wrapper = render(
      <>
        <button>Trigger Element</button>
        <Popover justify={Justify.Start} align={Align.Top}>
          Content to appear inside of Popover component
        </Popover>
      </>,
    );

    expect(
      wrapper.container.innerHTML.includes(
        'Content to appear inside of Popover component',
      ),
    ).toBe(false);
  });

  test('does not Portal Popover component, when usePortal is false', () => {
    const { container } = render(
      <>
        <button>Trigger Element</button>
        <Popover
          active
          usePortal={false}
          justify={Justify.Start}
          align={Align.Top}
        >
          Popover in DOM
        </Popover>
      </>,
    );

    expect(container.innerHTML.includes('Popover in DOM')).toBe(true);
  });

  test('removes Popover instance on unmount', () => {
    unmount();
    expect(container.innerHTML).toBe('');
  });

  describe('unit tests', () => {
    test('calculatePosition returns an object with expected values', () => {
      const pos = calculatePosition({
        useRelativePositioning: false,
        spacing: 10,
        align: Align.Bottom,
        justify: Justify.Start,
        referenceElPos: {
          bottom: 303.3948802947998,
          height: 19,
          left: 329.4034118652344,
          right: 387.8693199157715,
          top: 284.78692626953125,
          width: 59,
        },
        contentElPos: {
          bottom: 48.8636360168457,
          height: 61,
          left: 0,
          right: 123.21591186523438,
          top: 0,
          width: 154,
        },
      });

      expect(pos.top).toBe(313.78692626953125);
      expect(pos.left).toBe(329.4034118652344);
      expect(pos.transformOrigin).toBe('left top');
      expect(pos.transform).toBe('translate3d(0, -10px, 0) scale(0.8)');
    });

    test('getElementPosition returns an object with expected values', () => {
      const el = document.createElement('div');
      document.body.appendChild(el);

      const refPos = getElementPosition(el);
      expect(refPos.top).toBe(0);
      expect(refPos.bottom).toBe(0);
      expect(refPos.left).toBe(0);
      expect(refPos.right).toBe(0);
      expect(refPos.height).toBe(0);
      expect(refPos.width).toBe(0);
    });
  });
});
