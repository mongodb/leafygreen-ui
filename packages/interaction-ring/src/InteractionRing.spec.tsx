import React from 'react';
import { act, render } from '@testing-library/react';

import InteractionRing from '.';

describe('packages/interaction-ring', () => {
  test('`onFocus` and `onBlur` are preserved', () => {
    const focusSpy = jest.fn();
    const blurSpy = jest.fn();

    render(
      <InteractionRing>
        <input type="text" onFocus={focusSpy} onBlur={blurSpy} />
      </InteractionRing>,
    );

    const input = document.querySelector('input');

    expect(focusSpy).not.toHaveBeenCalled();
    act(() => input!.focus());
    expect(focusSpy).toHaveBeenCalledTimes(1);

    expect(blurSpy).not.toHaveBeenCalled();
    act(() => input!.blur());
    expect(blurSpy).toHaveBeenCalledTimes(1);
  });
});
