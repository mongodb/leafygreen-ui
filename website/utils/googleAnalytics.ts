// log the pageview with their URL
export const pageview = (url) => {
  // @ts-expect-error
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}

// log specific events happening.
export const event = ({ action, params }) => {
  // @ts-expect-error
  window.gtag('event', action, params)
}