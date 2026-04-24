# Process Flow Diagram Guide

> High-quality reference guide and ruleset for creating **Process Flow Diagrams (PFDs)** clearly, consistently, and correctly.
>
> This document is designed to be used as a **primary source** for humans and AI Agents that need to analyze, review, or draw Process Flow Diagrams.

---

# 1. Purpose of this guide

This guide defines:

- what a **Process Flow Diagram** is
- what it is **for** and **not for**
- how it differs from an **Activity Diagram**
- the standard visual elements commonly used in practice
- a recommended method for drawing a good process flow
- quality rules, anti-patterns, and validation checklists
- strict operational rules for AI Agents

The goal is to make the resulting diagram:

- easy to read
- logically correct
- business-oriented
- consistent
- usable for explanation, analysis, and documentation

---

# 2. What is a Process Flow Diagram?

A **Process Flow Diagram (PFD)** is a diagram that shows **how a process moves from one step to another**.

It focuses on:

- the sequence of activities
- decisions in the process
- handoffs between people, teams, or systems
- inputs and outputs at a practical business level

A Process Flow Diagram answers questions like:

- What happens first?
- What happens next?
- Where is a decision made?
- Who performs each step?
- Where does the process end?
- Where do delays, rework, or bottlenecks occur?

In simple terms:

> A Process Flow Diagram describes **how work flows through a process**.

---

# 3. Core nature of a Process Flow Diagram

To draw a good PFD, understand its real purpose.

## 3.1 It is process-oriented

A PFD is primarily used to model:

- business workflows
- operational procedures
- approval flows
- service flows
- administrative steps
- human/system interaction at process level

It is not mainly intended to model detailed object behavior or formal execution semantics.

## 3.2 It prioritizes clarity over formal UML semantics

Unlike UML Activity Diagram, a Process Flow Diagram is typically more practical and communication-oriented.

Its main goal is:

- communicate the process clearly
- help stakeholders understand steps and decisions
- identify inefficiency or missing steps
- support requirements analysis and business analysis

## 3.3 It is often used before detailed system modeling

In many real projects, PFD is used **before** deeper system design.

Typical progression:

1. Understand the business process
2. Draw the Process Flow Diagram
3. Identify responsibilities and problem points
4. Derive features, requirements, use cases, or system behaviors
5. Then move to Activity Diagram, Use Case Diagram, Sequence Diagram, etc.

---

# 4. When should you use a Process Flow Diagram?

Use a PFD when you want to describe:

- an end-to-end business process
- a user or staff workflow
- an approval or review process
- a service or support flow
- a process involving departments or roles
- a high-level operational procedure

Typical examples:

- Student submits assignment → Lecturer reviews → System records result
- Customer places order → Staff verifies → Payment is confirmed → Order is fulfilled
- Applicant submits request → HR checks information → Manager approves/rejects
- Waiter takes order → Kitchen prepares food → Cashier processes payment

---

# 5. When should you NOT use a Process Flow Diagram?

Do **not** use PFD as the main diagram when you need to model:

- formal UML behavior semantics
- concurrency with precise synchronization semantics
- token-based control/data flow semantics
- object interactions over time
- message passing between system components
- detailed software design logic

In those cases, consider:

- **Activity Diagram** for UML workflow behavior
- **Sequence Diagram** for interactions over time
- **State Machine Diagram** for state transitions
- **BPMN** for richer business process modeling when needed

---

# 6. Common notations used in Process Flow Diagram

Process Flow Diagram notation is usually simpler and more business-friendly than UML Activity Diagram.

The most common symbols are these.

## 6.0 Wonton POS project rule

For this repository, Process Flow Diagrams must be authored as **Mermaid `flowchart`** sources and must not use swimlanes.

Canonical PFD sources belong under:

- `docs/diagrams/mermaid/process-flow/`

Rendered PFD outputs belong under:

- `docs/diagrams/mermaid/process-flow/rendered/`

If a PFD needs to show responsibility or handoff, express it through concise step labels or branch labels instead of lane partitions.

Wonton POS PFD notation is also fixed as follows:

- `Start` and `End` must use white ellipse terminals
- decision points must use white diamond nodes
- process steps must use white rectangle nodes
- branch labels must remain explicit (`Yes`, `No`, `Valid`, `Invalid`, etc.)

Examples:

- `Customer enters credentials`
- `System validates credentials`
- `FOH Staff confirms handoff`
- `Manager approves refund`

## 6.1 Start / End

Used to show where the process begins or finishes.

Typical notation:

- white ellipse / terminator shape

Recommended labels:

- `Start`
- `End`
- `Process completed`
- `Request rejected`

