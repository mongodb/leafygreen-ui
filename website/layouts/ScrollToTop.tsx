/* eslint-disable react/prop-types */
// ScrollToTop.jsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const ScrollToTop = props => {
  const router = useRouter();
  useEffect(() => {
    const handler = () => {
      window.scrollTo(0, 0);
    };
    router.events.on('routeChangeComplete', handler);
    return () => {
      router.events.off('routeChangeComplete', handler);
    };
  });

  return <>{props.children}</>;
};

export default ScrollToTop;
