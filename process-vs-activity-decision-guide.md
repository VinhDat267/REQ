# Process Flow Diagram vs Activity Diagram Decision Guide

A practical decision guide and ruleset for AI Agents, analysts, students, and diagram authors.

---

# 0. Wonton POS project policy

For this repository:

- UML Activity Diagrams (`AD`), use-case diagrams, ERDs, and other UML-style canonical diagrams should be authored in **PlantUML**
- Process Flow Diagrams (`PFD`) should be authored in **Mermaid `flowchart`** syntax
- Mermaid PFD sources live under `docs/diagrams/mermaid/process-flow/`
- Process Flow Diagrams (`PFD`) must not use swimlanes
- Wonton POS PFDs must use white ellipse `Start` / `End` terminals
- Wonton POS PFDs must use white diamond decision nodes
- if PFD responsibility or handoff matters, show it through concise step labels or branch labels

---

# 1. Purpose of this document

This guide helps an AI Agent decide **when to use a Process Flow Diagram (PFD)** and **when to use an Activity Diagram (AD)**, so it does not choose the wrong notation.

Use this document as a **decision source**, not just as a theory note.

Goals:
- choose the correct diagram type before drawing
- avoid mixing business-flow notation with UML behavioral notation
- define clear decision rules for assignments, documentation, and software analysis work
- reduce ambiguity when the user says only “draw the flow” or “draw the process”

---

# 2. Executive summary

## Default recommendation

### Choose **Process Flow Diagram** when:
- the goal is to explain a **business process / workflow**
- the audience is mainly **business stakeholders, BA, lecturer, non-technical readers**
- the diagram should be **easy to read quickly**
- the task is about **process understanding, process improvement, operational workflow**
- UML formality is **not explicitly required**

### Choose **Activity Diagram** when:
- the task explicitly asks for **UML**
- the source is **Use Case Specification**, **SRS**, **software design**, or **system behavior modeling**
- the goal is to model **control flow, branching, concurrency, roles, and system actions** more formally
- the course, teacher, or project requires **standard UML notation**

## One-sentence memory rule

- **Process Flow Diagram = business workflow communication**
- **Activity Diagram = UML behavioral modeling**

---

# 3. Core difference in nature

## 3.1 Process Flow Diagram

A Process Flow Diagram focuses on **how work moves through a process**.

It usually answers questions like:
- what happens first?
- what happens next?
- where are the decisions?
- who does what?
- where does the process end?

It is often used for:
- business process explanation
- operational procedure documentation
- workflow analysis
- requirement discovery
- stakeholder discussion

Its strength is **clarity and accessibility**.

It is usually less formal than UML and is often shaped by practical communication needs.

## 3.2 Activity Diagram

An Activity Diagram is a **UML behavioral diagram**.

It models:
- actions
- control flow
- decision logic
- merge logic
- concurrency with fork/join
- possible data/object flow
- responsibility separation with swimlanes / partitions

It is stronger when you need:
- a more standard software-modeling language
- a diagram that aligns with UML semantics
- formal modeling of system behavior or use case flow

Its strength is **semantic precision**.

---

# 4. Fast decision table

| Situation | Better choice | Why |
|---|---|---|
| Lecturer asks for UML Activity Diagram | Activity Diagram | Explicit notation requirement |
| Need to model a Use Case flow from Use Case Specification | Activity Diagram | Directly aligned with system behavior modeling |
| Need to explain a business procedure to non-technical people | Process Flow Diagram | Easier to read and communicate |
| Need a quick workflow for operations or service process | Process Flow Diagram | Simple and practical |
| Need to show parallel processing formally | Activity Diagram | Fork/join semantics are stronger |
| Need to discuss departments/roles in an organization workflow | Process Flow Diagram with responsibility labels, or Activity Diagram with swimlanes | Depends on whether UML is required |
| Requirement is vague: “draw the flow” | Prefer Process Flow Diagram first | Safer and easier unless UML is explicitly requested |
| Assignment says “draw AD” or “Activity Diagram” | Activity Diagram | Must follow the instruction exactly |
| Assignment says “process model”, “process flow”, “workflow” | Prefer Process Flow Diagram | Language suggests business workflow |
| System analysis/design deliverable in UML section | Activity Diagram | Fits the modeling standard |

---

# 5. Decision rules for AI Agents

## Rule 1 — Follow explicit instruction first

If the prompt explicitly says:
- “Activity Diagram”
- “AD”
- “UML Activity Diagram”

then choose **Activity Diagram**.

If the prompt explicitly says:
- “Process Flow Diagram”
- “PFD”
- “workflow diagram”
- “business process flow”

