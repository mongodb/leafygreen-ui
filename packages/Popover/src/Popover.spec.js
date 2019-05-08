import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Popover from './Popover';

afterAll(cleanup);

describe('packages/Popover', () => {
  const triggerRef = React.createRef();
  const { container, unmount } = render(
    <>
      <button ref={triggerRef}>Trigger Element</button>
      <Popover justify="start" align="top" active refEl={triggerRef}>
        Content to appear inside of Popover component
      </Popover>
    </>,
  );

  test('Should show popover when trigger is clicked', () => {
    expect(document.body.children[1].firstChild.innerHTML).toBe(
      'Content to appear inside of Popover component',
    );
  });

  test('Renders children inside of a portaled component', () => {
    expect(
      container.innerHTML.includes('<button>Trigger Element</button>'),
    ).toBe(true);

    expect(
      container.innerHTML.includes(
        'Content to appear inside of Popover component',
      ),
    ).toBe(false);
  });

  test('Does not render children when active is false', () => {
    const wrapper = render(
      <>
        <button ref={triggerRef}>Trigger Element</button>
        <Popover justify="start" align="top" refEl={triggerRef}>
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

  test('Does not Portal Popover component, when usePortal is false', () => {
    const { container } = render(
      <>
        <button ref={triggerRef}>Trigger Element</button>
        <Popover
          active
          usePortal={false}
          justify="start"
          align="top"
          refEl={triggerRef}
        >
          Popover in DOM
        </Popover>
      </>,
    );

    expect(container.innerHTML.includes('Popover in DOM')).toBe(true);
  });

  test('Removes Popover instance on unmount', () => {
    unmount();
    expect(container.innerHTML).toBe('');
  });
});
