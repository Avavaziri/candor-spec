---
status: Editor's Draft
id: CIT-2
title: Source preview
---

# CIT-2 Source preview

<dl class="pattern-meta">
  <dt>Area</dt><dd>Verifiable citing</dd>
  <dt>Applies when</dt><dd>The interface shows citations that the user can open.</dd>
  <dt>Related</dt><dd><a href="./inline-citations">CIT-1</a>, <a href="./quote-to-source">CIT-3</a>, <a href="../injection/source-trust-labels">INJ-1</a></dd>
</dl>

## Summary

A source preview shows the key facts about a cited source next to the answer.
The user can check the source without losing their place in the answer.

## Problem

To check a citation, the user often must open a new tab, find the right part of a long page and then return.
Most users do not do this. They trust the citation without a check.

Other problems make the check harder:

- The user does not know whether the source is official, old or from an unknown site until they open it.
- The link goes to a document that the user cannot open. The user does not know why.
- A preview that covers the answer hides the claim that the user wants to compare.

## When to use

- The interface uses [CIT-1 Inline citations](./inline-citations).
- Sources are long, so the supporting passage is hard to find.
- Sources come from many owners or sites with different levels of trust.

## When not to use

- The interface cannot get the source metadata or the supporting passage. Show the citation link only. Do not show a preview with empty fields.
- The source is very short, such as one database record. Show the record inline instead.

## Anatomy

1. **Trigger.** The citation marker from [CIT-1](./inline-citations).
2. **Preview panel.** A panel that opens in place, near the claim.
3. **Title.** The title of the source.
4. **Owner.** The publisher, site or team that owns the source.
5. **Date.** The publication date or the date of the last change.
6. **Type.** The kind of source, such as web page, PDF, email or database record.
7. **Access.** Who can open the source, or a note that this user cannot open it.
8. **Passage.** The part of the source that supports the claim.
9. **Trust label.** The [INJ-1](../injection/source-trust-labels) label for external content.
10. **Open link.** A link to the full source.
11. **Close control.** A button that closes the preview.

## Requirements

::: req CIT-2.1
The interface MUST let the user open the preview from the citation marker with a pointer, a touch and the keyboard.
:::

::: req CIT-2.2
The preview MUST NOT open on hover alone.
:::

Note: The preview can also open on hover. It also needs a click, a tap or a key press.

::: req CIT-2.3
The preview MUST show the title, the owner and the type of the source.
:::

::: req CIT-2.4
The preview SHOULD show the date of the source.
:::

::: req CIT-2.5
The preview SHOULD show the passage that supports the claim.
:::

::: req CIT-2.6
The preview MUST show the INJ-1 trust label when the source is external content.
:::

::: req CIT-2.7
The preview MUST include a link that opens the full source.
:::

::: req CIT-2.8
When this user cannot open the source, the preview MUST say so before the user follows the link.
:::

::: req CIT-2.9
The preview MUST NOT cover the claim that it supports.
:::

::: req CIT-2.10
The user MUST be able to close the preview with a visible control and with the Escape key.
:::

::: req CIT-2.11
When the preview closes, the interface MUST return focus to the marker that opened it.
:::

::: req CIT-2.12
The interface MUST show external content in the preview as plain text, with no scripts, forms or active links.
:::

Note: The open link is the only link. It is a control of the interface, not part of the external content.

::: req CIT-2.13
The interface SHOULD keep the user's scroll position in the answer while the preview is open.
:::

## Wording

Write the access note in plain words:

- "You cannot open this source. It is in the Finance team's private folder."
- "This source needs a login to Example Journal."

Write the type and date as short facts:

- "PDF, 12 pages. Updated 3 March 2026."
- "Web page. No date shown."

Name the controls by what they do:

| Do | Do not |
|---|---|
| Open source | Click here |
| Close preview | X (with no accessible name) |

## Accessibility

