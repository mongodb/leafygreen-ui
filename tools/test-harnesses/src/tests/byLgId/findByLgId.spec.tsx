import React, { useState } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { lgQueries } from '../../utils/getQueries';
const { findByLgId, getByLgId } = lgQueries;

const TestComponent = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (open) {
      setOpen(false);
      return;
    }

    setTimeout(() => {
      setOpen(true);
    }, 500);
  };

  return (
    <div>
      <button data-lgid="test-button" onClick={handleClick}>
        Toggle
      </button>
      {open && <div data-lgid="test-component">helllo</div>}
    </div>
  );
};

describe('findByLgId', () => {
  test('gets element with id', async () => {
    render(<div data-lgid="testing-id">Children</div>);

    const element = await findByLgId!('testing-id');
    expect(element).toBeInTheDocument();
  });

  test('throws error if the id does not exist', async () => {
    render(
      <>
        <div data-lgid="testing">Children</div>
      </>,
    );

    await expect(findByLgId!('incorrect-testing-id')).rejects.toThrow(
      'Unable to find an element by: [data-lgid="incorrect-testing-id"]',
    );
  });

  test('throws error if the id is found multiple times', async () => {
    render(
      <>
        <div data-lgid="testing-id">Children</div>
        <div data-lgid="testing-id">Children</div>
      </>,
    );

    await expect(findByLgId!('testing-id')).rejects.toThrow(
      'Found multiple elements by: [data-lgid="testing-id"]',
    );
  });

  test('gets element that opens with a delay', async () => {
    render(<TestComponent />);

    const button = getByLgId!('test-button');
    userEvent.click(button);
    const element = await findByLgId!('test-component');
    expect(element).toBeInTheDocument();
  });
});
