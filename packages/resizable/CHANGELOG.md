# @leafygreen-ui/resizable

## 0.1.3

### Patch Changes

- 3471b94: Update React ref objects to be explicitly nullable
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/emotion@5.0.3

## 0.1.2

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/palette@5.0.2

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
