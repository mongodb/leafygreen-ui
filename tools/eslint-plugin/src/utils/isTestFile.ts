/**
 * Returns whether the string is a spec, story or testutils file
 */
export const isTestFile = (filename: string): boolean => {
  const testFileRegex = /.+\.((spec)|(story)|(testutils))\.tsx?$/;
  const isTestFile = testFileRegex.test(filename);
  return isTestFile;
};