then choose **Process Flow Diagram** unless the surrounding context clearly requires UML.

## Rule 2 — Check the source artifact

If the input source is mainly:
- Use Case Specification
- SRS functional flow
- UML assignment
- software design artifact

prefer **Activity Diagram**.

If the input source is mainly:
- business procedure
- operational workflow
- service steps
- approval process
- customer journey-like process steps

prefer **Process Flow Diagram**.

## Rule 3 — Check the audience

If the primary audience is:
- BA
- stakeholder
- business user
- operations team
- lecturer wanting process explanation

prefer **Process Flow Diagram**.

If the primary audience is:
- software engineering team
- system analyst
- lecturer grading UML correctness
- design/specification reviewers

prefer **Activity Diagram**.

## Rule 4 — Check if UML semantics matter

If the task depends on precise distinctions such as:
- decision vs merge
- fork vs join
- activity final vs flow final
- object flow vs control flow
- activity partitions

choose **Activity Diagram**.

If the task only needs a readable workflow and these distinctions are not important, choose **Process Flow Diagram**.

## Rule 5 — When the request is ambiguous

If the user only says things like:
- “draw the flow”
- “draw the process”
- “show how this works”

then use this default decision order:

1. if the surrounding context is UML / Use Case / system modeling → **Activity Diagram**
2. otherwise → **Process Flow Diagram**

## Rule 6 — Do not mix notations carelessly

Do not produce a hybrid diagram that is half Process Flow Diagram and half UML Activity Diagram unless the user explicitly asks for that.

Examples of bad mixing:
- using UML fork/join semantics in an otherwise loose business flow without reason
- calling a business process chart an Activity Diagram even though it ignores UML rules
- drawing a UML Activity Diagram but using vague business-only symbols and no UML logic discipline

---

# 6. Practical heuristic: how to choose in 30 seconds

Ask these questions in order.

## Q1. Does the user explicitly ask for UML or Activity Diagram?
- Yes → Activity Diagram
- No → go to Q2

## Q2. Is the diagram mainly for business process explanation?
- Yes → Process Flow Diagram
- No → go to Q3

## Q3. Is the source a Use Case Specification or software behavior flow?
- Yes → Activity Diagram
- No → go to Q4

## Q4. Is readability for non-technical stakeholders more important than formal notation?
- Yes → Process Flow Diagram
- No → Activity Diagram

---

# 7. Comparison matrix

| Dimension | Process Flow Diagram | Activity Diagram |
|---|---|---|
| Main purpose | Explain workflow/process | Model behavior in UML |
| Formality | Lower / practical | Higher / formal UML |
| Typical audience | Business and mixed audience | Software/system analysis audience |
| Standard notation strictness | Medium, tool/context-dependent | High, UML-based |
| Control-flow semantics | Basic | Strong and explicit |
| Concurrency modeling | Usually weaker or informal | Strong with fork/join |
| Use with Use Case Specification | Possible, but less ideal | Very suitable |
| Use in UML assignments | Usually not enough | Usually correct choice |
| Communication clarity | Very high for general readers | Good, but can be more technical |
| Data/object flow modeling | Usually limited | Stronger support |
| Best for | Business workflow, process explanation | System/use-case behavior modeling |

---

# 8. When both could work

Sometimes both diagrams are acceptable.

Example:
- “Customer submits complaint, staff reviews it, manager approves refund, finance issues payment.”

You could draw:
- a **Process Flow Diagram** if the goal is to communicate the operational process
- an **Activity Diagram** if the goal is to model the software/business behavior in a formal UML way

## Recommended strategy when both are possible

### Use Process Flow Diagram first if:
- discovery is still ongoing
- the process is being explained to mixed stakeholders
- the main goal is shared understanding

### Use Activity Diagram first if:
- the process will be converted into use cases or system behavior specs
- the assignment will be graded on UML correctness
- the source is already formalized in software-analysis artifacts

---

# 9. When not to use Process Flow Diagram

Do **not** prefer Process Flow Diagram when:
- the teacher explicitly requires UML Activity Diagram
- the work must align with UML deliverables
- you need formal concurrency representation
- you need strong discipline around decision/merge/final semantics
- the output will be used as a system analysis model rather than a process communication artifact

---

# 10. When not to use Activity Diagram

Do **not** default to Activity Diagram when:
- the audience is mainly non-technical and only needs a readable workflow
- the task is basic process explanation, not software modeling
- UML precision adds complexity without adding value
- the user asked specifically for process flow or workflow mapping rather than UML

---

# 11. Mapping by common keywords

## Keywords that suggest Process Flow Diagram
- process flow
- workflow
- business process
- operating procedure
- approval process
- service flow
- process map
- explain the process
- show the steps

