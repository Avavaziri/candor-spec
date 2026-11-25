---
status: Editor's Draft
id: PRV-1
title: Context indicator
---

# PRV-1 Context indicator

<dl class="pattern-meta">
  <dt>Area</dt><dd>Privacy boundaries</dd>
  <dt>Applies when</dt><dd>The assistant can read anything other than the current message. This includes almost every AI interface.</dd>
  <dt>Related</dt><dd><a href="./egress-notice">PRV-2</a>, <a href="./consent-and-retention">PRV-3</a>, <a href="../injection/source-trust-labels">INJ-1</a></dd>
</dl>

## Summary

A context indicator shows what the assistant can read now.
It lists each item by name. It lets the user remove an item.

## Problem

Users do not know what an assistant can see.
Some users think it sees only the message box. It can also see files, connected apps, memory from past sessions or the screen.
Other users think it sees everything. They then share less, or they trust answers that it could not have checked.

Both errors cause harm.
A user can paste a secret and not know that a connected app will receive it.
A user can ask about a document that the assistant cannot read, and get a guess that looks like an answer.

## When to use

- The assistant can read data other than the current message. Examples are earlier messages, attached files, connected data sources, saved memory, the screen and a text selection.
- The set of readable data can change during a conversation. For example, the assistant can open a file or search a mailbox.
- The assistant keeps memory across sessions.

## When not to use

- The assistant reads only the current message and keeps nothing. A short fixed statement of that fact is enough.
- Do not use the indicator to show what data leaves the device or tenant. Use [PRV-2 Egress notice](./egress-notice) for that. The two patterns often sit together.

## Anatomy

1. **Context control.** A control that is always on screen near the message box. It shows a short summary, such as "Context: 4 items".
2. **Context list.** A list that opens from the control. It names each item in context.
3. **Item type.** A label for each item, such as "File", "Connected app", "Memory" or "Screen".
4. **Access state.** For each item, "Read" if the assistant has read it, or "Can access" if it can read it but has not.
5. **Scope note.** For a connected source, the limit of access, such as "Read only" or "This folder only".
6. **Remove control.** A control that takes an item out of context.
7. **Change notice.** A short line in the conversation when an item enters context, such as "Assistant opened handbook.pdf".

## Requirements

::: req PRV-1.1
The interface MUST provide a context control that the user can reach from every screen where the assistant answers.
:::

::: req PRV-1.2
The context list MUST name every item that the assistant can read for the current answer.
:::

Note: "Every item" includes memory from past sessions, connected sources, the screen and selected text.

::: req PRV-1.3
The context list MUST show the type of each item.
:::

::: req PRV-1.4
The context list MUST show for each item whether the assistant has read it or only can access it.
:::

::: req PRV-1.5
For each connected source, the context list SHOULD show the scope of access, such as read only or one folder.
:::

::: req PRV-1.6
The interface MUST show a change notice in the conversation when an item enters context during the conversation.
:::

::: req PRV-1.7
The interface MUST update the context control when the context changes.
:::

::: req PRV-1.8
The interface SHOULD let the user remove any item from context that the operator does not require.
:::

::: req PRV-1.9
After the user removes an item, the assistant MUST NOT read that item again unless the user adds it back.
:::

::: req PRV-1.10
If the operator requires an item, the context list MUST say that the operator requires it.
:::

::: req PRV-1.11
The interface MUST show memory from past sessions as context items, with a link to view and delete them.
:::

Note: [PRV-3 Consent and retention](./consent-and-retention) covers how long memory stays.

::: req PRV-1.12
The interface MUST NOT include content in context that the user cannot see in the context list.
:::

Note: Operator instructions count. List them as one item, such as "Instructions from your organisation". The list does not need to show their text.

::: req PRV-1.13
The interface MAY group items of the same type, if the user can expand the group to see each item.
:::

## Wording

Name items by what the user knows, not by how the system stores them.

| Do | Do not |
|---|---|
| Team calendar (read only) | calendar_connector_v2 |
| Memory: 2 saved facts | Persistent user embeddings |
| Your screen: Budget window | Screen capture stream |

Use two plain access states:

- "Read": the assistant has used this item in this conversation.
- "Can access": the assistant can open this item, but has not yet.

Write change notices as a fact about an action:

- "Assistant opened handbook.pdf."
- "Assistant searched your mailbox for 'invoice'."
- "You removed Q3-budget.xlsx from context."

## Accessibility

