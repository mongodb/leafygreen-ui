import React, { ChangeEvent, useRef } from 'react';
import { render } from '@testing-library/react';
import { createSyntheticEvent, HTMLElementProps } from '..';
import userEvent from '@testing-library/user-event';

const MyInputComponent = ({ onChange }: HTMLElementProps<'input'>) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
