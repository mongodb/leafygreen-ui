import React, {
  CSSProperties,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import { transitionDuration } from '@leafygreen-ui/tokens';

const AnimateHeight = forwardRef<HTMLDivElement, any>(
  ({ children, isVisible, ...rest }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const contentHeight = useRef<number>(0);
    const prevIsVisible = useRef<boolean>(isVisible);
    const [componentStyle, setComponentStyle] = useState<CSSProperties>();

    useEffect(() => {
      if (contentRef.current) {
        contentHeight.current = contentRef?.current.offsetHeight;
      }
    }, []);

    useEffect(() => {
      if (isVisible !== prevIsVisible) {
        setComponentStyle({
          height: isVisible ? `${contentHeight.current}px` : 0,
        });
        prevIsVisible.current = isVisible;
      }
    }, [isVisible]);

    return (
      <div
        {...rest}
        aria-hidden={!isVisible}
        style={{
          transition: `${transitionDuration.slower}ms height ease-in-out`,
          ...componentStyle,
        }}
        ref={ref}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    );
  },
);

AnimateHeight.displayName = 'AnimateHeight';

export default AnimateHeight;
