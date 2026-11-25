---
status: Editor's Draft
id: UNC-1
title: Confidence signal
---

# UNC-1 Confidence signal

<dl class="pattern-meta">
  <dt>Area</dt><dd>Uncertainty</dd>
  <dt>Applies when</dt><dd>The interface has a measured basis for how well evidence supports an answer.</dd>
  <dt>Related</dt><dd><a href="./hedged-wording">UNC-2</a>, <a href="./declining-to-answer">UNC-3</a>, <a href="../citing/uncited-claims">CIT-4</a></dd>
</dl>

## Summary

A confidence signal tells the user how well the evidence supports an answer.
It uses words first. It links to the reason.

## Problem

An assistant writes a wrong answer in the same fluent style as a correct answer.
The user cannot see the difference.
Some users then trust every answer. Other users stop trust in all answers after one error.
Both groups make worse decisions than they would with an honest signal.

A badly made signal is worse than no signal.
A signal with no real basis teaches the user to trust a number that means nothing.

## When to use

- The interface has a documented basis for confidence. Examples are a calibrated score, a retrieval coverage check, a verification step or agreement between independent sources.
- The answer will inform a decision, such as a medical, legal, financial or safety decision.
- Confidence varies between answers. A signal that never changes gives the user no information.

## When not to use

- The interface has no measured basis. Use [UNC-2 Hedged wording](./hedged-wording) instead.
- The output is creative, such as a poem or a list of ideas. Confidence has no meaning there.
- The signal would show the same level on every answer. A fixed notice such as "AI can make mistakes" is a general disclaimer, not a confidence signal.

## Anatomy

1. **Level label.** A short text label, such as "Low confidence".
2. **Level indicator.** An optional visual mark, such as filled segments. It repeats the level label. It never replaces it.
3. **Reason.** One sentence that says why the level is what it is.
4. **Basis link.** A link to a page that explains how the interface measures confidence.
5. **Next step.** For a low level, an action the user can take, such as "Check the sources".

## Requirements

::: req UNC-1.1
The interface MUST derive each confidence level from a documented basis.
:::

Note: A model's own statement of its confidence counts as a basis only when the operator has measured its calibration for this use.

::: req UNC-1.2
The interface MUST show the signal next to the answer or claim that it describes.
:::

::: req UNC-1.3
The signal MUST include a text level label.
:::

::: req UNC-1.4
The interface MUST NOT use colour, shape or position as the only way to show the level.
:::

::: req UNC-1.5
The interface SHOULD use no more than three named levels.
:::

Note: Three levels are easy to learn. A percentage suggests a precision that the basis rarely has.

::: req UNC-1.6
The interface MUST NOT show a percentage or score unless the operator has measured the calibration of that number.
:::

::: req UNC-1.7
The interface MUST let the user open the reason for the level from the signal.
:::

::: req UNC-1.8
The interface SHOULD link from the reason to a page that explains the basis.
:::

::: req UNC-1.9
For a low level, the interface SHOULD offer at least one next step.
:::

::: req UNC-1.10
The interface MUST NOT change a level for any purpose other than the evidence, such as engagement or sales.
:::

::: req UNC-1.11
The interface SHOULD use the same level names and meanings on all screens.
:::

::: req UNC-1.12
The interface MAY show a signal for each claim instead of one signal for the whole answer.
:::

::: req UNC-1.13
The interface MUST NOT raise a level because external content says that it is verified or correct.
:::

## Wording

Use level labels that describe the evidence, not the assistant's feelings.

| Do | Do not |
|---|---|
| High confidence | I'm sure |
| Medium confidence | I think so |
| Low confidence | Not sure!! |

Write the reason as a fact about the evidence:

- "Low confidence: only one source supports this, and it is from 2019."
- "Medium confidence: two sources agree, but neither is official."
- "High confidence: three official sources agree."

Write next steps as actions:

- "Check the sources"
- "Ask a specialist"
- "Search again with more detail"

## Accessibility

