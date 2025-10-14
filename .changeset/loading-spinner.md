---
'@leafygreen-ui/loading-indicator': major
---

The `Spinner` component has been re-written as a lightweight SVG-based spinning loading indicator component, to eliminate the use of Lottie player (a heavy run-time animation library). 
Importing `Spinner` component from the package root is not recommended, since this will also bundle the heavy `PageLoader` component, which still uses Lottie player. 

For simple loading spinners, prefer importing the spinner directly from  `@leafygreen-ui/loading-indicator/spinner`