- **1.3.1 Info and Relationships (A).** Mark the context list up as a list. Put each item's type, access state and remove control in the same list item.
- **1.4.1 Use of Color (A).** Use text for the access state. Do not show "Read" and "Can access" by colour alone.
- **1.4.3 Contrast (Minimum) (AA).** The summary text on the context control meets 4.5:1. Users need to read it at a glance.
- **2.1.1 Keyboard (A)** and **2.4.7 Focus Visible (AA).** The context control, each remove control and the list itself work with the keyboard and show focus.
- **2.4.3 Focus Order (A).** After the user removes an item, move focus to the next item, or to the context control if the list is empty.
- **4.1.2 Name, Role, Value (A).** Each remove control has an accessible name that includes the item name, such as "Remove Q3-budget.xlsx". The context control states whether the list is open.
- **4.1.3 Status Messages (AA).** Put change notices in a polite live region, so screen reader users hear "Assistant opened handbook.pdf" without a focus change.
- **2.5.8 Target Size (Minimum) (AA).** Remove controls are at least 24 by 24 CSS pixels, or have enough space around them.

## Security and privacy considerations

- External content can try to add items to context. A web page can tell the assistant to open the user's mailbox. Each new item must show a change notice, so the user sees it. See [INJ-1](../injection/source-trust-labels) and [INJ-4](../injection/action-log).
- The context list itself can expose data. A file name such as "redundancy-list.xlsx" can be sensitive. Show the list only to the user who owns the conversation, and do not include it in shared links by default.
- A removed item can stay in the assistant's working memory for the current answer. Make removal take effect from the next answer at the latest, and say so.
- Simon Willison's "lethal trifecta" names private data as one of three risky capabilities. A clear context list helps the user see when private data and untrusted content meet.

## Anti-patterns

- **Hidden memory.** The assistant uses facts from past sessions, but the context list does not show them. The user cannot correct or delete what they cannot see.
- **"Connected" with no scope.** The list says "Google Drive connected" but not which folders or whether the assistant can write.
- **Settings-only list.** The list exists only in a settings page. The user cannot check it while they write a message.
- **Silent file opens.** The assistant opens a file and quotes it, but the conversation shows no notice.
- **Remove that does not remove.** The item leaves the list, but the assistant still reads it.
- **Count without names.** "Context: 12 items" with no way to see the items.

## Demo

<Demo src="context-indicator.html" title="PRV-1 demo: a context control that lists four items, and a notice when the assistant opens a new file" :height="600" />

## Conformance checklist

- [PRV-1.1](#prv-1.1) A context control is visible on every screen where the assistant answers.
- [PRV-1.2](#prv-1.2) The context list names every readable item, including memory, connected sources and the screen.
- [PRV-1.3](#prv-1.3) Each item in the list shows its type.
- [PRV-1.4](#prv-1.4) Each item shows "Read" or "Can access", or equivalent text.
- [PRV-1.6](#prv-1.6) A change notice appears in the conversation when the assistant opens a new item.
- [PRV-1.7](#prv-1.7) The context control summary updates when an item enters or leaves context.
- [PRV-1.9](#prv-1.9) After removal, a test shows that the assistant no longer reads the item.
- [PRV-1.10](#prv-1.10) Each item that the operator requires says so in the list.
- [PRV-1.11](#prv-1.11) Memory from past sessions shows as context items, with a link to view and delete them.
- [PRV-1.12](#prv-1.12) A test shows no data in context that the context list does not name.

## Prior art

- Microsoft HAX Toolkit, guideline G17 "Provide global controls" ([link](https://www.microsoft.com/en-us/haxtoolkit/library/)). The context list is a control over what the system monitors.
- Microsoft HAX Toolkit, guideline G1 "Make clear what the system can do" ([link](https://www.microsoft.com/en-us/haxtoolkit/library/)). The list makes clear what the assistant can read.
- Google PAIR People + AI Guidebook, chapter "Mental Models" ([link](https://pair.withgoogle.com/chapter/mental-models/)). The list corrects wrong beliefs about what the assistant knows.
- Apple Human Interface Guidelines, "Generative AI", section "Privacy" ([link](https://developer.apple.com/design/human-interface-guidelines/generative-ai)). Platform guidance on privacy in generative features.
- Simon Willison, "The lethal trifecta for AI agents" ([link](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)). Access to private data is one of the three risky capabilities.
- NIST AI 600-1 Generative AI Profile, risk 4 "Data Privacy" ([link](https://doi.org/10.6028/NIST.AI.600-1)). Names data privacy as a generative AI risk.