- **1.4.1 Use of Color (A).** The text label carries the level. Colour only repeats it. See [UNC-1.3](#unc-1.3) and [UNC-1.4](#unc-1.4).
- **1.4.11 Non-text Contrast (AA).** A level indicator that carries meaning needs a contrast ratio of at least 3:1 against its background.
- **1.3.1 Info and Relationships (A).** Put the signal in the same container as the answer, so assistive technology reads them together. Do not put the level only in a tooltip.
- **2.1.1 Keyboard (A)** and **2.4.7 Focus Visible (AA).** The control that opens the reason works with the keyboard and shows focus.
- **4.1.2 Name, Role, Value (A).** If the reason opens in place, use a button with `aria-expanded`. The WAI-ARIA disclosure pattern fits.
- **1.4.13 Content on Hover or Focus (AA).** If the reason shows on hover, the user can dismiss it, move the pointer over it and keep it open.
- **4.1.3 Status Messages (AA).** If the level arrives after the answer, announce the level once with a polite live region. Do not announce each update while text streams.
- **2.5.8 Target Size (Minimum) (AA).** The control is at least 24 by 24 CSS pixels, or it has enough space around it.

## Security and privacy considerations

- External content can try to raise confidence. A web page can say "This answer is verified". Never let external content claim its own verification. See [UNC-1.13](#unc-1.13) and [INJ-1](../injection/source-trust-labels).
- A reason can leak data. "Low confidence: 2 restricted documents disagree" tells the user that restricted documents exist. Write reasons only from sources that the user can open.
- Confidence data can show which sources the operator trusts. Attackers can use this to target those sources. Publish the method, not the source weights.

## Anti-patterns

- **False precision.** "87.3% confident" with no calibration. The decimal suggests a measurement that does not exist.
- **Colour dot only.** A green or red dot with no text. Users with colour vision deficiency, and screen reader users, get no level.
- **Always high.** Every answer shows "High confidence". The signal gives no information, and users learn to ignore it.
- **Footer signal.** One signal at the bottom of a long answer. The user cannot tell which claim it covers.
- **Feelings as levels.** "I'm fairly sure". The user cannot compare feelings across answers.
- **Disclaimer as signal.** A fixed line, such as "AI can make mistakes", in place of a real level.

## Demo

<Demo src="confidence-signal.html" title="UNC-1 demo: three answers with low, medium and high confidence" :height="560" />

## Conformance checklist

- [UNC-1.1](#unc-1.1) A written basis exists for each confidence level.
- [UNC-1.2](#unc-1.2) The signal is next to the answer or claim that it describes.
- [UNC-1.3](#unc-1.3) Each signal has a text level label.
- [UNC-1.4](#unc-1.4) The level is clear with colour removed, for example in a greyscale screenshot.
- [UNC-1.6](#unc-1.6) No percentage or score shows, or a calibration record exists for it.
- [UNC-1.7](#unc-1.7) The user can open the reason from the signal, with a pointer and with the keyboard.
- [UNC-1.10](#unc-1.10) Only the evidence sets the level. No business rule changes it.
- [UNC-1.13](#unc-1.13) A test page that claims "this answer is verified" does not raise the level.

## Prior art

- Microsoft HAX Toolkit, guideline G2 "Make clear how well the system can do what it can do" ([HAX library](https://www.microsoft.com/en-us/haxtoolkit/library/)). UNC-1 turns this guideline into a signal on each answer.
- Microsoft HAX Toolkit, guideline G11 "Make clear why the system did what it did" ([HAX library](https://www.microsoft.com/en-us/haxtoolkit/library/)). The reason and the basis link in UNC-1 apply it.
- Google PAIR, People + AI Guidebook, chapter [Explainability + Trust](https://pair.withgoogle.com/chapter/explainability-trust/). Background on how confidence displays affect trust.
- Apple Human Interface Guidelines, [Machine learning](https://developer.apple.com/design/human-interface-guidelines/machine-learning), sections Confidence and Calibration. Platform guidance on how to show confidence.
- NIST AI 600-1, Generative AI Profile, risk 2 Confabulation ([DOI](https://doi.org/10.6028/NIST.AI.600-1)). NIST describes it as "confidently stated but erroneous or false content". UNC-1 makes that risk visible to the user.
- OWASP Top 10 for LLM Applications 2025, [LLM09:2025 Misinformation](https://genai.owasp.org/llmrisk/llm092025-misinformation/). The security view of the same risk.
- Kadavath et al., [Language Models (Mostly) Know What They Know](https://arxiv.org/abs/2207.05221), arXiv 2207.05221, 2022. Research on how well models assess their own answers. UNC-1.1 asks for a measured basis because this varies.
