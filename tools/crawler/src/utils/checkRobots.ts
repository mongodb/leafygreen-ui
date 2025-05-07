/* eslint-disable no-console */

import chalk from 'chalk';

// Keep track of the visited URLs' robots.txt contents
const RobotsRawCache = new Map<string, string>();

// Keep track of the allowed paths for each hostname
const RobotsAllowCache = new Map<string, Map<string, boolean>>();

export const checkRobots = async (
  hostname: string,
  pathname: string,
  verbose?: boolean,
): Promise<boolean> => {
  // Check if the robots.txt for this hostname has already been fetched
  if (RobotsRawCache.has(hostname)) {
    const robots = RobotsRawCache.get(hostname) as string;
    const isAllowed = isPathAllowed(robots, hostname, pathname);
    verbose &&
      console.log(chalk.gray(`robots.txt already fetched for ${hostname}`));
    verbose &&
      console.log(
        chalk.gray(
          `Crawling ${pathname} on ${hostname} is ${
            isAllowed ? chalk.green('allowed') : chalk.red('disallowed')
          } by robots.txt`,
        ),
      );
    // Cache the result for this hostname and path
    return isAllowed;
  } else {
    const robotsHref = `https://${hostname}/robots.txt`;
    verbose &&
      console.log(chalk.gray(`Fetching robots.txt for ${robotsHref}...`));
    // for a given hostname, check if the robots.txt disallows crawling
    const robots = await fetch(robotsHref)
      .then(res => res.text())
      .catch(err => {
        verbose && console.log(chalk.red(`Error fetching robots.txt: ${err}`));
        return '';
      });
    const isAllowed = isPathAllowed(robots, hostname, pathname);
    verbose &&
      console.log(
        chalk.gray(
          `Crawling ${pathname} on ${hostname} is ${
            isAllowed ? chalk.green('allowed') : chalk.red('disallowed')
          } by robots.txt`,
        ),
      );

    return isAllowed;
  }
};

const isPathAllowed = (
  robots: string,
  hostname: string,
  pathname: string,
): boolean => {
  // if we've cached the robots.txt for this hostname and path, return the cached value
  if (
    RobotsAllowCache.has(hostname) &&
    RobotsAllowCache.get(hostname)?.has(pathname)
  ) {
    return RobotsAllowCache.get(hostname)?.get(pathname) as boolean;
  }

  const disallowedPaths = robots
    .split('\n')
    .filter(line => line.startsWith('Disallow:'))
    .map(line => line.replace('Disallow:', '').trim());

  const isAllowed = !disallowedPaths.some(disallowedPath =>
    pathname.startsWith(disallowedPath),
  );

  // Cache the result for this hostname and path
  if (!RobotsAllowCache.has(hostname)) {
    RobotsAllowCache.set(hostname, new Map());
  }
  RobotsAllowCache.get(hostname)?.set(pathname, isAllowed);
  return isAllowed;
};
