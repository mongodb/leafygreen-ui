/* eslint-disable no-console */
import { validateBuilds } from './builds';
import { validateDependencies } from './dependencies';
import { ValidateCommandOptions } from './validate.types';

// TODO: Check more than just `packages`
export const validate = async (options: ValidateCommandOptions) => {
  const validators: Array<Promise<void>> = [];

  if (!options.buildsOnly) {
    validators.push(validateDependencies(options));
  }

  if (!options.depsOnly) {
    validators.push(validateBuilds(options));
  }

  Promise.all(validators)
    .then(() => {
      options.verbose && console.log('All validations passed. ✅');
      process.exit(0);
    })
    .catch(err => {
      console.log('❌ Some validation failed.');
      console.error(err);
      process.exit(1);
    });
};
