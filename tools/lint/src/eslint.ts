import { ESLint } from 'eslint';
import path from 'path';

export const eslintConfigPath: string = path.resolve(
  __dirname,
  '../config/eslint.config.js',
);
export const rootDir = process.cwd();
export const esLintExtensions = ['ts', 'tsx'];
export const allFilePaths = `${rootDir}/**/*.{${esLintExtensions.join(',')}}`;

// Create an instance of ESLint with the configuration passed to the function
function createESLintInstance() {
  return new ESLint({
    overrideConfigFile: eslintConfigPath,
    fix: true,
  });
}

// Lint the specified files and return the results
async function lintAndFix(eslint: ESLint, filePaths: string) {
  const results = await eslint.lintFiles(filePaths);

  // Apply automatic fixes and output fixed code
  await ESLint.outputFixes(results);

  return results;
}

// Log results to console if there are any problems
function outputLintingResults(results: Array<ESLint.LintResult>) {
  // Identify the number of problems found
  const problems = results.reduce(
    (acc, result) => acc + result.errorCount + result.warningCount,
    0,
  );

  if (problems > 0) {
    console.log('Linting errors found!');
    console.log(results);
  } else {
    console.log('No linting errors found.');
  }

  return results;
}

// Put previous functions all together
async function eslint(filePaths: string = allFilePaths) {
  const eslint = createESLintInstance();
  const results = await lintAndFix(eslint, filePaths);
  return outputLintingResults(results);
}

export { eslint };
