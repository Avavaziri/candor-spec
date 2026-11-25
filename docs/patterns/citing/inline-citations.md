---
status: Editor's Draft
id: CIT-1
title: Inline citations
---

# CIT-1 Inline citations

<dl class="pattern-meta">
  <dt>Area</dt><dd>Verifiable citing</dd>
  <dt>Applies when</dt><dd>The interface shows sources for an answer.</dd>
  <dt>Related</dt><dd><a href="./source-preview">CIT-2</a>, <a href="./quote-to-source">CIT-3</a>, <a href="./uncited-claims">CIT-4</a>, <a href="../injection/source-trust-labels">INJ-1</a></dd>
</dl>

## Summary

An inline citation puts a link to the source at the claim that it supports.
The user can see which source supports which claim, and can check it.

## Problem

Many interfaces put a list of sources at the end of an answer.
The user cannot tell which source supports which claim.
Some listed sources support nothing in the answer. Some do not exist.
The list looks like evidence, so the user trusts the answer more than the evidence allows.

A citation that the user cannot check is decoration.
A citation to a source that does not exist is a false statement.

## When to use

- The assistant uses retrieved sources, such as documents, web pages, records or tool results.
- The interface says, or suggests, that the answer is based on those sources.
- The user can make a decision from the answer, and needs to check the facts first.

## When not to use

- The answer has no retrieved sources. Do not add citations to make it look grounded. Use [CIT-4 Uncited claims](./uncited-claims) to show what has no source.
- The output is creative or is a draft that the user wrote. Citations have no meaning there.
- The source is the user's own message in the same conversation. A citation to it adds noise.

## Anatomy

1. **Claim.** The text that the citation supports. It can be one sentence or part of a sentence.
2. **Marker.** A small link or button directly after the claim, such as a number. One claim can have several markers.
3. **Accessible name.** The name that assistive technology reads for the marker. It names the source.
4. **Source list.** A list of all cited sources after the answer. Its numbers match the markers.
5. **Trust label.** The [INJ-1](../injection/source-trust-labels) label for a source that is external content.

## Requirements

::: req CIT-1.1
The interface MUST place each marker directly after the claim that it supports.
:::

::: req CIT-1.2
The interface MUST NOT show a citation for a source that the assistant did not retrieve for this answer.
:::

Note: A model can write a plausible title or URL from memory. That is not a retrieved source.

::: req CIT-1.3
Before it shows a citation, the interface MUST confirm that the cited source exists and that its link resolves.
:::

::: req CIT-1.4
The interface MUST NOT cite a source unless a check found support for the claim in that source.
:::

Note: The check can be an automatic match of the claim against the source passage. [CIT-3](./quote-to-source) shows the passage to the user.

::: req CIT-1.5
Each marker MUST be a link or a button that the user can operate.
:::

::: req CIT-1.6
The accessible name of each marker MUST include the title of the source.
:::

::: req CIT-1.7
The interface MUST show a source list that contains every source that a marker refers to.
:::

::: req CIT-1.8
Each marker and its entry in the source list MUST use the same number or label.
:::

::: req CIT-1.9
The interface MAY attach more than one marker to one claim.
:::

::: req CIT-1.10
The interface SHOULD NOT list a source that supports no claim in the answer.
:::

Note: If the interface shows sources that it read but did not use, put them in a separate list with a clear name, such as "Also read".

::: req CIT-1.11
The interface MUST show the INJ-1 trust label for each cited source that is external content.
:::

::: req CIT-1.12
The interface SHOULD show the date of each source in the source list.
:::

## Wording

Make the accessible name of a marker say what it is and where it goes:

| Do | Do not |
|---|---|
| "Source 2: Travel policy 2026, HR handbook" | "2" |
| "Source 1: Expenses guide, Finance team" | "Link" |
| "Sources 1 and 3" | "Citation" |

Name the list in plain words:

- "Sources" for the cited list.
- "Also read" for sources that the assistant read but did not cite.

When a source has no date, write "No date" in the list. Do not leave the field empty.

## Accessibility

