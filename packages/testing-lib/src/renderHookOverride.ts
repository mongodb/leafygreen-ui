import * as RTL from '@testing-library/react';

export const renderHook =
  RTL.renderHook ??
  (() => {
    const RTLH = require('@testing-library/react-hooks');
    return RTLH.renderHook;
  })();
