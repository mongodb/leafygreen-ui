/** Helper type to check if element is a specific React Component  */
export function isComponentType<T = React.ReactElement>(
  element: React.ReactNode,
  displayName: string,
): element is T {
  return (
    element != null &&
    typeof element === 'object' &&
    'type' in element &&
    (element.type as any).displayName === displayName
  );
}
