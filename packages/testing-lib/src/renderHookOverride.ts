const rtl = require('@testing-library/react');

export const renderHook =
  rtl.renderHook ??
  (() => {
    const rtlh = require('@testing-library/react-hooks');
    return rtlh.renderHook;
  })();