- **2.4.4 Link Purpose (In Context) (A).** A marker such as "2" has no purpose on its own. Give it an accessible name that includes the source title. See [CIT-1.6](#cit-1.6).
- **4.1.2 Name, Role, Value (A).** A marker that opens a preview in place is a button with `aria-expanded`. A marker that goes to another page is a link.
- **1.3.1 Info and Relationships (A).** Put the marker in the same text node or element as its claim. Use an ordered list for the source list.
- **2.1.1 Keyboard (A)** and **2.4.7 Focus Visible (AA).** Each marker works with the keyboard and shows a visible focus indicator.
- **2.4.3 Focus Order (A).** Markers receive focus in reading order, after the claim that they follow.
- **2.5.8 Target Size (Minimum) (AA).** A superscript number is often smaller than 24 by 24 CSS pixels. Give it padding, or enough space around it, to meet the minimum.
- **1.4.3 Contrast (Minimum) (AA).** Marker text has a contrast ratio of at least 4.5:1. Small superscripts often fail this.
- **1.4.1 Use of Color (A).** Do not mark cited text with colour alone. The marker is the signal.

## Security and privacy considerations

- External content can contain fake citations. A web page can include text such as "Source: official government report". Show only sources that the system retrieved. See [CIT-1.2](#cit-1.2).
- A citation link can go to a harmful site. A retrieved page can redirect to a phishing page. Show the real destination domain in the source list, and apply the [INJ-1](../injection/source-trust-labels) label.
- A citation can leak data. A citation to a restricted document tells the user that the document exists. Cite only sources that this user is allowed to open, or say that access is restricted. See [CIT-2](./source-preview).
- A citation link can carry tracking data. Remove session tokens and personal data from URLs before you show them.

## Anti-patterns

- **End-only list.** A source list with no markers in the text. The user cannot match claims to sources.
- **Bare numbers.** Markers named "1", "2" and "3" for screen reader users. The user hears numbers, not sources.
- **Invented sources.** A title or URL that the model wrote from memory. The link fails, or goes to a page that does not support the claim.
- **Citation padding.** Many sources on every claim to look thorough. Most of them do not support the claim.
- **Paragraph citation.** One marker at the end of a long paragraph. The user cannot tell which sentence it covers.
- **Tiny targets.** Superscript markers that are hard to tap on a touch screen.

## Demo

<Demo src="inline-citations.html" title="CIT-1 demo: an answer with two inline citations, source previews and one uncited claim" :height="640" />

## Conformance checklist

- [CIT-1.1](#cit-1.1) Each marker is directly after the claim that it supports.
- [CIT-1.2](#cit-1.2) Each cited source is in the retrieval record for the answer.
- [CIT-1.3](#cit-1.3) Each cited link resolves when the answer shows.
- [CIT-1.4](#cit-1.4) For a sample of citations, the cited source contains support for the claim.
- [CIT-1.5](#cit-1.5) Each marker is a link or a button that works with a pointer and with the keyboard.
- [CIT-1.6](#cit-1.6) A screen reader announces the source title for each marker.
- [CIT-1.7](#cit-1.7) The source list contains every source that a marker refers to.
- [CIT-1.8](#cit-1.8) Each marker number matches the number in the source list.
- [CIT-1.11](#cit-1.11) Each external source in the list shows its trust label.

## Prior art

- Apple Human Interface Guidelines, Machine learning, section "Attribution" ([link](https://developer.apple.com/design/human-interface-guidelines/machine-learning)). This pattern applies attribution to each claim in an answer.
- Google PAIR People + AI Guidebook, chapter "Explainability + Trust" ([link](https://pair.withgoogle.com/chapter/explainability-trust/)). Citations are one way to explain where an answer came from.
- Microsoft HAX Toolkit, guideline G11 "Make clear why the system did what it did" ([link](https://www.microsoft.com/en-us/haxtoolkit/library/)). An inline citation shows the evidence behind each claim.
- NIST AI 600-1, Generative AI Profile, risks "Confabulation" and "Information Integrity" ([link](https://doi.org/10.6028/NIST.AI.600-1)). Checked citations let the user find confabulated claims.
- OWASP Top 10 for LLM Applications 2025, LLM09:2025 Misinformation ([link](https://genai.owasp.org/llmrisk/llm092025-misinformation/)). Verifiable sources reduce the effect of misinformation on the user.
- W3C WCAG 2.2, success criterion 2.4.4 Link Purpose (In Context) ([link](https://www.w3.org/TR/WCAG22/)). This is the basis for named markers.
