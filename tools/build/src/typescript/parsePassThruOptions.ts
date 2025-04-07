/**
 * Parses cli arguments passed to the build command
 * into an object that can be used in the build process
 */
export function parsePassThruOptions(
  passThru?: Array<string>,
): Record<string, string | boolean> | undefined {
  return passThru?.reduce((acc, arg) => {
    const [_key, value] = arg.split('=');
    const key = _key.replace(/^-+/, '');

    if (value) {
      acc[key] = value;
    } else {
      acc[key] = true;
    }

    return acc;
  }, {} as Record<string, string | boolean>);
}
