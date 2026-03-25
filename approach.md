# Roboto Studio Test Approach

## Summary

This build was approached as a pragmatic, CMS-driven homepage rather than as a fully generalized platform rebuild.

The core goals I prioritized were:

- translating the difficult Figma into a credible, polished frontend
- making the homepage editable through Sanity page builder blocks
- solving the image-grid/aspect-ratio problem in a way that was visually controlled and robust
- using reusable tokens and scalable styling rather than one-off values
- balancing pixel-accuracy with realistic tradeoffs under time pressure

I deliberately optimized for the part of the test that seemed most important: the homepage experience, the CMS wiring, and the hardest layout problems.

---

## Design And Frontend Decisions

### Font choice

The Figma referenced a type treatment that was not directly available in the implementation environment. Rather than blocking on the exact font, I chose a close serif substitute and used it consistently throughout the page.

That decision is defensible because:

- the brief explicitly suggested that the required Figma font might not be available
- the important thing was preserving tone, proportion, and feel rather than pretending to have the exact licensed font
- using a single controlled substitute across the page is stronger than mixing fallback serif defaults inconsistently

### Spacing and visual harmony

The spacing in the design was not perfectly systematized, so I rebuilt it using a visual-hierarchy approach:

- establish reusable CSS variables and Tailwind-friendly tokens
- normalize shell width, section spacing, grid spacing, type scale, and colors
- then tune by eye against the composition rather than blindly copying every irregular gap

The principle I followed was:

> where Figma was inconsistent, I preserved the visual rhythm rather than the inconsistency itself

### Tokens and scalability

I moved repeated values into reusable variables and utilities rather than leaving arbitrary color literals or ad hoc spacing in component markup.

That means the build is easier to:

- maintain
- theme
- refine
- scale into additional blocks later

---

## CMS And Page Builder Approach

### Homepage as the main deliverable

I treated the task as a homepage-first page-builder implementation.

The important CMS-enabled blocks are:

- Hero Block
- Text & Image Block
- Collection Grid Block
- Brand Strip Block

This let me complete the homepage in a genuinely editable way through Sanity rather than hardcoding all content.

### Why navbar and footer were kept in code

I intentionally kept the navbar and footer in code rather than making them first-class page-builder blocks.

- it reduced CMS complexity for parts of the interface that are structurally global rather than page-compositional
- it saved time for the part of the test that mattered most: the bespoke homepage blocks and the difficult image/grid behavior
- it preserved consistency and reduced editorial error for core chrome

---

## Image Grid And Aspect Ratio Strategy

### The main problem

The hardest layout problem was the collection grid.

The challenge was not just “make images fit”, but:

- preserve full-image visibility when source assets share the same natural ratio
- create a consistent and elegant row system when assets have mixed dimensions
- avoid ugly wrap cases where leftover items stretch or collapse

### How I handled it

The approach was:

- if items are effectively being authored with the same intended ratio, allow them to display cleanly without destructive cropping
- when mixed compositions are needed, enforce a consistent card ratio through the CMS-driven aspect choice
- keep row widths visually balanced so 4-, 5-, and 6-item cases still feel deliberate

### What the aspect ratio field in Sanity does

The `sizeAspect` option in Studio is an editorial framing control for the card container.

It does **not** magically change the source image itself.

What it does is define the display frame:

- `standard` = square card treatment
- `wide` = wider card treatment
- `tall` = taller card treatment
- `large` = slightly larger / broader card treatment

So in practical terms:

- it controls the shape of the card box in the grid
- the image then fits within that box according to the frontend logic

---

## Motion Decisions

### Intro

I added a restrained intro / page reveal to give the homepage a stronger opening moment and a more premium first impression.

### Minimal animation elsewhere

I kept the rest of the motion subtle because the site tone is antique, editorial, and refined rather than playful or hyper-interactive.

That means:

- limited reveal motion
- no excessive flourishes
- no “techy” animation language

---

## Sanity Editing And Revalidation

### Local vs deployed behavior

Locally, the app updates quickly because development mode is dynamic.

On Vercel, production content needed proper revalidation behavior so published Sanity changes could appear without manual redeploys.

### Proper solution used

The production-friendly setup is:

- publish content in Sanity
- trigger a secure webhook
- call a protected Next.js revalidation endpoint
- revalidate homepage and shared navigation data

This is the correct production pattern because it is event-driven rather than rebuild-driven.

---

## Closing Note

Overall, this implementation was guided by pragmatic prioritization: solving the most difficult frontend and CMS problems first, keeping the editorial experience workable, and making decisions that preserved design tone while remaining realistic within the scope of the test.
