import { act as ReactDOMAct } from 'react-dom/test-utils';
import * as RTL from '@testing-library/react';

export const renderHook =
  RTL.renderHook ??
  (() => {
    const RTLH = require('@testing-library/react-hooks');
    return RTLH.renderHook;
  })();

export const act: typeof ReactDOMAct =
  RTL.act ??
  (() => {
    const RTLH = require('@testing-library/react-hooks');
    return RTLH.act;
  })();
