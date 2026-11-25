---
layout: home
hero:
  name: Candor
  text: Open interaction patterns for honest AI interfaces
  tagline: Show what the AI does not know, what came from outside, what leaves the device and where each claim came from.
  actions:
    - theme: brand
      text: Read the specification
      link: /spec/introduction
    - theme: alt
      text: Browse the 16 patterns
      link: /patterns/
features:
  - title: Uncertainty
    details: Confidence signals, hedged wording, declining to answer, and when to ask before you guess.
    link: /patterns/#uncertainty
  - title: Injection warnings
    details: Mark external content, confirm actions it triggers, flag suspected injection, and log every action.
    link: /patterns/#injection-warnings
  - title: Privacy boundaries
    details: Show what the AI can see, what leaves the device or tenant, consent, retention and redaction.
    link: /patterns/#privacy-boundaries
  - title: Verifiable citing
    details: Inline citations, source previews, quote-to-source links, and a visible mark on uncited claims.
    link: /patterns/#verifiable-citing
---

<div class="vp-doc home-sample">

## What a requirement looks like

Every pattern states testable rules. Each rule has a permanent ID that you can cite in a review, an issue or a conformance claim.

::: req UNC-1.3
The signal MUST include a text level label.
:::

::: req UNC-1.4
The interface MUST NOT use colour, shape or position as the only way to show the level.
:::

[Read UNC-1 Confidence signal](./patterns/uncertainty/confidence-signal) or [open the full checklist](./checklist).

</div>