Rule:

- every meaningful PFD should have a clear start
- every major path should end clearly

## 6.2 Process Step

Used to represent a concrete step in the workflow.

Typical notation:

- rectangle

Examples:

- `Receive request`
- `Check application`
- `Approve payment`
- `Update record`
- `Notify customer`

Naming rule:

- use **verb + object**
- keep it concise
- one step should represent one clear action

Good:

- `Validate form`
- `Review application`
- `Send confirmation email`

Bad:

- `Form`
- `Application handling`
- `System`

## 6.3 Decision

Used to show a branching point where the process can go in different directions.

Typical notation:

- diamond
- in this repository, use a white diamond
- in Mermaid, keep the decision question inside the diamond when readable and keep outgoing branch labels explicit

Examples:

- `Information complete?`
- `Payment successful?`
- `Manager approves?`

Rule:

- outgoing branches should be labeled clearly
- common labels: `Yes` / `No`, `Approved` / `Rejected`, `Valid` / `Invalid`

## 6.4 Flow Arrow

Used to connect steps and show direction.

Typical notation:

- directional arrow line

Rule:

- arrows should indicate the intended reading direction clearly
- avoid ambiguous crossings where possible

## 6.5 Input / Output or Document (optional)

Some PFD styles use document/input/output symbols to show artifacts.

Examples:

- request form
- invoice
- receipt
- report

Use these only when the document/artifact is important to process understanding.

## 6.6 Connector (optional)

Used when the process is too large and needs a visual continuation.

Use sparingly.

Too many connectors often indicate that the diagram is too complex and should be decomposed.

## 6.7 Responsibility labels instead of swimlanes

For this repository's PFDs, do not divide the diagram by swimlanes.

When responsibility matters, include the responsible actor or system in the process-step label.

Examples:

- `Customer selects account action`
- `System validates credentials`
- `Manager approves refund`
- `FOH Staff confirms handoff`

---

# 7. Recommended visual grammar for a high-quality Process Flow Diagram

Use this as the default style.

## 7.1 Flow direction

Prefer one primary reading direction:

- top-to-bottom, or
- left-to-right

Do not mix directions randomly.

## 7.2 One box = one step

Each process box should contain one clear step only.

Do not overload a single box with many actions.

Bad example:

- `Check form, update database, send email, and archive request`

Better split:

- `Check form`
- `Update database`
- `Send email`
- `Archive request`

## 7.3 Decision text should be a question or condition

Good:

- `Payment successful?`
- `Form complete?`
- `Table available?`

Not ideal:

- `Payment`
- `Validation`

## 7.4 Branches must be labeled

For every decision, label the outgoing branches.

Examples:

- `Yes` / `No`
- `Approved` / `Rejected`
- `In stock` / `Out of stock`

## 7.5 Keep responsibility visible

If many actors are involved, keep responsibility visible through concise step labels, not swimlanes.

## 7.6 Keep the level of abstraction consistent

Do not mix:

- very high-level business steps
- low-level implementation or code details

Example of bad mixing:

- `Manager approves request`
- `Execute SQL INSERT`
- `Send JavaScript toast message`

A PFD should usually stay at process/business level, not implementation level.

---

# 8. How to draw a Process Flow Diagram step by step

This is the recommended default workflow.

## Step 1: Define the exact process scope

Choose one process only.

Good scopes:

- `Loan book process`
- `Place in-store order`
- `Approve leave request`
- `Student course registration`

Bad scopes:

- `University system`
- `Restaurant management`
- `E-commerce platform`

## Step 2: Write the process in text first

Before drawing, write the steps as plain text.

Example:

1. Customer submits order
2. Staff checks order details
3. If information is missing, request correction
4. If valid, calculate amount
5. Customer pays
6. System confirms payment
7. Staff prepares order
8. Customer receives order

## Step 3: Identify process elements

Mark the text flow into categories:

- action steps
- decisions
- rework loops
- start/end points
- actors/roles
- important inputs/outputs

## Step 4: Create the main happy path first

Draw the straight-through successful process first.

Do not start with edge cases.

## Step 5: Add decision branches

Where the text says:

- if
- whether
- approved?
- valid?
- available?

Add a decision node.

## Step 6: Add rework or exception paths

Example:

- missing information → return to applicant
- payment failed → retry or cancel
- manager rejects → close request

## Step 7: Add responsibility context if needed

Do not add swimlanes. Add responsibility context into concise step labels only when it improves understanding.

## Step 8: Simplify and clean layout

- reduce crossing arrows
- keep a consistent direction
- align nodes
- remove unnecessary details

---

# 9. How Process Flow Diagram differs from Activity Diagram

