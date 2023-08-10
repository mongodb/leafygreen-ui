---
'@leafygreen-ui/guide-cue': major
---

Downgrades `focus-trap-react` package to `^9.0.2`` fix fallback focus error. Also refactors multi-step guideCue so that the tooltip no longer uses a portal, as React 18 displays the tooltip in the wrong position when the viewport changes.
