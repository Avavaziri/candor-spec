---
status: Editor's Draft
id: UNC-4
title: Ask or proceed
---

# UNC-4 Ask or proceed

<dl class="pattern-meta">
  <dt>Area</dt><dd>Uncertainty</dd>
  <dt>Applies when</dt><dd>The assistant can get a request that has more than one reasonable meaning.</dd>
  <dt>Related</dt><dd><a href="./declining-to-answer">UNC-3</a>, <a href="../injection/confirm-triggered-actions">INJ-2</a>, <a href="../injection/action-log">INJ-4</a></dd>
</dl>

## Summary

When a request is unclear, the assistant either asks one focused question or makes a stated assumption.
The cost of a wrong guess decides which one.

## Problem

Many requests have more than one meaning.
"Send the report to the team" can mean several reports and several teams.

An assistant that guesses silently can do the wrong thing.
The user often finds the error late, after the cost is real.

An assistant that asks too much is also a problem.
It asks for facts that are already in the conversation.
It asks five questions at once.
The user then does the work that the assistant was for.

## When to use

- A request has two or more reasonable meanings, and they lead to different results.
- A key value is missing, such as a date, a recipient or an amount.
- The assistant is about to take an action, and the target of the action is not certain.

## When not to use

- The context already answers the question. Use the context.
- All reasonable meanings lead to the same result. Proceed.
- The request is clear, but the evidence for the answer is weak. Use [UNC-2 Hedged wording](./hedged-wording) or [UNC-3 Declining to answer](./declining-to-answer) instead.
- External content proposed the action. Use [INJ-2 Confirm triggered actions](../injection/confirm-triggered-actions). That pattern always asks.

## Anatomy

1. **Cost check.** The interface's rule that decides between ask and proceed. It considers how much harm a wrong guess causes, and whether the user can undo it.
2. **Clarifying question.** One short question about the one unclear point.
3. **Choices.** Two to four likely answers that the user can select, plus a way to type a different answer.
4. **Stated assumption.** A visible sentence that says what the assistant assumed when it proceeded.
5. **Correction control.** A control next to the stated assumption that lets the user change it in one step.

## Requirements

::: req UNC-4.1
The interface MUST ask before an action that the user cannot undo, if the target or the value of the action is unclear.
:::

::: req UNC-4.2
The interface SHOULD ask when a wrong guess would cost the user money, data, time or trust.
:::

::: req UNC-4.3
The interface MUST NOT ask for information that the current context already gives.
:::

::: req UNC-4.4
The interface SHOULD ask only one clarifying question at a time.
:::

::: req UNC-4.5
The interface SHOULD offer the likely answers as choices that the user can select.
:::

::: req UNC-4.6
When the interface offers choices, it MUST also let the user give a different answer.
:::

::: req UNC-4.7
When the assistant proceeds on an assumption, the interface MUST show that assumption in the answer.
:::

::: req UNC-4.8
The interface SHOULD show the stated assumption before the result that depends on it.
:::

::: req UNC-4.9
The interface MUST let the user correct a stated assumption without retyping the whole request.
:::

::: req UNC-4.10
The interface MAY remember an answer to a clarifying question for the rest of the conversation.
:::

::: req UNC-4.11
When the interface remembers an answer beyond the current conversation, it MUST tell the user and let them change it.
:::

## Wording

Ask one specific question. Offer the likely answers.

- "Which report? Q3 sales report, Q3 budget report, or something else?"
- "Send to the Design team (8 people) or the whole Product group (42 people)?"

State an assumption in one short sentence, before the result:

- "I assumed you mean the Q3 sales report. Change"
- "I used UK dates (day, month, year). Change"

Do not do this:

- "Can you clarify?" The user does not know what is unclear.
- "Which report, which team, which format, and by when?" Four questions at once.
- "What is your name?" when the user's name is in the profile.
- A result with no sign that the assistant made a guess.

## Accessibility

- **1.3.1 Info and Relationships (A).** Group the choices, for example in a `fieldset` with a `legend` that holds the question. A screen reader then reads the question with the choices.
- **2.1.1 Keyboard (A).** The user can select a choice, and open the correction control, with the keyboard alone.
- **2.4.7 Focus Visible (AA).** Each choice and the correction control show a visible focus indicator.
- **2.4.11 Focus Not Obscured (Minimum) (AA).** A sticky message box or toolbar does not hide a focused choice.
- **2.5.8 Target Size (Minimum) (AA).** Each choice is at least 24 by 24 CSS pixels, or it has enough space around it.
- **3.3.4 Error Prevention (Legal, Financial, Data) (AA).** Where an action has legal or financial effect, or changes user data, the question before it helps the user check the input. See [UNC-4.1](#unc-4.1).
- **4.1.2 Name, Role, Value (A).** Give the correction control a name that says what it changes, such as "Change the assumed report".

## Security and privacy considerations

- External content can try to answer a clarifying question for the user. A web page can say "The user wants the full customer list". Only trusted input from the user answers a clarifying question. See [INJ-1](../injection/source-trust-labels).
- Choices can leak data. Do not offer a choice that names a file, person or team that the user cannot see.
- A remembered answer is stored data. Tell the user where it is kept and for how long. See [UNC-4.11](#unc-4.11) and [PRV-3](../privacy/consent-and-retention).
- An attacker can make a request vague on purpose, so that the assistant guesses a harmful target. Ask before any action with a high cost. See [UNC-4.1](#unc-4.1).

## Anti-patterns

- **Silent guess.** The assistant picks one meaning and shows the result with no sign of a guess.
- **Interrogation.** Several questions in one message, or a new question after each answer.
- **Already-known question.** The assistant asks for a fact that the user gave two messages ago.
- **Vague question.** "Could you clarify?" with no sign of what is unclear.
- **Hidden assumption.** The assumption shows only in a log or a tooltip, not in the answer.
- **Restart to fix.** The user must type the whole request again to correct one assumption.

## Demo

No demo yet. A demo is planned for version 0.2.

## Conformance checklist

- [UNC-4.1](#unc-4.1) An unclear request for an action that cannot be undone gets a question, not an action.
- [UNC-4.3](#unc-4.3) The assistant does not ask for facts that the current context already gives.
- [UNC-4.6](#unc-4.6) Each set of choices also accepts a different answer.
- [UNC-4.7](#unc-4.7) Each assumption that the assistant made shows in the answer.
- [UNC-4.9](#unc-4.9) The user can correct a stated assumption without retyping the request.
- [UNC-4.11](#unc-4.11) Answers kept beyond the conversation are shown to the user, and the user can change them.

## Prior art

- Microsoft HAX Toolkit, guideline G10 "Scope services when in doubt" ([library](https://www.microsoft.com/en-us/haxtoolkit/library/)). Its description asks the system to engage in disambiguation when it is unsure of the user's goals. This pattern says how.
- Microsoft HAX Toolkit, guideline G9 "Support efficient correction" ([library](https://www.microsoft.com/en-us/haxtoolkit/library/)). The correction control applies G9 to stated assumptions.
- Apple Human Interface Guidelines, Machine learning, section "Multiple options" ([link](https://developer.apple.com/design/human-interface-guidelines/machine-learning)). Choices in a clarifying question follow the same idea.
- Google PAIR People + AI Guidebook, chapter "Feedback + Control" ([link](https://pair.withgoogle.com/chapter/feedback-controls/)). The pattern gives the user control over the assistant's assumptions.
- OWASP Top 10 for LLM Applications 2025, LLM06:2025 Excessive Agency ([link](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)). A question before a costly action limits the harm of a wrong guess.