This is the most important comparison section.

## 9.1 Main difference in purpose

### Process Flow Diagram

Focuses on:

- **business/process understanding**
- readable workflow communication
- practical operational flow
- stakeholder communication

### Activity Diagram

Focuses on:

- **UML behavior modeling**
- control flow and data flow semantics
- system or business behavior in a more formal modeling language
- concurrency, synchronization, control nodes, object flows

In simple terms:

> Process Flow Diagram is usually more practical and communication-driven.
>
> Activity Diagram is more formal and UML-driven.

## 9.2 Formality level

### Process Flow Diagram

- usually lighter
- often tool/style dependent
- less formally constrained
- easier for non-technical stakeholders

### Activity Diagram

- part of UML
- uses formal node semantics
- better for precise modeling
- better when academic UML correctness matters

## 9.3 Typical notation difference

### Process Flow Diagram

Often uses:

- start/end terminator
- process rectangle
- decision diamond
- arrows
- responsibility labels when a role or handoff matters

### Activity Diagram

Uses UML concepts such as:

- initial node
- activity final node
- flow final node
- action
- decision node
- merge node
- fork node
- join node
- object node
- control flow
- object flow
- activity partitions

## 9.4 Concurrency modeling

### Process Flow Diagram

- can show parallel ideas informally if needed
- often not modeled with strict formal semantics

### Activity Diagram

- explicitly supports concurrency with **fork** and **join**
- synchronization has formal meaning

## 9.5 Data/object modeling

### Process Flow Diagram

- may show documents or outputs informally
- usually less formal about data tokens and object flow

### Activity Diagram

- can model object nodes and object flows explicitly
- better when data movement matters in behavior modeling

## 9.6 Best use case for each

### Choose Process Flow Diagram when:

- you need to explain a business process clearly
- your audience includes non-technical stakeholders
- the goal is workflow understanding
- you want a process-first picture before detailed UML

### Choose Activity Diagram when:

- the assignment requires UML correctness
- you need formal behavior modeling
- you need explicit decisions, merge, fork, join
- you need system-oriented logic with more precision

---

# 10. Practical comparison table

| Aspect | Process Flow Diagram | Activity Diagram |
|---|---|---|
| Main goal | Explain process/workflow | Model behavior in UML |
| Formality | Lower | Higher |
| Audience | Business users, analysts, stakeholders | Analysts, designers, developers, academics |
| Standard basis | Common process/flow conventions | UML standard |
| Parallel flow | Informal or simplified | Formal via fork/join |
| Data flow semantics | Usually lightweight | More explicit via object flow/object node |
| Good for | Business process explanation | Detailed workflow behavior modeling |
| Best stage | Early analysis / process understanding | Detailed analysis / design / UML tasks |

---

# 11. Mapping from Process Flow Diagram to Activity Diagram

A useful way to think:

- PFD is often the **business workflow view**
- AD is often the **formal UML behavior view**

Approximate mapping:

- Start/End in PFD → Initial / Final nodes in AD
- Process box in PFD → Action in AD
- Decision diamond in PFD → Decision + guards in AD
- Responsibility label in PFD → Activity Partition in AD when a formal UML partition is needed
- Important document/output in PFD → Object Node in AD when needed
- Informal parallel step in PFD → Fork/Join in AD when concurrency must be modeled formally

---

# 12. Anti-patterns in Process Flow Diagram

These should be avoided.

## 12.1 Mixing business process and technical implementation

Bad:

- `Customer submits application`
- `System calls REST API`
- `Execute SQL query`
- `Render HTML response`

Choose one level.

For business PFD, stay at business/process level.

## 12.2 Missing branch labels

A decision without `Yes/No` or equivalent labels causes ambiguity.

## 12.3 No clear end state

Every meaningful process path should have a clear end.

## 12.4 Overly large diagram

If the process is too big, decompose it into:

- one main end-to-end diagram
- one or more sub-process diagrams

## 12.5 Turning the diagram into plain text in boxes

Do not fill a box with a full paragraph.

Use short action names.

## 12.6 Crossing arrows everywhere

Too many crossings reduce readability and often indicate poor layout or poor decomposition.

## 12.7 Using symbols inconsistently

If a rectangle means process step in one part, do not use the same rectangle as a data artifact elsewhere.

---

# 13. Quality checklist for reviewing a Process Flow Diagram

Use this checklist before finalizing.

## Scope check

- Does the diagram represent one clear process?
- Is the start point explicit?
- Are the possible end states explicit?

## Logical check

- Does each step follow logically from the previous one?
- Are decisions placed in the correct position?
- Are exception or rework flows represented?

