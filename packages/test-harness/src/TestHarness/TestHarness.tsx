import React from 'react';
import { TestHarnessProps } from './TestHarness.types';

// TODO: forwardRef
export function TestHarness({}: TestHarnessProps) {
  return <div>your content here</div>;
}

TestHarness.displayName = 'TestHarness';
