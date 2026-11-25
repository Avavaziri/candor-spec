---
status: Editor's Draft
id: PRV-3
title: Consent and retention
---

# PRV-3 Consent and retention

<dl class="pattern-meta">
  <dt>Area</dt><dd>Privacy boundaries</dd>
  <dt>Applies when</dt><dd>The interface stores conversations, files or memory, or uses them for any purpose other than the current answer.</dd>
  <dt>Related</dt><dd><a href="./context-indicator">PRV-1</a>, <a href="./egress-notice">PRV-2</a></dd>
</dl>

## Summary

The interface asks before it keeps or reuses the user's data.
It shows how long each type of data stays, and it lets the user delete it.

## Problem

Users share a lot with an assistant. They share drafts, health questions, work files and personal facts.
Many users do not know that their conversations can be stored for months or used to improve a model.

Interfaces often hide these choices.
They bundle consent with the terms of service, tick the box in advance or put the control deep in settings.
When a user deletes a conversation, they often do not know if copies stay in backups or logs.

## When to use

- The interface stores conversations, files, memory or usage data after the current answer.
- The operator or a provider can use the data to train or improve a model or product.
- The user can save memory that the assistant uses in later sessions.

## When not to use

- The interface stores nothing after the session ends, and uses data only for the current answer. A short fixed statement of that fact is enough.
- Do not use this pattern for consent to a single action, such as sending an email. Use [INJ-2](../injection/confirm-triggered-actions) for actions.

## Anatomy

1. **Consent prompt.** A separate choice for each optional use of data, such as "Use my conversations to improve the product".
2. **Retention summary.** A plain table of each data type and how long it stays.
3. **Data controls.** A place where the user can view, export and delete stored conversations and memory.
4. **Deletion confirmation.** A message that says what deletion removes, what it does not remove and when.
5. **Operator policy label.** A label that shows when the operator, not the user, sets a rule.

## Requirements

::: req PRV-3.1
The interface MUST ask for separate consent before it uses the user's data to train or improve a model or product.
:::

::: req PRV-3.2
Each optional use of data MUST be off until the user turns it on.
:::

::: req PRV-3.3
The interface MUST NOT bundle consent for an optional use with acceptance of the terms of service.
:::

::: req PRV-3.4
The interface MUST NOT block access to the main feature when the user declines an optional use.
:::

