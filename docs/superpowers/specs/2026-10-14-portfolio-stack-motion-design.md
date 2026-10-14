# Portfolio Stack, Motion, and Layout Refinements

## Goal

Keep project technology labels accurate to the supplied CV, remove noisy or
redundant tags, and improve motion and layout while preserving the portfolio's
existing warm visual identity and behavior.

## Project technology stacks

- **REZA and YAP / Do It App:** apply the OuzTechnology CV stack to both cards:
  Node.js, Express, React, Flutter, Spring Boot, PostgreSQL, Git, Docker, and
  Firebase Cloud Messaging (FCM). Keep technology and framework labels that
  describe distinct parts of the stack; for example, Node.js and Express, or
  Java and Spring Boot, are not duplicates. Do not list Dart separately for
  Flutter projects.
- **Evoléo:** Python, FastAPI, PaddleOCR, YOLO, Label Studio, React, and MySQL.
- **Tenmar:** ASP.NET Core, Entity Framework, Angular, and SQL Server.
- Remove Vue from every project, including AgroTrace.
- Remove JWT, WebSocket/STOMP, and Clean Architecture from YAP's tags; remove
  VPS and IONOS from Nabeny's tags.
- Add Git to each project card because it was used across the projects.
- Remove MinIO and LSTM from AgroTrace; neither is supported by the supplied
  project description and CV details.
- Use “Google Gemini” consistently for visible technology labels instead of
  variants such as “Gemini AI” or “Gemini API”.
- Use the blue/yellow Python mark and add the Timescale/TigerData and Google
  Gemini marks where those technologies are shown. Use logo marks for other
  stack technologies when available, and retain text labels as a fallback.

## Skills and certificates

- Remove the Creative & Design Skills card.
- Keep the Technical Skills and Testing & Quality Assurance cards.
- Display the remaining skill cards as equal-width columns on desktop and
  tablet, switching to one column on narrow mobile screens.
- Preserve technology logos already present; use the original blue/yellow Python
  mark.
- Keep the existing certificates and Coursera marks.

## Theme and motion

- Keep the current color palette and existing theme persistence.
- Migrate the portfolio to React with Vite so the actual Magic UI
  `AnimatedThemeToggler` React component can be used. Magic UI publishes this
  as copyable component source rather than a standalone runtime package; use
  its documented component and required React/icon dependencies, adapting only
  the theme integration needed by this site.
- Preserve the portfolio's existing content, bilingual behavior, CV download,
  project galleries, contact form, responsive styling, and theme persistence
  during the migration.
- Respect reduced motion and fall back to an immediate theme change when the
  View Transitions API is unavailable.
- Keep restrained, one-time fade-and-rise reveals for sections and cards as
  they enter the viewport. Stagger card reveals slightly and honor
  `prefers-reduced-motion`.

## Hero actions

- Keep View My Work, Get In Touch, and Download CV on one row when there is
  enough width.
- Allow wrapping at narrow viewport sizes to preserve legibility and comfortable
  tap targets.

## Validation

- Confirm the exact supplied stacks, Git on every project, no Vue/LSTM/MinIO,
  no PHP skill tag, and no removed YAP/Nabeny tags.
- Confirm Google Gemini naming is consistent and supported icons render,
  including Python, Timescale/TigerData, and Gemini.
- Verify the actual Magic UI React component is used and that its theme state
  remains synchronized with CSS and saved preference.
- Exercise light/dark toggling, saved preference, View Transitions fallback,
  English/French switching, desktop/mobile layout, and reduced-motion behavior
  in the Vite localhost preview.
- Run the production build and check key existing project, gallery, CV, and
  contact interactions after the React/Vite migration.
