import React, { ElementType } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { useResizable } from './useResizable';
import { Position } from './useResizable.types';

export default {
  title: 'internal/hooks/useResizable/position',
  parameters: {
    default: null,
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      exclude: ['position'],
    },
  },
} satisfies StoryMetaType<ElementType<unknown>>;

interface HandleConfig {
  containerStyles: React.CSSProperties;
  resizerBaseStyles: React.CSSProperties;
}

const POSITION_CONFIGS: Record<string, HandleConfig> = {
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

const CreateResizableStory: StoryFn<any> = args => {
  const { position } = args;
  const config = POSITION_CONFIGS[position];
  const { getResizerProps, size, resizableRef } = useResizable({
    enabled: true,
    initialSize: 300,
    minSize: 200,
    maxSize: 600,
    position,
  });

  const resizerProps = getResizerProps();
  const isVertical = position === Position.Left || position === Position.Right;

  const containerStyles = {
    ...config.containerStyles,
    [isVertical ? 'width' : 'height']: size,
    ...(isVertical
      ? { height: '100%', maxWidth: '50vw' }
      : { width: '100vw', maxHeight: '50vh' }),
    backgroundColor: 'lightgray',
    position: 'absolute' as const,
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        margin: '-100px',
      }}
    >
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
    </div>
  );
};

export const Left: StoryObj<any> = {
  render: CreateResizableStory,
  args: {
    position: Position.Left,
  },
};

export const Right: StoryObj<any> = {
  render: CreateResizableStory,
  args: {
    position: Position.Right,
  },
};

export const Top: StoryObj<any> = {
  render: CreateResizableStory,
  args: {
    position: Position.Top,
  },
};

export const Bottom: StoryObj<any> = {
  render: CreateResizableStory,
  args: {
    position: Position.Bottom,
  },
};
