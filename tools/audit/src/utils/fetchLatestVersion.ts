/**
 * Fetches the latest version of a package from npm registry
 */
export async function fetchLatestVersion(packageName: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(packageName)}/latest`,
    );

    if (!response.ok) {
      console.warn(`Failed to fetch version for ${packageName}: ${response.status}`);
      return null;
    }

    const data = (await response.json()) as { version: string };
    return data.version;
  } catch (error) {
    console.warn(`Error fetching version for ${packageName}:`, error);
    return null;
  }
}

