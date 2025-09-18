import React, { ChangeEvent, useRef } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createSyntheticEvent } from '..';

const MyInputComponent = ({
  onChange,
}: React.ComponentPropsWithoutRef<'input'>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    const nativeEvent = new Event('change', { bubbles: true });
    const synthEvent = createSyntheticEvent(nativeEvent, inputRef.current!);
    onChange?.(synthEvent as ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <input ref={inputRef} data-testid="input" onChange={onChange} />
      <button data-testid="button" onClick={handleClick} />
    </>
  );
};

describe('packages/lib/createSyntheticEvent', () => {
  test('Creates a SyntheticEvent', () => {
    const changeHandler = jest.fn();
    const { getByTestId } = render(
      <MyInputComponent onChange={changeHandler} />,
    );
    const buttonEl = getByTestId('button');
    userEvent.click(buttonEl);
    expect(changeHandler).toHaveBeenCalled();
  });
});
