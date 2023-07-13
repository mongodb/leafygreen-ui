import { validateBuilds } from './builds';
import { validateDependencies } from './deps';
import { ValidateCommandOptions } from './validate.types';

export const validate = async (options: ValidateCommandOptions) => {
  Promise.all([validateBuilds(), validateDependencies(options)])
    .then(() => {
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
};
