/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { MergePromptsOptions } from './mergePromptsVSCode.types';

const vscodeSettingsPaths = {
  root: path.resolve('.vscode/settings.json'),
  promptKit: path.resolve(
    './node_modules/@lg-tools/prompt-kit/src/settings/vscode/settings.json',
  ),
} as const;

export async function mergePromptsVSCode(options: MergePromptsOptions) {
  const { dry, verbose } = options;

  verbose &&
    console.log({
      rootVscodeSettingsPath: vscodeSettingsPaths.root,
      promptKitVscodeSettingsPath: vscodeSettingsPaths.promptKit,
    });

  try {
    // Read and parse existing .vscode/settings.json (create if it doesn't exist)
    const rootSettingsExists = await fse.pathExists(vscodeSettingsPaths.root);

    verbose &&
      console.log(
        `\nExisting VS Code settings ${rootSettingsExists ? '' : 'not '}found`,
      );

    const existingVscodeSettings = rootSettingsExists
      ? await fse.readJSON(vscodeSettingsPaths.root)
      : {};

    verbose &&
      console.log(
        '\nExisting VS Code settings:\n',
        JSON.stringify(existingVscodeSettings, null, 2),
      );

    // Read and parse the settings.json to merge
    const settingsToMerge = await fse.readJSON(vscodeSettingsPaths.promptKit);

    verbose &&
      console.log(
        '\nVS Code settings to merge:\n',
        JSON.stringify(settingsToMerge, null, 2),
      );

    // Merge the objects
    const mergedSettings = {
      ...existingVscodeSettings,
      ...settingsToMerge,
    };

    verbose &&
      console.log(
        '\nFinal VS Code settings:\n',
        JSON.stringify(mergedSettings, null, 2),
      );

    if (dry) {
      console.log(
        chalk.blue('\nDry run. Final `.vscode/settings.json` would be:'),
      );
      console.log(chalk.blue(JSON.stringify(mergedSettings, null, 2)));
    } else {
      // Write the merged object back to .vscode/settings.json
      await fse.outputJSON(vscodeSettingsPaths.root, mergedSettings, {
        spaces: 2,
      });
      console.log(
        chalk.green('\n✅ Prompts successfully merged into VS Code settings!'),
      );
    }
  } catch (error) {
    console.error(chalk.red('\nError merging prompts:', error));
  }
}
