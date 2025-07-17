import React, { useEffect, useMemo, useState } from 'react';

/**
 * Cycles through one or more React nodes at a fixed interval.
 *
 * @param input - Single React node or array of nodes to rotate through.
 * @param [interval=2000] - Time in milliseconds between rotations.
 * @returns The currently active React node based on the rotation interval.
 */
export const useRotatingItems = (
  input: React.ReactNode | Array<React.ReactNode>,
  interval = 2000,
) => {
  const items = useMemo(
    () => (Array.isArray(input) ? input : [input]),
    [input],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const timeout = setInterval(() => {
      setIndex(i => (i + 1) % items.length);
    }, interval);

    return () => clearInterval(timeout);
  }, [items, interval]);

  return items[index];
};
