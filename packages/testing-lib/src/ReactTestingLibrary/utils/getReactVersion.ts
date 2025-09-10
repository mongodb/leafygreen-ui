import React from 'react';

export const getReactVersion = () => {
  return parseInt(React.version.split('.')[0], 10);
};
