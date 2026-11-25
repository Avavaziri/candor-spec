---
status: Editor's Draft
id: INJ-4
title: Action log
---

# INJ-4 Action log

<dl class="pattern-meta">
  <dt>Area</dt><dd>Injection warnings</dd>
  <dt>Applies when</dt><dd>The assistant can call tools or take actions outside the conversation.</dd>
  <dt>Related</dt><dd><a href="./confirm-triggered-actions">INJ-2</a>, <a href="./source-trust-labels">INJ-1</a>, <a href="../privacy/consent-and-retention">PRV-3</a></dd>
</dl>

## Summary

An action log is a list, in time order, of every action the assistant took or tried.
Each entry says what happened, what caused it and what the result was.

## Problem

An assistant can make many tool calls in one task.
Most of them are not visible in the answer.
If one of them was wrong, or came from injected content, the user cannot find it.

Without a log, the user cannot answer basic questions.
What did the assistant send? To whom? Why? Can I undo it?
The operator also cannot investigate an incident.

## When to use

- The assistant can call tools, use connected apps or take actions.
- The assistant can work for a long time, or in the background, without the user watching.
- A user or operator may need to check later what happened.

## When not to use

- The assistant only writes text in the conversation, and it calls no tools. The conversation is then the full record.
- Do not use the log as the only safety control. A log shows harm after it happens. [INJ-2](./confirm-triggered-actions) stops harm before it happens.

## Anatomy

1. **Log view.** A list of entries in time order, which the user can open from the task.
2. **Entry.** One action or tool call.
3. **Action and target.** What the assistant did, and to what. For example, "Forwarded 3 emails to x@example.net".
4. **Trigger.** What caused the action: the user's request, or external content with its origin label.
5. **Parameters.** The values that the action used, shown on request.
6. **Result.** Done, failed, denied or undone.
7. **Time.** When the action happened.
8. **Undo control.** A control that reverses the action, where that is possible.
9. **Export control.** A control that saves the log as a file.

## Requirements

::: req INJ-4.1
The interface MUST record each action that the assistant takes or tries, in time order.
:::

::: req INJ-4.2
Each entry MUST show the action, the target, the time and the result.
:::

::: req INJ-4.3
Each entry MUST show the trigger: a user request, or external content with its origin label.
:::

::: req INJ-4.4
Each entry SHOULD show the parameters, or let the user expand them.
:::

::: req INJ-4.5
The log MUST include actions that the user denied and actions that failed.
:::

::: req INJ-4.6
The interface MUST NOT let the assistant change or delete log entries.
:::

::: req INJ-4.7
The interface MUST let the user open the log while the task runs.
:::

::: req INJ-4.8
The interface MUST keep the log available after the task ends, for a period that it states.
:::

::: req INJ-4.9
The log MUST NOT show secrets, such as passwords or access tokens, in full.
:::

::: req INJ-4.10
For an action that the user can undo, the entry SHOULD include an undo control.
:::

::: req INJ-4.11
The interface SHOULD let the user export the log in a documented format.
:::

::: req INJ-4.12
The log SHOULD use the same action names as the confirmation in INJ-2.
:::

::: req INJ-4.13
The interface MAY group read-only tool calls, such as searches, into one entry that the user can expand.
:::

## Wording

Write each entry as a short past-tense statement. Put the result first.

- "Done: Forwarded 3 emails to x@example.net. Triggered by: Email from orders@example.com. You allowed this once."
- "Denied: Share folder 'Payroll' with x@example.net. Triggered by: Web page example.net/offer."
- "Failed: Book meeting room 4. The room was not free."
- "Undone: Deleted draft 'Q4 plan'."

Name the trigger in the same way every time.

| Do | Do not |
|---|---|
| Triggered by: your request | Auto |
| Triggered by: Email from orders@example.com | System |
| Triggered by: Web page example.net/offer | Agent decided |

## Accessibility

- **1.3.1 Info and Relationships (A).** Mark up the log as an ordered list. Use the `time` element for times.
- **1.4.1 Use of Color (A).** The result is a word, such as "Done" or "Denied". A coloured icon only repeats it.
- **4.1.3 Status Messages (AA).** If the log updates while the task runs, announce only important changes, such as a failure. Do not announce each tool call.
- **4.1.2 Name, Role, Value (A).** Each undo button names its action, for example "Undo: forward 3 emails". A list of buttons all called "Undo" is not usable.
- **2.1.1 Keyboard (A)** and **2.4.7 Focus Visible (AA).** The user can reach expand, undo and export controls with the keyboard. Focus is visible.
- **2.5.8 Target Size (Minimum) (AA).** Undo and expand controls are at least 24 by 24 CSS pixels, or have enough space around them.

## Security and privacy considerations

- **Integrity.** The log is evidence. Store it where the assistant cannot write to it. [INJ-4.6](#inj-4.6) covers the interface. The storage also needs this protection.
- **Injected entries.** External content can contain text that looks like a log entry. Build log entries only from system events, never from assistant text.
- **Secrets in parameters.** Tool calls can carry tokens, passwords or keys. [INJ-4.9](#inj-4.9) masks them.
- **Personal data.** The log holds email addresses, file names and message text. Treat it as personal data. State how long it stays, as in [PRV-3](../privacy/consent-and-retention).
- **Exports.** An exported log leaves the interface's control. Say what the file contains before the user saves it.

## Anti-patterns

- **Answer-only record.** The only record of actions is what the assistant says it did. The assistant can be wrong or misled.
- **Developer-only log.** The log exists, but only engineers can read it.
- **Missing denials.** The log shows only actions that ran. An attack that the user denied leaves no trace.
- **Editable history.** The assistant can rewrite or remove entries.
- **Unnamed undo.** Ten buttons that all say "Undo".
- **Raw dumps.** Each entry is a block of JSON with no plain summary.

## Demo

No demo yet. A demo is planned for version 0.2.

## Conformance checklist

- [INJ-4.1](#inj-4.1) Each action from a test task appears in the log, in time order.
- [INJ-4.2](#inj-4.2) Each entry shows the action, the target, the time and the result.
- [INJ-4.3](#inj-4.3) Each entry shows its trigger. Entries from external content show its origin label.
- [INJ-4.5](#inj-4.5) A denied action and a failed action both appear in the log.
- [INJ-4.6](#inj-4.6) The assistant has no way to change or delete an entry.
- [INJ-4.7](#inj-4.7) The user can open the log while a task runs.
- [INJ-4.8](#inj-4.8) The log is available after the task ends, and the interface states for how long.
- [INJ-4.9](#inj-4.9) A test action with a token parameter shows the token masked.

## Prior art

- **OWASP Top 10 for LLM Applications 2025, LLM06:2025 Excessive Agency** ([link](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)). The log makes the assistant's agency visible and open to review.
- **Microsoft HAX, G9 "Support efficient correction"** ([link](https://www.microsoft.com/en-us/haxtoolkit/library/)). The undo control applies this guideline to actions.
- **Microsoft HAX, G11 "Make clear why the system did what it did"** ([link](https://www.microsoft.com/en-us/haxtoolkit/library/)). The trigger field records why each action happened.
- **NIST AI RMF 1.0 (NIST AI 100-1), Accountable and Transparent** ([link](https://doi.org/10.6028/NIST.AI.100-1)). The log is one way to support this trustworthiness characteristic.
- **Simon Willison, "The lethal trifecta for AI agents", 16 June 2025** ([link](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)). The log records each external communication, which is the step that leaks data.
