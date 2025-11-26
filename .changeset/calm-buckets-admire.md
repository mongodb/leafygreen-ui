---
'@lg-charts/core': patch
---

Ensure array fields like `labels` in `<XAxis>` are updated as expected in the chart options.
This update changes the recursive merge function in the EChart options utility to treat arrays as atoms: instead of merging their elements, it now replaces arrays entirely. Previously, arrays were being merged like objects, resulting in arrays becoming plain objects with numeric keys. With this fix, when merging, any existing array field (such as `labels` on `<XAxis>`) is now overwritten by the new array rather than partially merged.