---
status: Editor's Draft
---

# Terminology

These terms have the meanings below in every Candor pattern.

## Interface
The part of a product that a person sees and uses. Candor requirements apply to the interface.

## Assistant
The AI system behind the interface. It can be one model, several models or a model with tools.

## User
The person who uses the interface. The user is the only party who can authorise an action.

## Operator
The organisation that provides the interface to the user. An employer or a vendor can be the operator.

## Answer
Output from the assistant that the interface shows to the user. One answer can contain many claims.

## Claim
One statement of fact in an answer. A claim can be true or false.

## Confidence
How strongly the interface's evidence supports a claim or an answer. Confidence is a property of the evidence, not a feeling of the assistant.

## Basis
The documented method that produces a confidence level. Examples are a calibrated score, a retrieval check and a verification step.

## Source
A document, record, web page or tool result that the assistant used.

## Citation
A visible link in an answer from a claim to a source.

## Trusted input
Input from the user or the operator through a channel that the interface controls. Examples are the message box and the operator's settings.

## External content
Any content that did not come from trusted input. Examples are web pages, emails, files, tool results and output from other agents. External content can contain text that looks like instructions.

## Prompt injection
Text in external content that tries to change what the assistant does. In indirect prompt injection, the user did not write the text and often cannot see it.

## Triggered action
An action that the assistant proposes after it reads external content. The user did not ask for the action in their own words.

## Action
Anything the assistant does outside the conversation. Examples are sending a message, changing a file, buying something or calling an API with side effects.

## Context
All data the assistant can read for the current answer. Context includes the conversation, attached files, connected data and memory.

## Egress
Movement of data out of a boundary that the user or operator controls. Examples are the device, the operator's tenant and the country of storage.

## Retention
How long a system keeps data after the user sends it, and what it uses the data for.

## Redaction
Removal or masking of data before it leaves a boundary.
