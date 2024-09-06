import { useEffect, useState } from 'react';

export default function useSsrCheck() {
  const [isSsr, setIsSsr] = useState(typeof window === 'undefined');

  useEffect(() => {
    // When rendered on server, this won't run until we're on the client. Therefore,
    // isSsr should be true when server rendered, and only be set to false on subsequent client render.
    // When rendered directly on the client, isSsr should already be false, so
    // this update shouldn't trigger a re-render.
    setIsSsr(false);
  }, []);

  return isSsr;
}