## Readability check

- Is the flow direction consistent?
- Are step names concise and action-oriented?
- Are branch labels clear?
- Are there too many crossing arrows?

## Responsibility check

- If multiple roles exist, is responsibility clear without swimlanes?
- Is it clear who performs each step?

## Abstraction check

- Is the level of detail consistent?
- Is the diagram business-focused rather than implementation-focused?

---

# 14. Default recommendations

Use this as the default style unless there is a special requirement.

1. Model **one process per diagram**
2. Keep the process at **business/workflow level**
3. Use **verb + object** for each process step
4. Use **decision diamonds only for branching logic**
5. Label every decision branch
6. Do **not** use swimlanes in this repository's PFDs; show role responsibility in step labels when needed
7. Prefer simple, readable layout over decorative complexity
8. If the process becomes too complex, split it into sub-processes
9. Use Process Flow Diagram first, then refine into Activity Diagram if formal UML is needed
10. Author repository PFD sources as Mermaid `flowchart` files (`.mmd`)

---

# 15. AI Agent Ruleset for generating Process Flow Diagrams

This section is written as operational guidance for AI Agents.

## 15.1 Primary objective

When asked to generate a Process Flow Diagram, the agent must:

- identify the business process clearly
- represent the flow in a readable sequence
- distinguish actions, decisions, and handoffs
- avoid UML-specific overcomplication unless explicitly requested
- produce a process-oriented diagram, not a code-level diagram

## 15.2 Required interpretation rules

The agent must interpret:

- verbs and procedural steps as **process steps**
- if/else conditions as **decision nodes**
- corrections/retries as **rework loops**
- different actors/roles as concise step-label context when useful
- outputs/documents as optional artifacts only if they improve understanding

## 15.3 Mandatory diagram rules

The agent must:

- create one clear start
- create one or more clear end states
- use concise action names
- label decision branches
- keep a consistent reading direction
- avoid unnecessary technical detail
- identify responsibilities clearly without using swimlanes

## 15.4 Things the agent must avoid

The agent must not:

- confuse Process Flow Diagram with UML Activity Diagram
- introduce fork/join semantics unless the user explicitly wants a formal UML Activity Diagram
- turn business process steps into low-level software implementation steps
- mix too many abstraction levels in one diagram
- leave decision branches unlabeled
- create a giant unreadable diagram when decomposition is needed

## 15.5 When to recommend Activity Diagram instead

The agent should recommend using an Activity Diagram when:

- the user explicitly asks for UML correctness
- the task is part of UML coursework or diagram standards
- formal concurrency must be represented
- object/data flow semantics matter
- the user asks for initial node, flow final, merge, fork, join, etc.

---

# 16. Prompt template for AI Agent usage

Use or adapt this prompt.

```text
Create a Process Flow Diagram for the described business process.

Requirements:
- Focus on process/workflow clarity
- Use business-level steps, not code-level implementation
- Use concise verb + object labels
- Use white decision diamonds only where branching is needed
- Label all decision branches clearly
- Do not use swimlanes; include role/system responsibility in concise step labels when needed
- Use white ellipse terminals for `Start` and `End`
- Author the PFD as a Mermaid `flowchart`
- Keep one consistent reading direction
- Ensure all main paths end clearly
- If the process is too large, decompose it into a main process and sub-processes

Also explain:
1. the main flow
2. the decision points
3. the roles involved
4. any rework/exception paths
```

---

# 17. Simple example

## Example process: Leave request approval

Text process:

1. Employee submits leave request
2. HR checks request completeness
3. If incomplete, return request to employee
4. If complete, send request to manager
5. Manager reviews request
6. If approved, HR records leave
7. HR notifies employee
8. If rejected, HR notifies employee

### Good PFD structure

- Start
- `Submit leave request`
- `Check request completeness`
- `Complete?`
  - No → `Return request for correction` → back to employee
  - Yes → `Send request to manager`
- `Review request`
- `Approved?`
  - Yes → `Record leave`
  - No → `Prepare rejection notice`
- `Notify employee`
- End

Responsibility labels:

- `Employee submits leave request`
- `HR checks request completeness`
- `Manager reviews request`

---

# 18. Final takeaway

A Process Flow Diagram is best used to show:

- how work flows
- who does what
- where decisions happen
- how the process ends

It is ideal for:

- business analysis
- process explanation
- workflow communication
- early-stage requirements analysis

It is different from Activity Diagram because it is usually:

- less formal
- easier for stakeholders
- more process-oriented
- less focused on UML execution semantics

Use Process Flow Diagram to understand and communicate the process.
Use Activity Diagram when you need stricter UML behavior modeling.
