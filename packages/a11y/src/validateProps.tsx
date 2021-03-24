// Validate that either aria-label or aria-labelledby are present within props.
export function validateAriaLabelProps(
  props: Record<string, any>,
  componentName: string,
): void {
  if (!props['aria-label'] && !props['aria-labelledby']) {
    console.error(
      `For screen-reader accessibility, aria-label or aria-labelledby must be provided${
        componentName ? ` to ${componentName}` : ''
      }.`,
    );
  }
}

// Validate that either label or aria-labelledby are present within props.
export function validateLabelProps(
  props: Record<string, any>,
  componentName: string,
): void {
  if (!props['label'] && !props['aria-labelledby']) {
    console.error(
      `For screen-reader accessibility, label or aria-labelledby must be provided${
        componentName ? ` to ${componentName}` : ''
      }.`,
    );
  }
}