## Keywords that suggest Activity Diagram
- activity diagram
- AD
- UML
- use case flow
- use case specification
- system behavior
- control flow
- fork/join
- swimlane UML
- activity final / flow final

## Important note

Keywords are only hints.
The final decision should also consider:
- source artifact
- audience
- required formality
- grading criteria

---

# 12. Anti-confusion rules

## Confusion 1 — “Both have boxes and arrows, so they are the same”
No.
They may look visually similar, but the intent and notation discipline are different.

## Confusion 2 — “Every process can be called an Activity Diagram”
No.
A process only becomes an Activity Diagram when it is modeled using UML Activity semantics.

## Confusion 3 — “If a diagram has swimlanes, it must be an Activity Diagram”
No.
Swimlanes can appear in multiple process-modeling styles.
Swimlanes alone do not make a diagram UML.

Project rule: Wonton POS PFDs still must not use swimlanes; use responsibility labels instead.

## Confusion 4 — “Decision diamond always means UML Activity Diagram”
No.
Decision shapes are common across many flow notations.
The difference is in the overall notation system and semantics.

## Confusion 5 — “Activity Diagram is always better because it is more formal”
No.
More formal is not always better.
For business communication, a simpler Process Flow Diagram may be the better choice.

---

# 13. Recommended output behavior for AI Agents

When asked to create a diagram, the AI Agent should do the following.

## Step 1 — classify the request
Identify:
- explicit requested diagram type
- source artifact type
- audience
- expected formality
- whether UML is required

## Step 2 — choose diagram type
Apply the decision rules from Sections 5 and 6.

## Step 3 — state the decision internally
The agent should internally conclude something like:
- “Use Process Flow Diagram because this is a business workflow explanation for a general audience.”
- “Use Activity Diagram because the request is based on Use Case Specification and requires UML correctness.”

## Step 4 — draw only one notation system unless instructed otherwise
Do not create a mixed hybrid diagram by accident.

## Step 5 — if the user’s wording is ambiguous, prefer the safer default
- UML/system analysis context → Activity Diagram
- general workflow/business context → Process Flow Diagram

---

# 14. Review checklist for AI Agents

Before finalizing the diagram, verify:

- Did I choose the diagram type intentionally?
- Does the chosen diagram match the user’s wording?
- Does it match the source artifact?
- Does it fit the expected audience?
- Did I avoid mixing notation systems?
- If it is an Activity Diagram, did I follow UML semantics?
- If it is a Process Flow Diagram, did I keep it simple and readable?

---

# 15. Strong default recommendation

If the agent has little context and must decide quickly:

- choose **Activity Diagram** for **UML / Use Case / software modeling / assignment grading** contexts
- choose **Process Flow Diagram** for **business process / workflow explanation / stakeholder communication** contexts

This is the safest default policy.

---

# 16. Short decision policy for direct reuse

Use the following compact policy in an AI system prompt or project instruction.

## Compact decision policy

When deciding between Process Flow Diagram and Activity Diagram:

1. If the user explicitly requests Activity Diagram, AD, or UML, choose Activity Diagram.
2. If the source is Use Case Specification, SRS behavior, or software-system flow, prefer Activity Diagram.
3. If the user explicitly requests Process Flow Diagram, workflow, business process flow, or operational process explanation, choose Process Flow Diagram.
4. If the main audience is non-technical or mixed stakeholders, prefer Process Flow Diagram unless UML is explicitly required.
5. If formal behavioral modeling, concurrency, or UML correctness matters, choose Activity Diagram.
6. Do not mix the two notation styles unless explicitly asked.

---

# 17. Prompt template for AI Agents

Use this template before drawing.

## Template

Analyze the request and decide whether the output should be a Process Flow Diagram or a UML Activity Diagram.

Decision criteria:
- explicit requested notation
- source artifact type
- audience
- required formality
- whether UML correctness is required

Rules:
- choose Activity Diagram for UML, Use Case Specification, SRS behavior modeling, or software-system flow
- choose Process Flow Diagram for business workflow, operational process explanation, or stakeholder-friendly process communication
- do not mix notation styles unless explicitly requested

Then produce the diagram using only the chosen notation.

---

# 18. Final takeaway

The biggest mistake is not drawing the wrong arrow or the wrong shape.
The biggest mistake is choosing the **wrong diagram type for the job**.

Use this principle:

- If you are explaining **how work flows in a business process**, start with **Process Flow Diagram**.
- If you are modeling **behavior formally in UML**, especially from use cases or system requirements, use **Activity Diagram**.

That single distinction prevents most confusion.
