# @leafygreen-ui/resizable

## 0.1.1

### Patch Changes

- b76683d: Initial release of the `@leafygreen-ui/resizable` package, which provides a hook for creating resizable elements.

  ```tsx
  import { useResizable, Position } from '@leafygreen-ui/resizable';

  const MyComponent = () => {
    const { getResizerProps, size, resizableRef } = useResizable({
      enabled: true,
      initialSize: 300,
      minSize: 200,
      maxSize: 600,
      position: Position.Right,
      onResize: newSize => {
        console.log('New size:', newSize);
      },
    });

    return (
      <div ref={resizableRef} style={{ width: size, height: '100%' }}>
        {/* Your content here */}
        <div {...getResizerProps()} />
      </div>
    );
  };
  ```
