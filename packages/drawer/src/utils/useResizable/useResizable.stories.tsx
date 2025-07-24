import React, { ElementType } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { useResizable } from './useResizable';
import { Position } from './useResizable.types';

export default {
  title: 'hooks/useResizable/position',
  parameters: {
    default: null,
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies StoryMetaType<ElementType<unknown>>;

interface WrapperProps {
  children: React.ReactNode;
}

interface HandleConfig {
  containerStyles: React.CSSProperties;
  resizerBaseStyles: React.CSSProperties;
}

const HANDLE_CONFIGS: Record<string, HandleConfig> = {
  right: {
    containerStyles: {
      right: 0,
      top: 0,
    },
    resizerBaseStyles: {
      left: 0,
      top: 0,
    },
  },
  left: {
    containerStyles: {
      left: 0,
      top: 0,
    },
    resizerBaseStyles: {
      right: 0,
      top: 0,
    },
  },
  bottom: {
    containerStyles: {
      left: 0,
      bottom: 0,
    },
    resizerBaseStyles: {
      left: 0,
      top: 0,
    },
  },
  top: {
    containerStyles: {
      left: 0,
      top: 0,
    },
    resizerBaseStyles: {
      left: 0,
      bottom: 0,
    },
  },
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        margin: '-100px',
      }}
    >
      {children}
    </div>
  );
};

const createResizableStory = (position: Position) => {
  const config = HANDLE_CONFIGS[position];

  return () => {
    const { getResizerProps, size, resizableRef } = useResizable({
      enabled: true,
      initialSize: 300,
      minSize: 200,
      maxSize: 600,
      maxViewportPercentages: 50,
      position,
    });

    const resizerProps = getResizerProps();
    const isVertical = position === 'left' || position === 'right';

    const containerStyles = {
      ...config.containerStyles,
      [isVertical ? 'width' : 'height']: size,
      ...(isVertical ? { height: '100%' } : { width: '100vw' }),
      backgroundColor: 'lightgray',
      position: 'absolute' as const,
    };

    return (
      <Wrapper>
        <div ref={resizableRef} style={containerStyles}>
          <div
            {...resizerProps}
            style={{
              position: 'absolute',
              ...config.resizerBaseStyles,
            }}
            className={resizerProps?.className}
          />
          Resizable element is on the {position}
        </div>
      </Wrapper>
    );
  };
};

export const Left = createResizableStory(Position.Left);
export const Right = createResizableStory(Position.Right);
export const Top = createResizableStory(Position.Top);
export const Bottom = createResizableStory(Position.Bottom);
