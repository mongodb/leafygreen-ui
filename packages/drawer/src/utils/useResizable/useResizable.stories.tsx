import React, { ElementType } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';
import { useResizable } from './useResizable';
import { palette } from '@leafygreen-ui/palette';

export default {
  title: 'hooks/useResizable/handleType',
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
  handleType: 'left' | 'right' | 'top' | 'bottom';
  containerStyles: React.CSSProperties;
  resizerBaseStyles: React.CSSProperties;
  label: string;
}

const HANDLE_CONFIGS: Record<string, HandleConfig> = {
  left: {
    handleType: 'left',
    containerStyles: {
      right: 0,
      top: 0,
    },
    resizerBaseStyles: {
      width: '2px',
      left: 0,
      top: 0,
    },
    label: 'Resizable from the left edge of the element',
  },
  right: {
    handleType: 'right',
    containerStyles: {
      left: 0,
      top: 0,
    },
    resizerBaseStyles: {
      width: '2px',
      right: 0,
      top: 0,
    },
    label: 'Resizable from the right edge of the element',
  },
  top: {
    handleType: 'top',
    containerStyles: {
      left: 0,
      bottom: 0,
    },
    resizerBaseStyles: {
      height: '2px',
      left: 0,
      top: 0,
    },
    label: 'Resizable from the top of the element',
  },
  bottom: {
    handleType: 'bottom',
    containerStyles: {
      left: 0,
      top: 0,
    },
    resizerBaseStyles: {
      height: '2px',
      left: 0,
      bottom: 0,
    },
    label: 'Resizable from the bottom edge of the element',
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

const createResizableStory = (
  handleType: 'left' | 'right' | 'top' | 'bottom',
) => {
  const config = HANDLE_CONFIGS[handleType];

  return () => {
    const { getResizerProps, size, resizableRef } = useResizable({
      enabled: true,
      initialSize: 300,
      minSize: 200,
      maxSize: 600,
      maxViewportPercentages: 50,
      handleType: config.handleType,
    });

    const resizerProps = getResizerProps();
    const configHandleType = config.handleType;
    const isVertical =
      configHandleType === 'left' || configHandleType === 'right';

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
              backgroundColor: palette.blue.light1,
              ...(isVertical ? { height: '100%' } : { width: '100%' }),
              ...(resizerProps.style || {}),
            }}
          />
          {config.label}
        </div>
      </Wrapper>
    );
  };
};

export const Left = createResizableStory('left');
export const Right = createResizableStory('right');
export const Top = createResizableStory('top');
export const Bottom = createResizableStory('bottom');
