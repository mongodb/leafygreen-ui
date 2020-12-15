import React from 'react';
import { act, render } from '@testing-library/react';
import InteractionRing from '.';

describe('packages/interaction-ring', () => {
  test('`onFocus` and `onBlur` are not preserved', () => {
    const focusSpy = jest.fn();
    const blurSpy = jest.fn();

    render(
      <InteractionRing>
        <input id="input-id" type="text" onFocus={focusSpy} onBlur={blurSpy} />
      </InteractionRing>,
    );

    expect(focusSpy).not.toHaveBeenCalled();
    const input = document.querySelector('input');

    act(() => input.focus());
    expect(focusSpy).toHaveBeenCalledTimes(1);

    expect(blurSpy).not.toHaveBeenCalled();
    act(() => input.blur());
    expect(blurSpy).toHaveBeenCalledTimes(1);
  });
});
