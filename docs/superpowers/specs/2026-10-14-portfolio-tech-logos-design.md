# Portfolio Technology Logo Coverage

## Goal

Make the portfolio's project stacks and Coursera credentials easier to scan by
adding recognizable technology/provider marks where available, without removing
the text labels that identify them.

## Scope

- Add Devicon marks to every project technology tag with a corresponding icon,
  using the existing Devicon stylesheet. Keep labels on every tag; retain
  text-only tags when no suitable mark exists (for example, JWT and REST API).
- Add the Coursera mark to both certificate issuer labels.
- Remove Analytics from the Quizmaster project stack.
- Remove PHP from the Technical Skills stack.
- Add available marks to other existing skill tags, including Postman and Jira.
- Preserve the current layout, light/dark themes, English/French text, and
  responsive behavior.

## Approach

Continue using the already-loaded Devicon icon font. This avoids another asset
dependency and keeps technology marks visually consistent. Use the current
text-chip treatment and add only an icon before labels. Since Devicon has no
Coursera mark, render Coursera's SVG inline without adding a package or network
dependency. Avoid changing card layout or project content beyond the requested
removals.

## Validation

Check that icon glyphs render for supported project, skill, and Coursera labels,
confirm the two requested tags are absent, and inspect desktop/mobile layouts
and light/dark contrast in the existing localhost preview.
