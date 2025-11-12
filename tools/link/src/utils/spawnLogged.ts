/* eslint-disable no-console */
import chalk from 'chalk';
import spawn from 'cross-spawn';

/**
 * Available colors for PID prefixes
 */
const COLORS = [
  chalk.cyan,
  chalk.green,
  chalk.yellow,
  chalk.blue,
  chalk.magenta,
  chalk.greenBright,
  chalk.yellowBright,
  chalk.blueBright,
  chalk.magentaBright,
  chalk.cyanBright,
] as const;

/**
 * Round-robin color index
 */
let colorIndex = 0;

/**
 * Get the next color in round-robin fashion
 */
function getNextColor(): (typeof COLORS)[number] {
  const color = COLORS[colorIndex];
  colorIndex = (colorIndex + 1) % COLORS.length;
  return color;
}

/**
 * Spawns a command and logs the output
 * @param command - The command to execute (e.g., 'pnpm', 'npm')
 * @param args - The command arguments
 * @param options - The options for the spawn command
 * @param options.name - The name of the command to prefix its output logs with. Defaults to launched process id.
 * @param options.verbose - Whether to pipe the command's stdout and stderr to the console.
 * @param options.cwd - The working directory where the command will run.
 * @param options.env - The environment variables to use for the spawned process (no other environment variables will be used).
 */
export async function spawnLogged(
  command: string,
  args: Array<string>,
  options: {
    /**
     * The name of the command to prefix the logs with
     */
    name?: string;
    /**
     * Whether to pipe the command's stdout and stderr to the console
     */
    verbose?: boolean;
    /**
     * The working directory where the command will run inside
     */
    cwd: string;
    /**
     * The environment variables to use for the spawned process
     */
    env?: NodeJS.ProcessEnv;
  },
): Promise<void> {
  const { name, verbose, cwd, env } = options;

  const child = spawn(command, args, {
    cwd,
    env,
  });

  const colorFn = getNextColor();
  const prefix = colorFn(name ? `[${name}]` : `[${child.pid}]`);

  const commandStr = [command, ...args].join(' ');
  console.log(
    `\n${prefix} ${chalk.dim('→')} ${chalk.dim(cwd)}\n` +
      `${prefix} ${chalk.cyan('$')} ${chalk.bold(commandStr)}\n`,
  );

  try {
    await new Promise<void>((resolve, reject) => {
      if (verbose) {
        // Pipe stdout with PID prefix
        child.stdout?.on('data', data => {
          const lines = data.toString().split('\n');
          lines.forEach((line: string) => {
            console.log(`${prefix} ${chalk.dim(line)}`);
          });
        });

        // Pipe stderr with PID prefix
        child.stderr?.on('data', data => {
          const lines = data.toString().split('\n');
          lines.forEach((line: string) => {
            console.error(`${prefix} ${chalk.reset(line)}`);
          });
        });
      }

      child.on('close', resolve);
      child.on('error', reject);
    });

    if (child.exitCode) {
      throw new Error(`Command failed with exit code ${child.exitCode}`);
    }
  } finally {
    if (child.exitCode) {
      console.log(
        `${prefix} ${chalk.dim('→')} ${chalk.red(
          `finished with exit code ${child.exitCode}`,
        )}\n`,
      );
    } else {
      console.log(
        `${prefix} ${chalk.dim('→')} ${chalk.dim('finished successfully')}\n`,
      );
    }
  }
}
