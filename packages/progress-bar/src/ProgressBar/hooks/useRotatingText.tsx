import React, { useEffect, useMemo, useState } from 'react';

export function useRotatingText(
  textInput: React.ReactNode | Array<React.ReactNode>,
  interval = 2000,
) {
  const texts = useMemo(
    () => (Array.isArray(textInput) ? textInput : [textInput]),
    [textInput],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;

    const timeout = setInterval(() => {
      setIndex(i => (i + 1) % texts.length);
    }, interval);

    return () => clearInterval(timeout);
  }, [texts, interval]);

  return texts[index];
}
