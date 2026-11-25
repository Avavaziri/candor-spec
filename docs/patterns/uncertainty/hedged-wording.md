---
status: Editor's Draft
id: UNC-2
title: Hedged wording
---

# UNC-2 Hedged wording

<dl class="pattern-meta">
  <dt>Area</dt><dd>Uncertainty</dd>
  <dt>Applies when</dt><dd>The interface shows answers in natural language.</dd>
  <dt>Related</dt><dd><a href="./confidence-signal">UNC-1</a>, <a href="./declining-to-answer">UNC-3</a>, <a href="../citing/uncited-claims">CIT-4</a></dd>
</dl>

## Summary

Hedged wording makes the words of an answer match the strength of its evidence.
Strong evidence gets plain statements. Weak evidence gets a clear, specific hedge.

## Problem

Fluent text sounds certain, even when the evidence is weak.
Users read tone as a signal of truth.
A weak claim in a confident tone misleads the user.

The opposite also does harm.
An answer that hedges every sentence hides which claims are weak.
Users learn to skip the hedges, so a real warning gets lost.

## When to use

- The interface shows answers as sentences, in any product.
- The strength of evidence varies between claims in one answer.
- The interface has no measured confidence basis. Hedged wording is then the main way to show uncertainty.
- The interface shows a [UNC-1 Confidence signal](./confidence-signal). The wording then agrees with the signal.

## When not to use

- The output is creative, such as fiction or a list of ideas. A hedge on a poem has no meaning.
- The text is a direct quote from a source. Do not change a quote. Put the hedge outside the quote marks.
- The evidence is so weak that no answer is honest. Use [UNC-3 Declining to answer](./declining-to-answer) instead.

## Anatomy

1. **Plain claim.** A statement with no hedge, for claims with strong evidence.
2. **Hedge term.** A word or short phrase from a fixed vocabulary, such as "probably" or "one source says".
3. **Hedge reason.** A short clause that says why the claim is weak, such as "the only source is from 2019".
4. **Hedge vocabulary.** The written list of hedge terms that the product uses, and the confidence level each term maps to.

## Requirements

::: req UNC-2.1
The interface MUST NOT state a claim without a hedge when its evidence is at the lowest level that the interface uses.
:::

::: req UNC-2.2
The interface MUST NOT hedge a claim that has strong evidence only to avoid liability.
:::

Note: A fixed disclaimer belongs in one place in the interface. It does not belong in each sentence.

::: req UNC-2.3
The interface SHOULD put the hedge on the claim that is weak, not on the whole answer.
:::

::: req UNC-2.4
The operator SHOULD keep a written hedge vocabulary that maps each hedge term to one confidence level.
:::

::: req UNC-2.5
When the interface also shows a confidence signal, the hedge term MUST agree with the level of that signal.
:::

::: req UNC-2.6
The interface SHOULD NOT put more than one hedge term on one claim.
:::

Note: "It might possibly be the case that perhaps" tells the user nothing more than "probably". It is only harder to read.

::: req UNC-2.7
The interface SHOULD give the reason for a hedge when the reason is short and the user can check it.
:::

::: req UNC-2.8
The interface MUST NOT change the words inside a direct quote to add or remove a hedge.
:::

::: req UNC-2.9
The interface MUST NOT use the format of the text, such as italics or colour, as the only sign of a hedge.
:::

::: req UNC-2.10
The interface MAY use a softer hedge for a claim that the user can easily check and that has a low cost if wrong.
:::

## Wording

Use a small, fixed vocabulary. Map each term to a level.

| Level | Hedge terms | Example |
|---|---|---|
| High | No hedge | "The office closes at 6pm." |
| Medium | "probably", "most sources say" | "The office probably closes at 6pm on Fridays." |
| Low | "one source says", "it is not clear, but" | "One source says the office closes at 5pm on Fridays. That source is from 2019." |

Do this:

