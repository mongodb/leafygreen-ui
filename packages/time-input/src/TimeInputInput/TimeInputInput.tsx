import React, { useRef } from 'react';

import { getBaseStyles } from './TimeInputInput.styles';

/**
 * @internal
 */
export const TimeInputInput = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef} className={getBaseStyles()}>
      {/* TODO: Input segments go here */}
    </div>
  );
};

TimeInputInput.displayName = 'TimeInputInput';
