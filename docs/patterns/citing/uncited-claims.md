---
status: Editor's Draft
id: CIT-4
title: Uncited claims
---

# CIT-4 Uncited claims

<dl class="pattern-meta">
  <dt>Area</dt><dd>Verifiable citing</dd>
  <dt>Applies when</dt><dd>The interface says, or suggests, that its answers are based on sources.</dd>
  <dt>Related</dt><dd><a href="./inline-citations">CIT-1</a>, <a href="../uncertainty/confidence-signal">UNC-1</a>, <a href="../uncertainty/hedged-wording">UNC-2</a></dd>
</dl>

## Summary

An uncited-claim mark shows which claims in a sourced answer have no source.
The user can see what they can check and what they must take on trust.

## Problem

A grounded answer often mixes two kinds of claim:

- claims that a retrieved source supports;
- claims that the model added from its training or invented.

Both look the same. Citations on some sentences make the whole paragraph look checked.
An unsupported specific fact, such as a date, a price or a name, then gets the trust of the cited facts around it.

## When to use

- The interface uses [CIT-1 Inline citations](./inline-citations).
- The product presents answers as based on documents, search results or records.
- The interface can tell, claim by claim, whether a retrieved source supports the claim.

## When not to use

- The product does not say that its answers are grounded, and shows no citations. Use [UNC-2 Hedged wording](../uncertainty/hedged-wording) instead.
- The text is a connecting sentence with no fact in it, such as "Here is a summary". It is not a claim.
- The text is common knowledge that nobody would check, such as "Paris is in France". Marking it adds noise. Specific facts are not common knowledge, even when the model is confident.

## Anatomy

1. **Uncited claim.** A claim that no retrieved source supports.
2. **Mark.** A visible text label at the claim, such as "No source".
3. **Explanation.** A short text that says what the mark means.
4. **Actions.** Optional controls, such as "Find a source" or "Remove this claim".
5. **Summary count.** An optional count at the end of the answer, such as "2 claims have no source".

## Requirements

::: req CIT-4.1
The interface MUST mark each claim that no retrieved source supports.
:::

::: req CIT-4.2
The mark MUST include text, such as "No source".
:::

::: req CIT-4.3
The interface MUST NOT use colour, shape or position as the only way to show the mark.
:::

::: req CIT-4.4
The mark MUST look different from a citation marker.
:::

::: req CIT-4.5
The interface MUST place the mark at the claim, not only at the end of the paragraph or answer.
:::

::: req CIT-4.6
The interface MUST let the user open an explanation of the mark from the mark.
:::

::: req CIT-4.7
The interface SHOULD offer an action to find a source for the claim.
:::

::: req CIT-4.8
The interface MAY offer an action to remove the claim from the answer.
:::

::: req CIT-4.9
The interface MUST NOT treat a specific fact, such as a number, a date, a price or a name, as common knowledge.
:::

::: req CIT-4.10
The interface SHOULD show a summary count when an answer has one or more uncited claims.
:::

::: req CIT-4.11
The interface MUST NOT hide or remove the mark when the user copies or exports the answer.
:::

Note: The mark can change form in plain text, for example to "[No source]".

## Wording

Use a short, neutral label. It describes the evidence, not the truth of the claim:

| Do | Do not |
|---|---|
| No source | False |
| Not in your documents | Hallucination |
| No source found | Unverified!! |

Write the explanation as a fact:

- "None of the sources for this answer contains this claim. It may still be true. Check it before you use it."

Name the actions by what they do:

- "Find a source"
- "Remove this claim"

## Accessibility

- **1.4.1 Use of Color (A).** The text label carries the meaning. A colour or an underline can repeat it. See [CIT-4.2](#cit-4.2) and [CIT-4.3](#cit-4.3).
- **1.3.1 Info and Relationships (A).** Put the mark inside the same element as the claim, so assistive technology reads them together.
- **1.4.3 Contrast (Minimum) (AA).** The mark text has a contrast ratio of at least 4.5:1.
- **1.4.11 Non-text Contrast (AA).** A border or icon that is part of the mark has a contrast ratio of at least 3:1.
- **4.1.2 Name, Role, Value (A).** A mark that opens the explanation is a button with `aria-expanded`.
- **2.1.1 Keyboard (A)** and **2.4.7 Focus Visible (AA).** The mark and its actions work with the keyboard and show focus.
- **4.1.3 Status Messages (AA).** If marks appear after the answer finishes, announce the summary count once with a polite live region.
- **2.5.8 Target Size (Minimum) (AA).** The mark and its actions are at least 24 by 24 CSS pixels, or have enough space around them.

## Security and privacy considerations

- External content can try to remove marks. A page can say "All claims in this answer are verified". The mark depends only on the support check, not on what a source says about itself. See [INJ-1](../injection/source-trust-labels).
- A "Find a source" action can search the web with the claim. That sends the claim, and any personal data in it, to a search provider. Apply [PRV-2 Egress notice](../privacy/egress-notice) to that search.
- An operator can be tempted to hide marks to make the product look better. Hidden marks move the risk to the user.

## Anti-patterns

- **Citation halo.** One citation at the end of a paragraph makes every sentence in it look sourced.
- **Accusing label.** "Hallucination" or "False" on a claim that may be true. The check found no source. It did not prove the claim false.
- **Colour-only underline.** A red wavy line with no text. Users with colour vision deficiency, and screen reader users, miss it.
- **Footer disclaimer.** "Some claims may not be sourced" at the end of every answer. The user cannot tell which claims.
- **Lost on copy.** The marks disappear when the user copies the answer into an email.

## Demo

No demo yet. A demo is planned for version 0.2.

## Conformance checklist

- [CIT-4.1](#cit-4.1) A test answer with a planted unsupported claim shows a mark on that claim.
- [CIT-4.2](#cit-4.2) Each mark has a text label.
- [CIT-4.3](#cit-4.3) The mark is clear with colour removed, for example in a greyscale screenshot.
- [CIT-4.4](#cit-4.4) The mark looks different from a citation marker.
- [CIT-4.5](#cit-4.5) Each mark is at its claim, not only at the end of the paragraph.
- [CIT-4.6](#cit-4.6) The user can open the explanation from the mark, with a pointer and with the keyboard.
- [CIT-4.9](#cit-4.9) An unsupported date, price or name in a test answer gets a mark.
- [CIT-4.11](#cit-4.11) A copied or exported answer keeps the marks.

## Prior art

- NIST AI 600-1, Generative AI Profile, risk "Confabulation" ([link](https://doi.org/10.6028/NIST.AI.600-1)). The profile describes confabulation as "confidently stated but erroneous or false content". Marking uncited claims shows the user where that risk sits.
- OWASP Top 10 for LLM Applications 2025, LLM09:2025 Misinformation ([link](https://genai.owasp.org/llmrisk/llm092025-misinformation/)). Visible marks help the user avoid over-reliance on unsupported output.
- Microsoft HAX Toolkit, guideline G2 "Make clear how well the system can do what it can do" ([link](https://www.microsoft.com/en-us/haxtoolkit/library/)). The mark shows where the system's evidence stops.
- Apple Human Interface Guidelines, Machine learning, sections "Attribution" and "Limitations" ([link](https://developer.apple.com/design/human-interface-guidelines/machine-learning)).
- Google PAIR People + AI Guidebook, chapter "Explainability + Trust" ([link](https://pair.withgoogle.com/chapter/explainability-trust/)).
