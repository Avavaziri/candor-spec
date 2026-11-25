---
status: Editor's Draft
id: CIT-3
title: Quote-to-source link
---

# CIT-3 Quote-to-source link

<dl class="pattern-meta">
  <dt>Area</dt><dd>Verifiable citing</dd>
  <dt>Applies when</dt><dd>The interface can find the passage in a source that supports a claim.</dd>
  <dt>Related</dt><dd><a href="./inline-citations">CIT-1</a>, <a href="./source-preview">CIT-2</a>, <a href="./uncited-claims">CIT-4</a></dd>
</dl>

## Summary

A quote-to-source link takes the user to the exact passage that supports a claim.
The interface highlights the passage, so the user can compare it with the claim.

## Problem

A citation to a 40-page document does not help much.
The user must search the document for the passage. Most users do not.

Even when a passage is shown, two problems remain:

- The answer can paraphrase the source and change its meaning. The user cannot see the change.
- The answer can put a paraphrase in quotation marks. The user then believes that the source used those words.

Sources also change. A passage that supported a claim last month can be gone today.

## When to use

- The interface uses [CIT-1 Inline citations](./inline-citations).
- Sources are long, such as policies, contracts, papers or manuals.
- The exact words matter, such as in legal, medical or safety content.

## When not to use

- The source has no stable text, such as a video with no transcript. Link to a time or a page number instead, and say that the link is not exact.
- The interface cannot store the passage or a reliable locator for it. Use [CIT-2 Source preview](./source-preview) without a passage.

## Anatomy

1. **Claim.** The text in the answer that the source supports.
2. **Quote.** The words of the source, exactly as written. Short.
3. **Paraphrase mark.** A label that says the claim uses different words from the source.
4. **Locator.** The information that finds the passage, such as a text fragment, a page and an offset, or a record field.
5. **Highlight.** A visible mark on the passage when the source opens.
6. **Stale notice.** A message that says the passage is no longer in the source.

## Requirements

::: req CIT-3.1
The interface SHOULD link each cited claim to the specific passage that supports it, not only to the whole source.
:::

::: req CIT-3.2
When the interface opens the source at the passage, it MUST highlight the passage.
:::

::: req CIT-3.3
The interface MUST show text in quotation marks only when the text matches the source word for word.
:::

::: req CIT-3.4
When the claim uses different words from the source, the interface MUST label the claim as a paraphrase.
:::

::: req CIT-3.5
The interface SHOULD show the quote next to the claim, for example in the source preview.
:::

::: req CIT-3.6
The interface SHOULD keep each quote short, to the smallest passage that supports the claim.
:::

Note: A short quote is easier to compare with the claim. It also respects copyright.

::: req CIT-3.7
Before it shows the link, the interface MUST check that the passage is still in the source.
:::

::: req CIT-3.8
When the passage is no longer in the source, the interface MUST show a stale notice.
:::

::: req CIT-3.9
The interface SHOULD show the stored quote and the date it was found when the passage is stale.
:::

::: req CIT-3.10
The interface MUST NOT change the words of a quote to fit the answer.
:::

::: req CIT-3.11
The interface MAY use an omission mark, such as "…", inside a quote, when the omission does not change the meaning.
:::

## Wording

Label a paraphrase in plain words:

- "Paraphrase. The source says: …"
- "In the source's words: …"

Write a stale notice that says what changed and what the user can do:

- "This passage is no longer in the source. The source changed after 12 May 2026. Here is the passage that we found then."
- "We cannot find this page in the PDF any more. Open the source to check."

Give a locator that a person can use:

- "Page 14, section 3.2"
- "Clause 7(b)"

## Accessibility

- **1.4.1 Use of Color (A).** A highlight in colour alone does not tell every user where the passage is. Add a border, an underline or a text label, such as "Supporting passage".
- **1.4.11 Non-text Contrast (AA).** The highlight boundary has a contrast ratio of at least 3:1 against the page.
- **1.4.3 Contrast (Minimum) (AA).** Text inside the highlight keeps a contrast ratio of at least 4.5:1.
- **1.3.1 Info and Relationships (A).** Mark up a quote with `blockquote` or `q`. Then assistive technology can tell quote text from answer text.
- **2.4.3 Focus Order (A)** and **2.4.7 Focus Visible (AA).** When the source opens at the passage, move focus to the passage or to a heading just before it.
- **4.1.3 Status Messages (AA).** Announce a stale notice with a polite live region if it appears after the source opens.

## Security and privacy considerations

- A locator in a URL can leak the claim. A text fragment in a link contains words from the source. If the user shares the link, those words go with it. Do not put personal data in locators.
- A source can change to attack the user. A page can change after retrieval to add false text near the passage. The stale check helps find this. See [CIT-3.7](#cit-3.7).
- A quote can contain instructions. Show quotes from external content as text only. See [INJ-1](../injection/source-trust-labels).

## Anti-patterns

- **Quoted paraphrase.** The answer puts its own words in quotation marks. The user believes that the source said them.
- **Whole-document link.** The citation opens page 1 of a long document. The user must search for the passage.
- **Silent drift.** The source changed, and the link opens a page that no longer supports the claim. Nothing tells the user.
- **Long quote.** A full page in quotation marks. The user cannot see which part supports the claim.
- **Colour-only highlight.** A pale yellow background with no border. Many users cannot see it.

## Demo

No demo yet. A demo is planned for version 0.2.

## Conformance checklist

- [CIT-3.2](#cit-3.2) When a source opens at a passage, the passage is highlighted.
- [CIT-3.3](#cit-3.3) Each text in quotation marks matches the source word for word.
- [CIT-3.4](#cit-3.4) Each claim that uses different words from its source has a paraphrase label.
- [CIT-3.7](#cit-3.7) The interface checks that the passage is still in the source before it shows the link.
- [CIT-3.8](#cit-3.8) A test source with the passage removed shows a stale notice.
- [CIT-3.10](#cit-3.10) No quote has words that differ from the source.

## Prior art

- Apple Human Interface Guidelines, Machine learning, section "Attribution" ([link](https://developer.apple.com/design/human-interface-guidelines/machine-learning)). This pattern makes attribution exact, down to the passage.
- NIST AI 600-1, Generative AI Profile, risk "Information Integrity" ([link](https://doi.org/10.6028/NIST.AI.600-1)). A link to the exact passage helps the user tell sourced facts from altered ones.
- C2PA, Content Credentials: C2PA Technical Specification, version 2.5 ([link](https://spec.c2pa.org/specifications/specifications/2.5/specs/C2PA_Specification.html)). C2PA addresses provenance of media files. This pattern addresses provenance of a single claim in text.
- Google PAIR People + AI Guidebook, chapter "Explainability + Trust" ([link](https://pair.withgoogle.com/chapter/explainability-trust/)).
- Text fragments in URLs are defined in the WICG URL Fragment Text Directives specification. This pattern names it as one possible locator for web pages.
