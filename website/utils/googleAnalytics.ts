// log the pageview with their URL
export const pageview = url => {
  // @ts-expect-error
  window.gtag('config', 'G-VFTH2BJVVK', {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  // @ts-expect-error
  window.gtag('event', action, params);
};
