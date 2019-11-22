import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import IconButton from './IconButton';

afterAll(cleanup);

describe('packages/icon-button', () => {
  const onClick = jest.fn();
  const className = 'test-icon-button-class';
  const testId = 'test-icon-button-component';
  const icon = (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      data-testid="icon-test-id"
    >
      <title>Ellipsis</title>
      <g
        id="Ellipsis-Copy"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M2,6.5 C2.828125,6.5 3.5,7.171875 3.5,8 C3.5,8.828125 2.828125,9.5 2,9.5 C1.171875,9.5 0.5,8.828125 0.5,8 C0.5,7.171875 1.171875,6.5 2,6.5 Z M8,6.5 C8.828125,6.5 9.5,7.171875 9.5,8 C9.5,8.828125 8.828125,9.5 8,9.5 C7.171875,9.5 6.5,8.828125 6.5,8 C6.5,7.171875 7.171875,6.5 8,6.5 Z M14,6.5 C14.828125,6.5 15.5,7.171875 15.5,8 C15.5,8.828125 14.828125,9.5 14,9.5 C13.171875,9.5 12.5,8.828125 12.5,8 C12.5,7.171875 13.171875,6.5 14,6.5 Z"
          id=""
          fill="#000000"
        ></path>
      </g>
    </svg>
  );

  const { getByTestId, getAllByTestId } = render(
    <IconButton
      className={className}
      onClick={onClick}
      data-testid={testId}
      ariaLabel="Ellipsis"
    >
      {icon}
    </IconButton>,
  );

  const iconButton = getByTestId(testId);

  test(`renders ${className} in the classList`, () => {
    expect(iconButton.classList.contains(className)).toBe(true);
  });

  test(`renders icon as button content`, () => {
    const renderedIcon = getAllByTestId('icon-test-id')[0];
    expect(iconButton.contains(renderedIcon)).toBe(true);
  });

  test('fires the onClick handler once when clicked', () => {
    fireEvent.click(iconButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders inside a button tag by default', () => {
    expect(iconButton.tagName.toLocaleLowerCase()).toBe('button');
  });

  describe('when href prop is supplied', () => {
    const testId = 'test-icon-button-component-with-href';

    const { getByTestId } = render(
      <IconButton
        data-testid={testId}
        href="mongodb.design"
        ariaLabel="Ellipsis"
      >
        {icon}
      </IconButton>,
    );

    const iconButton = getByTestId(testId);

    test('renders inside an a tag when href prop is supplied', () => {
      expect(iconButton.tagName.toLowerCase()).toBe('a');
    });
  });
});