- **1.4.13 Content on Hover or Focus (AA).** If the preview also opens on hover, the user can dismiss it, move the pointer over it, and it stays open until they dismiss it.
- **2.1.1 Keyboard (A).** The marker opens the preview with Enter or Space. Escape closes it. See [CIT-2.10](#cit-2.10).
- **2.4.3 Focus Order (A).** Focus moves into the preview or stays on the marker. When the preview closes, focus returns to the marker. See [CIT-2.11](#cit-2.11).
- **2.4.11 Focus Not Obscured (Minimum) (AA).** The open preview does not hide the focused control.
- **4.1.2 Name, Role, Value (A).** The marker is a button with `aria-expanded` and `aria-controls`. The WAI-ARIA disclosure pattern fits. A modal dialog is usually too heavy for a preview.
- **1.3.1 Info and Relationships (A).** Mark up the fields of the preview as a list or a description list, so each label goes with its value.
- **2.4.4 Link Purpose (In Context) (A).** The open link names the source, for example "Open source: Travel policy 2026".
- **2.5.8 Target Size (Minimum) (AA).** The close control and the open link are at least 24 by 24 CSS pixels, or have enough space around them.

## Security and privacy considerations

- A preview of external content is an attack surface. A page can contain scripts, forms or hidden instructions. Show it as plain text. See [CIT-2.12](#cit-2.12).
- A preview can show more than the user may see. Get the preview with the user's own access rights, not the assistant's rights.
- A preview can load remote images or fonts. The remote server then learns that this user read the answer. Do not load remote resources in the preview.
- Metadata can mislead. A page can claim an official owner. Take the owner from the domain or the system of record, not from text on the page.

## Anti-patterns

- **Hover-only card.** The preview opens only on hover. Keyboard and touch users cannot open it.
- **Modal for a preview.** A full-screen dialog covers the answer. The user cannot compare the claim and the source.
- **Live page in a frame.** The preview loads the external page with its scripts. This runs untrusted code inside the interface.
- **Silent dead end.** The link opens an "access denied" page with no warning.
- **Empty fields.** A preview with "Unknown" in every field. It adds a click and gives no information.

## Demo

No demo yet. A demo is planned for version 0.2.

## Conformance checklist

- [CIT-2.1](#cit-2.1) The preview opens from the marker with a pointer, a touch and the keyboard.
- [CIT-2.2](#cit-2.2) The preview opens without hover, for example with a key press.
- [CIT-2.3](#cit-2.3) The preview shows the title, the owner and the type of the source.
- [CIT-2.6](#cit-2.6) An external source in the preview shows its trust label.
- [CIT-2.7](#cit-2.7) The preview has a link that opens the full source.
- [CIT-2.8](#cit-2.8) For a source that the user cannot open, the preview says so.
- [CIT-2.9](#cit-2.9) The claim stays visible while its preview is open.
- [CIT-2.10](#cit-2.10) A visible control and the Escape key both close the preview.
- [CIT-2.11](#cit-2.11) After the preview closes, focus is on the marker that opened it.
- [CIT-2.12](#cit-2.12) A test page with a script and a form shows as plain text in the preview.

## Prior art

- W3C WAI-ARIA Authoring Practices Guide, Disclosure (Show/Hide) Pattern ([link](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)). The preview uses this pattern.
- W3C WAI-ARIA Authoring Practices Guide, Tooltip Pattern ([link](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)). Its status note says it is a work in progress. That is one reason this pattern avoids hover-only tooltips.
- Apple Human Interface Guidelines, Machine learning, section "Attribution" ([link](https://developer.apple.com/design/human-interface-guidelines/machine-learning)). The preview shows the user where the information came from.
- Google PAIR People + AI Guidebook, chapter "Explainability + Trust" ([link](https://pair.withgoogle.com/chapter/explainability-trust/)). The preview gives the user the facts to calibrate their trust.
- OWASP Top 10 for LLM Applications 2025, LLM05:2025 Improper Output Handling ([link](https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/)). This is the basis for plain-text previews of external content.
- W3C WCAG 2.2, success criterion 1.4.13 Content on Hover or Focus ([link](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)).
