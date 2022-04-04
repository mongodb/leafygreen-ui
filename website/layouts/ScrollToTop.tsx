// ScrollToTop.jsx
import React, { useEffect } from "react";
import { useRouter } from "next/router";

const ScrollToTop = (props) => {
  const { pathname } = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{props.children}</>
};

export default ScrollToTop;