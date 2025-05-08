/* eslint-disable no-console */
import chalk from 'chalk';
import trimEnd from 'lodash/trimEnd';
import trimStart from 'lodash/trimStart';
import { type MongoClient } from 'mongodb';

import { allowedDomains, SOURCES } from '../constants';

import { createCollectionNameFromURL } from './createCollectionNameFromURL';
import { newURL } from './newURL';
import { processSingleUrl } from './processSingleUrl';

export interface RecursiveCrawlOptions {
  baseUrl: string;
  collectionName: string;
  mongoClient: MongoClient;
  maxDepth: number;
  relativePath?: string;
  currentDepth?: number;
  visited?: Set<string>;
  verbose?: boolean;
  dryRun?: boolean;
  enableRecursion?: boolean; // New flag to track if we're crawling an allowed external domain
}

/**
 * Recursively crawl a website following links up to a maximum depth
 */
export async function recursiveCrawlFromBaseURL({
  baseUrl,
  collectionName,
  mongoClient,
  relativePath,
  maxDepth = 3,
  currentDepth = 0,
  visited = new Set<string>(),
  verbose = false,
  dryRun = false,
  enableRecursion = true, // Default to false for initial base URL crawling
}: RecursiveCrawlOptions): Promise<void> {
  currentDepth === 0 &&
    verbose &&
    console.log(chalk.green('\nStarting crawl of ' + baseUrl));

  const isRelative = relativePath?.length && relativePath?.startsWith('/');
  const fullHref = `${trimEnd(baseUrl, '/')}${
    isRelative ? '/' + trimStart(relativePath, '/') : ''
  }`;

  const fullUrl = newURL(fullHref);

  // Don't crawl if we've reached max depth or already visited this URL
  if (currentDepth > maxDepth || visited.has(fullUrl.href)) {
    verbose &&
      console.log(
        chalk.gray(
          `Already visited ${fullUrl} or reached max depth (${currentDepth}/${maxDepth})`,
        ),
      );
    return;
  }

  // Check if URL is valid for crawling (either a source URL extension or an allowed external domain)
  const isSourceExtension = SOURCES.some(source =>
    fullUrl.href.startsWith(source.url),
  );
  const isAllowedExternal = allowedDomains.some(domain =>
    fullUrl.href.startsWith(domain),
  );

  if (!isSourceExtension && !isAllowedExternal) {
    verbose &&
      console.log(
        chalk.yellow(
          `Skipping URL ${fullUrl.href} - not an extension of SOURCES or allowed external domain`,
        ),
      );
    return;
  }

  verbose &&
    console.log(
      '\n',
      chalk.gray(`Crawling ${fullUrl} (depth: ${currentDepth}/${maxDepth})`),
    );

  // Mark this URL as visited
  visited.add(fullUrl.href);

  // Process the current URL
  const { links } = await processSingleUrl({
    href: fullUrl.href,
    collectionName,
    mongoClient,
    verbose,
    dryRun,
  });

  // If we've reached max depth, don't crawl further.
  // If we're crawling a non-base URL (allowed external domain),
  // we don't follow any of its links (depth = 1)
  if (currentDepth === maxDepth || !enableRecursion) {
    verbose &&
      console.log(
        chalk.gray(
          `Reached max depth, or not allowed to crawl further links from ${fullUrl}`,
        ),
      );
    return;
  }

  try {
    // Recursively crawl all new links (depth-first)
    for (const link of links) {
      const isRelative = link.startsWith('/') || link.startsWith('#');

      const linkUrl = isRelative
        ? newURL(fullUrl.origin + '/' + trimStart(link, '/'))
        : newURL(link);

      const isVisited = visited.has(linkUrl.href);
      const isSameDomain = link.startsWith(baseUrl);
      const isExternalLink = !isRelative && !isSameDomain;
      const isAllowedExternalLink =
        isExternalLink &&
        allowedDomains.some(domain => link.startsWith(domain));

      if (isVisited) {
        verbose && console.log(chalk.gray(`Already visited link: ${link}`));
        continue;
      }

      // Check if the link is to an allowed external domain
      if (isExternalLink && !isAllowedExternalLink) {
        verbose &&
          console.log(
            chalk.gray(
              `Skipping external link: ${link} not in allowed domains`,
            ),
          );
        continue;
      }

      console.log(chalk.gray(`Found new link: ${link}`));

      verbose &&
        console.log(
          chalk.gray(
            `Preparing to crawl ${linkUrl.origin} with relative path ${
              linkUrl.pathname
            } ${isExternalLink ? ' (external)' : ''}`,
          ),
        );

      const _collectionName = isExternalLink
        ? createCollectionNameFromURL(linkUrl.href)
        : collectionName;

      // For internal links, continue with original base URL
      await recursiveCrawlFromBaseURL({
        baseUrl: linkUrl.origin,
        relativePath: linkUrl.pathname,
        collectionName: _collectionName,
        mongoClient,
        maxDepth,
        currentDepth: currentDepth + 1,
        visited,
        verbose,
        dryRun,
        enableRecursion: !isExternalLink,
      });
    }
  } catch (error) {
    console.error(chalk.red(`Error crawling ${baseUrl}:`), error);
  }
}
