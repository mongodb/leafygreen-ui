import { Size } from '../types';

// https://yoksel.github.io/url-encoder/
// I was having trouble adding these as SVG files because they kept importing as react components so I went with this route.
// If I were to use SVG files I would still need to map them to the correct size and position.
// If I were to switch over to clip-path instead of using a mask I would still need an edge object to map each path so I stuck with SVGs and data URIs

export const edges: Record<Size, Record<'before' | 'after', string>> = {
  [Size.XSmall]: {
    before:
      'data:image/svg+xml,%3Csvg width="7" height="22" viewBox="0 0 7 22" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0.20473 1.43966C-0.120489 0.775287 0.363189 0 1.10289 0H6.5V22H1.10289C0.363189 22 -0.12049 21.2247 0.204729 20.5603L3.80852 13.1983C4.48743 11.8114 4.48743 10.1886 3.80852 8.8017L0.20473 1.43966Z" fill="%23C3E7FE"/%3E%3C/svg%3E%0A',
    after:
      'data:image/svg+xml,%3Csvg width="9" height="22" viewBox="0 0 9 22" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0H0.90983C2.80369 0 4.53501 1.07001 5.38197 2.76393L8.38197 8.76393C9.08578 10.1716 9.08578 11.8284 8.38197 13.2361L5.38197 19.2361C4.53501 20.93 2.80369 22 0.90983 22H0V0Z" fill="%23C3E7FE"/%3E%3C/svg%3E',
  },
  [Size.Small]: {
    before:
      'data:image/svg+xml,%3Csvg width="9" height="28" viewBox="0 0 9 28" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0.723608 1.44722C0.391157 0.782314 0.874652 0 1.61803 0H9V28H1.61803C0.874652 28 0.391156 27.2177 0.723607 26.5528L5.88197 16.2361C6.58578 14.8284 6.58578 13.1716 5.88197 11.7639L0.723608 1.44722Z" fill="%23C3E7FE"/%3E%3C/svg%3E%0A',
    after:
      'data:image/svg+xml,%3Csvg width="11" height="28" viewBox="0 0 11 28" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0H0.740465C2.61281 0 4.32824 1.04608 5.18554 2.71062L9.82088 11.7106C10.5608 13.1472 10.5608 14.8528 9.82088 16.2894L5.18554 25.2894C4.32824 26.9539 2.61281 28 0.740465 28H0V0Z" fill="%23C3E7FE"/%3E%3C/svg%3E%0A',
  },
  [Size.Normal]: {
    before:
      'data:image/svg+xml,%3Csvg width="13" height="36" viewBox="0 0 13 36" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0.738496 1.45307C0.400389 0.78781 0.883717 0 1.62997 0H13V36H1.62997C0.883718 36 0.400389 35.2122 0.738496 34.5469L7.99682 20.2654C8.72033 18.8418 8.72033 17.1582 7.99682 15.7346L0.738496 1.45307Z" fill="%23C3E7FE"/%3E%3C/svg%3E%0A',
    after:
      'data:image/svg+xml,%3Csvg width="13" height="36" viewBox="0 0 13 36" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0H0.90983C2.80369 0 4.53501 1.07001 5.38197 2.76393L11.882 15.7639C12.5858 17.1716 12.5858 18.8284 11.882 20.2361L5.38196 33.2361C4.535 34.93 2.80369 36 0.90983 36H0V0Z" fill="%23C3E7FE"/%3E%3C/svg%3E%0A',
  },
  [Size.Large]: {
    before:
      'data:image/svg+xml,%3Csvg width="13" height="48" viewBox="0 0 13 48" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0.223607 1.44721C-0.108843 0.782313 0.374652 0 1.11803 0H13V48H1.11803C0.374652 48 -0.108844 47.2177 0.223607 46.5528L10.382 26.2361C11.0858 24.8284 11.0858 23.1716 10.382 21.7639L0.223607 1.44721Z" fill="%23C3E7FE"/%3E%3C/svg%3E%0A',
    after:
      'data:image/svg+xml,%3Csvg width="15" height="48" viewBox="0 0 15 48" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0H0.851465C2.77563 0 4.52907 1.10416 5.36055 2.8394L14.4647 21.8394C15.1193 23.2054 15.1193 24.7946 14.4647 26.1606L5.36054 45.1606C4.52907 46.8958 2.77563 48 0.851465 48H0V0Z" fill="%23C3E7FE"/%3E%3C/svg%3E%0A',
  },
};