Note: An operator can make a use mandatory if the feature cannot work without it. That use is then not optional, and [PRV-3.11](#prv-3.11) applies.

::: req PRV-3.5
The user MUST be able to withdraw consent with no more steps than it took to give it.
:::

::: req PRV-3.6
The interface MUST show a retention period for each type of stored data, in days, months or a stated event.
:::

::: req PRV-3.7
The interface MUST let the user view and delete each stored conversation and each memory item.
:::

::: req PRV-3.8
Before a deletion, the interface MUST say what the deletion does not remove, such as backups, logs or data already used in training.
:::

::: req PRV-3.9
The deletion confirmation MUST state when the deletion will be complete in all copies.
:::

::: req PRV-3.10
The interface SHOULD let the user export their stored conversations and memory in a common format.
:::

::: req PRV-3.11
When the operator sets a rule for consent or retention, the interface MUST label it as an operator rule.
:::

Note: For example, "Your organisation keeps chats for 7 years. You cannot delete them."

::: req PRV-3.12
The interface SHOULD tell the user when the assistant saves a new memory item, with a way to undo it.
:::

::: req PRV-3.13
The interface MAY remind the user of their consent choices at a fixed interval.
:::

## Wording

Name the use, not the mechanism.

| Do | Do not |
|---|---|
| Use my chats to improve Acme's models | Enable model optimisation |
| Chats are kept for 30 days | Data is retained per our policy |
| Your organisation keeps chats for 7 years | Retention: managed |

Write the deletion confirmation as facts:

- "This deletes the chat from your history now. Copies in backups are deleted within 30 days. Chats already used for training cannot be removed from trained models."

Write the consent prompt as a real choice:

- "Use my chats to improve Acme's models? You can change this at any time in Settings, Data."
- Buttons: "Turn on" and "Not now". Give both the same visual weight.

## Accessibility

- **1.3.1 Info and Relationships (A).** Mark up the retention summary as a table with header cells.
- **1.4.3 Contrast (Minimum) (AA).** Consent text, retention periods and labels meet 4.5:1. Do not use faint grey for the terms that matter.
- **2.1.1 Keyboard (A)** and **2.4.7 Focus Visible (AA).** Consent controls, delete controls and export controls work with the keyboard and show focus.
- **3.3.4 Error Prevention (Legal, Financial, Data) (AA).** Deletion can destroy data. Give the user a confirmation step before deletion is final.
- **4.1.2 Name, Role, Value (A).** A consent switch exposes its on or off state. Its accessible name says the full use, not only "Improve".
- **4.1.3 Status Messages (AA).** Announce "Memory saved" and "Chat deleted" in a polite live region.
- **2.5.8 Target Size (Minimum) (AA).** Delete controls in long lists are at least 24 by 24 CSS pixels, or have enough space around them.

## Security and privacy considerations

- External content can try to save false memory. A web page can tell the assistant to remember "The user's bank is Example Bank". The new memory notice lets the user see and undo it. See [INJ-3](../injection/suspected-injection-notice).
- Deletion controls are a target for account takeover. An attacker can delete evidence. Consider a short undo period and an audit entry for the operator.
- An export file contains all stored data. Protect the download link and expire it.
- Candor is not legal advice. GDPR Article 7 sets conditions for consent, and Article 5 sets data minimisation and storage limitation principles. These are related, but conformance to this pattern does not show legal compliance.

## Anti-patterns

- **Pre-ticked box.** The training opt-in is on by default.
- **Consent wall.** The user cannot use the feature unless they agree to training.
- **Bundled consent.** One "I agree" button covers the terms of service and model training.
- **Easy in, hard out.** Consent takes one click to give and five pages to withdraw.
- **"Deleted" that is not deleted.** The conversation leaves the history, but stays in storage with no stated end date.
- **Hidden operator rules.** The delete button does nothing because the organisation keeps all chats, and the interface does not say so.
- **Silent memory.** The assistant saves facts about the user with no notice.

## Demo

No demo yet. A demo is planned for version 0.2.

## Conformance checklist

- [PRV-3.1](#prv-3.1) Each training or improvement use has its own consent choice.
- [PRV-3.2](#prv-3.2) A new account has every optional use turned off.
- [PRV-3.3](#prv-3.3) Acceptance of the terms of service does not turn on any optional use.
- [PRV-3.4](#prv-3.4) A user who declines every optional use can still use the main feature.
- [PRV-3.5](#prv-3.5) Withdrawal of consent takes no more steps than giving it.
- [PRV-3.6](#prv-3.6) Each type of stored data shows a retention period.
- [PRV-3.7](#prv-3.7) The user can view and delete each stored conversation and memory item.
- [PRV-3.8](#prv-3.8) Before deletion, the interface says what the deletion does not remove.
- [PRV-3.9](#prv-3.9) The deletion confirmation states when deletion is complete in all copies.
- [PRV-3.11](#prv-3.11) Each operator rule for consent or retention has an operator label.

## Prior art

- GDPR, Regulation (EU) 2016/679, Article 7 "Conditions for consent", and Article 5(1)(c) data minimisation and 5(1)(e) storage limitation ([link](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)). Related legal principles. Candor is not legal advice.
- NIST AI 600-1 Generative AI Profile, risk 4 "Data Privacy" ([link](https://doi.org/10.6028/NIST.AI.600-1)). Names data privacy as a generative AI risk.
- Microsoft HAX Toolkit, guideline G16 "Convey the consequences of user actions" ([link](https://www.microsoft.com/en-us/haxtoolkit/library/)). Consent and memory choices change future behaviour, so the interface says how.
- Microsoft HAX Toolkit, guideline G17 "Provide global controls" ([link](https://www.microsoft.com/en-us/haxtoolkit/library/)). Data controls are global controls.
- Google PAIR People + AI Guidebook, chapter "Data Collection + Evaluation" ([link](https://pair.withgoogle.com/chapter/data-collection/)). Guidance on collecting user data with care.
- Apple Human Interface Guidelines, "Generative AI", section "Privacy" ([link](https://developer.apple.com/design/human-interface-guidelines/generative-ai)). Platform guidance on privacy in generative features.
