---
status: Editor's Draft
id: INJ-3
title: Suspected injection notice
---

# INJ-3 Suspected injection notice

<dl class="pattern-meta">
  <dt>Area</dt><dd>Injection warnings</dd>
  <dt>Applies when</dt><dd>The system detects, or tries to detect, instructions in external content.</dd>
  <dt>Related</dt><dd><a href="./source-trust-labels">INJ-1</a>, <a href="./confirm-triggered-actions">INJ-2</a>, <a href="../privacy/egress-notice">PRV-2</a></dd>
</dl>

## Summary

When the system finds text in external content that tries to direct the assistant, the interface tells the user.
It says what the assistant ignored, and where that text came from.

## Problem

Some systems detect prompt injection and quietly drop the suspect text.
The user then sees an answer that is shorter or different, with no reason.
They do not learn that a source tried to attack them, so they keep trust in that source.

Other systems show a loud alert, such as "Malicious content blocked!".
Detection is never certain, so this alert is sometimes wrong.
False alarms teach users to ignore the alert, and they can hide useful content.

## When to use

- A detector, a filter or the assistant itself flags text in external content as a possible instruction.
- The system ignored, removed or stopped because of that text.
- The flagged content came from a source that the user may use again, such as a web site, a sender or a shared file.

## When not to use

- The user typed the text themselves. That is trusted input, not injection.
- The system has no detector. Do not show a notice, and do not show a badge that says content is safe. Rely on [INJ-1](./source-trust-labels) and [INJ-2](./confirm-triggered-actions).

## Anatomy

1. **Notice.** A short message next to the affected answer.
2. **Source.** The origin label of the flagged content.
3. **Outcome.** What the assistant did, such as "ignored this text" or "stopped the task".
4. **Show text control.** A button that shows the flagged text.
5. **Flagged text.** The suspect text, shown as plain text.
6. **Report control.** A way to tell the operator that the notice is wrong.

## Requirements

::: req INJ-3.1
When the system ignores or removes external content because it looks like an instruction, the interface MUST tell the user.
:::

::: req INJ-3.2
The notice MUST name the source of the flagged content.
:::

::: req INJ-3.3
The notice MUST say what the assistant did with the flagged content.
:::

::: req INJ-3.4
The interface MUST show flagged text only as plain text, with no active links, images or formatting.
:::

::: req INJ-3.5
The interface SHOULD hide the flagged text until the user asks to see it.
:::

::: req INJ-3.6
The notice MUST describe the detection as a possibility, not as a certainty.
:::

::: req INJ-3.7
The interface SHOULD show the parts of the answer that do not depend on the flagged content.
:::

::: req INJ-3.8
The interface SHOULD let the user report a notice that they think is wrong.
:::

::: req INJ-3.9
The interface MUST NOT show a badge or message that says content is safe or free of injection.
:::

::: req INJ-3.10
If the user chooses to use flagged content, the interface MUST treat any action that it leads to as a triggered action.
:::

Note: [INJ-2 Confirm triggered actions](./confirm-triggered-actions) then applies to that action.

::: req INJ-3.11
The interface SHOULD keep the notice with the answer in the conversation history.
:::

## Wording

Describe what happened. Do not describe the attacker's intent.

- "This email contains text that looks like instructions to the assistant. The assistant ignored that text."
- "A web page in the results tried to change the task. The assistant stopped and did not use that page."

Use calm, specific words.

| Do | Do not |
|---|---|
| Looks like instructions | Malicious |
| The assistant ignored this text | Attack blocked! |
| Show the ignored text | View threat |
| Report a wrong notice | Dispute |
| (no badge) | Safe, Clean, Verified |

## Accessibility

- **4.1.3 Status Messages (AA).** If the notice appears after the answer starts, announce it once with `role="status"`. Do not interrupt with an alert.
- **1.3.1 Info and Relationships (A).** Put the notice inside the answer container, so a screen reader user hears it with the answer.
- **1.4.1 Use of Color (A).** The notice text explains the issue. An amber border or icon only repeats it.
- **1.4.3 Contrast (Minimum) (AA).** The notice text has a contrast ratio of at least 4.5:1.
- **4.1.2 Name, Role, Value (A).** The show text control is a button with `aria-expanded`. The WAI-ARIA disclosure pattern fits.
- **2.1.1 Keyboard (A)** and **2.4.7 Focus Visible (AA).** The user can reach the show text and report controls with the keyboard. Focus is visible.

## Security and privacy considerations

- **Suppression attacks.** An attacker can add fake instructions to good content, so the detector removes it. The notice and report control let users see and challenge this. See [INJ-3.7](#inj-3.7) and [INJ-3.8](#inj-3.8).
- **Flagged text is attacker text.** It can contain phishing links or misleading claims. [INJ-3.4](#inj-3.4) keeps it inert.
- **Detector details.** A precise reason, such as the rule that matched, helps attackers to avoid the detector. Show the outcome, not the detection method.
- **False sense of safety.** No notice does not mean no injection. Detectors miss attacks. [INJ-3.9](#inj-3.9) prevents a safety claim.
- **Report content.** A report sends the flagged content to the operator or a vendor. Say what the report includes before the user sends it. See [PRV-2](../privacy/egress-notice).

## Anti-patterns

- **Silent drop.** The system removes text and gives a shorter answer with no explanation.
- **Alarm language.** "Malicious content blocked!" for every match, including false positives.
- **Safe badge.** A green "No threats found" mark on content that the detector did not flag.
- **Rendered payload.** The notice shows the flagged text with live links and formatting.
- **Whole answer hidden.** One flagged sentence removes an answer that was mostly useful.
- **One-click override.** A "Use anyway" button that lets flagged text run actions with no further check.

## Demo

No demo yet. A demo is planned for version 0.2.

## Conformance checklist

- [INJ-3.1](#inj-3.1) A test page with a known injection string causes a notice when the detector flags it.
- [INJ-3.2](#inj-3.2) The notice names the source of the flagged content.
- [INJ-3.3](#inj-3.3) The notice says what the assistant did with the flagged content.
- [INJ-3.4](#inj-3.4) Flagged text shows as plain text, with no active links, images or formatting.
- [INJ-3.6](#inj-3.6) The notice says the text "looks like" instructions, or uses similar words of possibility.
- [INJ-3.9](#inj-3.9) No screen shows a "safe" or "no injection" badge.
- [INJ-3.10](#inj-3.10) An action that comes from flagged content that the user chose to use needs a confirmation.

## Prior art

- **OWASP Top 10 for LLM Applications 2025, LLM01:2025 Prompt Injection** ([link](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)). This pattern covers what the user sees when a defence against this risk acts.
- **Greshake et al., "Not what you've signed up for", AISec '23** ([arXiv 2302.12173](https://arxiv.org/abs/2302.12173)). The paper shows that injected text can arrive through retrieved content that the user never sees.
- **Hines et al., "Defending Against Indirect Prompt Injection Attacks With Spotlighting", 2024** ([arXiv 2403.14720](https://arxiv.org/abs/2403.14720)). An example of a defence that this notice can report on.
- **Microsoft HAX, G11 "Make clear why the system did what it did"** ([link](https://www.microsoft.com/en-us/haxtoolkit/library/)). The notice explains why an answer differs from what the user expected.
- **Google PAIR People + AI Guidebook, Errors + Graceful Failure** ([link](https://pair.withgoogle.com/chapter/errors-failing/)). The calm wording and the report control follow its approach to errors.
- **W3C WAI-ARIA Authoring Practices Guide, Disclosure (Show/Hide) Pattern** ([link](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)). The pattern for the show text control.
