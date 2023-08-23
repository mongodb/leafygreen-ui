---
title: Use Any Decision Records (ADRs) to capture decisions
date: 2023-08-22
status: proposal
---

# Use Any Decision Records (ADRs) to capture decisions

## Context and Problem Statement

**How might we:**

- capture design/architecture decisions?
- capture new proposals?
- solicit feedback on design/architecture proposals?
- maintain a log of design/architecture decisions?

## Decision Drivers

- Ease of lookup
- Ease of collaboration

## Chosen Option

[Markdown ADRs](#markdown-adrs)

## Other Options Considered

- [Google Docs](#google-docs)
-

## Weighing the Options

### Markdown ADRs

- ✅ Decisions remain in context with code
- ✅ Easier to reference history of decisions
- ✅ Can solicit feedback via GitHub PR review
- 🚫 Simultaneous collaboration is more difficult

### Google Docs

- ✅ Very easy to collaborate with other decision makers
- ✅ Can solicit feedback via comments
- 🚫 Hard to keep track of documents. Google docs tend to get lost/forgotten
- 🚫 Documents not linked to code in any meaningful way
- 🚫 Harder to format & highlight code. Docs will likely contain a significant amount of code.
