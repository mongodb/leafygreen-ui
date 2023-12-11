import React, {
  CSSProperties,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import { transitionDuration } from '@leafygreen-ui/tokens';

import { AnimateHeightProps } from './AnimateHeight.types';

const AnimateHeight = forwardRef<HTMLDivElement, AnimateHeightProps>(
  ({ children, isVisible, enabled = true, ...rest }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const contentHeight = useRef<number>(0);
    const prevIsVisible = useRef<boolean>(!!isVisible);
    const [componentStyle, setComponentStyle] = useState<CSSProperties>();

    useEffect(() => {
      if (contentRef.current) {
        contentHeight.current = contentRef?.current.offsetHeight;
      }
    }, []);

    useEffect(() => {
      if (isVisible !== prevIsVisible.current) {
        setComponentStyle({
          height: isVisible ? `${contentHeight.current}px` : 0,
        });
        prevIsVisible.current = !!isVisible;
      }
    }, [isVisible]);

    return (
      <div
        {...rest}
        aria-hidden={!isVisible}
        style={{
          transition: enabled
            ? `${transitionDuration.slower}ms height ease-in-out`
            : '',
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
