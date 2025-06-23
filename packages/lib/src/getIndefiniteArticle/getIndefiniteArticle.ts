/**
 * Returns the appropriate indefinite article ('a' or 'an') for a given word
 * based on whether it starts with a vowel sound.
 *
 * @param word - The word to get the indefinite article for
 * @returns 'a' or 'an'
 */
export function getIndefiniteArticle(word: string): string {
  return /^[aeiou]/i.test(word) ? 'an' : 'a';
}
