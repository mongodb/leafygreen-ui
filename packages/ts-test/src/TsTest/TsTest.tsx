import React from 'react';
import PropTypes from 'prop-types';

import { TsTestProps } from './TsTest.types';

export function TsTest<T extends number>({
  value = 10 as T,
  options = [10, 20, 30] as Array<T>,
}: TsTestProps<T>) {
  return <div>your content here</div>;
}

TsTest.displayName = 'TsTest';
TsTest.propTypes = {
  value: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.number),
} as unknown;