- Put the hedge next to the weak claim. "The fee is £40. The refund time is probably 10 days."
- Name the reason. "One source says 10 days, but it is 3 years old."
- Keep strong claims plain. "The fee is £40."

Do not do this:

- "I believe it may possibly be around £40, but please verify." This stacks three hedges on a claim with strong evidence.
- "As an AI, I could be wrong about everything below." This hedges the whole answer and hides which claim is weak.
- "Definitely 10 days!" for a claim with one old source.

## Accessibility

- **1.4.1 Use of Color (A).** A hedge is in words. Italics, grey text or colour can repeat it, but they never carry it alone. See [UNC-2.9](#unc-2.9).
- **1.4.3 Contrast (Minimum) (AA).** Hedged text keeps normal contrast. Do not fade weak claims to a light grey. Low-contrast text is harder to read, not easier to doubt.
- **1.3.1 Info and Relationships (A).** If the hedge reason is in a separate element, keep it in the same block as the claim, so a screen reader reads them together.
- **4.1.2 Name, Role, Value (A).** If the reason opens from a control, give the control a name that includes the claim, such as "Why is the refund time uncertain?".

## Security and privacy considerations

- External content can contain confident language, such as "This is the official and final figure". The interface sets the hedge from its own evidence, not from the tone of a source. See [INJ-1](../injection/source-trust-labels).
- A hedge reason can leak data. "Two documents that you cannot open disagree" tells the user that those documents exist. Write reasons only from sources that the user can open.
- An attacker can try to make an answer hedge a true claim, to cause doubt. Hedge terms follow the evidence basis, so one hostile source does not lower a claim that other sources support.

## Anti-patterns

- **Hedge everything.** Every sentence starts with "I think" or "It may be". Users stop reading the hedges, and a real warning gets lost.
- **Stacked hedges.** "It might possibly perhaps be". The user cannot tell how weak the claim is.
- **Liability hedge.** A strong claim with a hedge added only to protect the operator. It makes the true claim look weak.
- **Confident guess.** A plain, confident claim from weak or no evidence.
- **Tone mismatch.** The confidence signal says "Low confidence", but the text says "Definitely".
- **Grey-out.** Weak claims in faint grey text, with no words to say why.

## Demo

No demo yet. A demo is planned for version 0.2.

## Conformance checklist

- [UNC-2.1](#unc-2.1) Each claim at the lowest evidence level has a hedge term.
- [UNC-2.2](#unc-2.2) Claims with strong evidence have no hedge added only for liability.
- [UNC-2.5](#unc-2.5) Where a confidence signal shows, the hedge term agrees with its level.
- [UNC-2.8](#unc-2.8) Direct quotes are not changed to add or remove a hedge.
- [UNC-2.9](#unc-2.9) Each hedge is clear in plain text, with formatting and colour removed.

## Prior art

- Microsoft HAX Toolkit, guideline G2 "Make clear how well the system can do what it can do" ([link](https://www.microsoft.com/en-us/haxtoolkit/guideline/make-clear-how-well-the-system-can-do-what-it-can-do/)). This pattern applies G2 at the level of each sentence.
- NIST AI 600-1, Generative AI Profile, risk 2 "Confabulation" ([DOI](https://doi.org/10.6028/NIST.AI.600-1)). Hedged wording stops a weak claim from sounding certain.
- OWASP Top 10 for LLM Applications 2025, LLM09:2025 Misinformation ([link](https://genai.owasp.org/llmrisk/llm092025-misinformation/)). The pattern reduces over-reliance on unsupported output.
- Apple Human Interface Guidelines, Machine learning, section "Confidence" ([link](https://developer.apple.com/design/human-interface-guidelines/machine-learning)). This pattern adds a fixed hedge vocabulary to that guidance.
- Kadavath et al., "Language Models (Mostly) Know What They Know", 2022 ([arXiv 2207.05221](https://arxiv.org/abs/2207.05221)). Research on model self-assessment. It is a reason to measure calibration before a model's own hedges are trusted.
