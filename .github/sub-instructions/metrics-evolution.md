# AIReady Metrics Evolution Guide

**Last Updated:** February 25, 2026  
**Version:** v0.12+

## Strategic Foundation

AIReady metrics must satisfy three survival criteria:

1. **Technology-agnostic** — valid regardless of model (GPT-4 → GPT-5 → whatever comes next)
2. **Business-justified** — connect to real cost and productivity signals, not vanity measures
3. **Actionable** — every metric must have a clear fix path and estimated impact

This document chronicles the evolution from v0.9 (3 simple scores) to the current comprehensive framework.

---

## The Problem with Naive Metrics

| Naive Metric                     | Why It Breaks                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| "Token cost"                     | Context windows went 32k → 128k → 1M+. A 10k-token file went from "critical" to "trivial". |
| "Import depth"                   | Language-specific. Meaningless in Python or Go.                                            |
| "65% acceptance rate baseline"   | Pure fiction. GitHub Copilot reports ~30% industry average.                                |
| GPT-4 token pricing ($0.01/1K)   | Models now range $0.0001–$0.030/1K. A 100x spread renders old estimates meaningless.       |
| Fixed 5k-token "ideal" threshold | Calibrated to GPT-4 (8k context). Frontier models have 200k+ windows.                      |

---

## Current Core Metrics (v0.12+)

The AIReady platform evaluates code across **9 Core AI-Readiness Metrics**. These metrics are technology-agnostic and focus on how well an AI can understand, navigate, and modify the codebase.

| Metric                  | Dimension  | What It Measures                                                            |
| ----------------------- | ---------- | --------------------------------------------------------------------------- |
| **Cognitive Load**      | Complexity | Human/AI comprehension ease; conceptual density per line.                   |
| **AI Signal Clarity**   | Semantics  | Clarity of intent; absence of "hallucination traps" (overloads, magic values). |
| **Agent Grounding**     | Context    | How well an autonomous agent can navigate the codebase unaided.             |
| **Pattern Entropy**     | Structural | Statistical consistency of implementation patterns (Shannon entropy).        |
| **Concept Cohesion**    | Structural | Logical grouping of exports by domain/concept.                              |
| **Testability Index**   | Quality    | Degree to which changes can be safely verified by AI or humans.             |
| **Documentation Drift** | Context    | Alignment between code behavior and its documentation/JSDoc.                |
| **Dependency Health**   | Structural | Fragility and fragmentation of internal/external imports.                    |
| **Semantic Distance**   | Semantics  | Terminological consistency across different modules/files.                  |

---

## Future-Proof Metric Primitives

Defined in `packages/core/src/future-proof-metrics.ts`, these abstractions survive technology shifts.

### 1. Cognitive Load (`CognitiveLoad`)
Quantifies the mental effort required to process a file. High load blocks AI comprehension.
- **Factors:** Size, Interface, Dependency, and Conceptual Density.

### 2. AI Signal Clarity (`AiSignalClarity`)
Measures the clarity of "signals" sent to the AI. Low clarity leads to hallucinations.
- **Signals:** Explicit vs Implicit intent, Symbol ambiguity, JSDoc coverage.

### 3. Agent Grounding Score (`AgentGroundingScore`)
Measures "wayfinding" efficiency for agents.
- **Dimensions:** Directory depth, entry-point clarity, domain vocabulary consistency.

### 4. Testability Index (`TestabilityIndex`)
Measures verification safety. `Blind-risk` indicates AI changes cannot be verified.
- **Dimensions:** Test-to-source ratio, purity of functions, dependency injection patterns.

### 5. Documentation Drift (`DocDriftScore`)
Measures the gap between code reality and narrative documentation.

### 6. Dependency Health (`DependencyHealthScore`)
Measures the risk profile of the import graph.

### 7. Pattern Entropy (`PatternEntropy`)
A mathematical measure of structural consistency within a domain.

### 8. Concept Cohesion (`ConceptCohesion`)
Measures how well a module sticks to a single responsibility/domain.

### 9. Semantic Distance (`SemanticDistance`)
Measures concept drift across the codebase using terminology analysis.

---

### 5. Semantic Distance (`SemanticDistance`)

Replaces "import depth" with concept-based distance.

### 6. Pattern Entropy (`PatternEntropy`)

Information-theoretic fragmentation measure using Shannon entropy.

### 7. Concept Cohesion (`ConceptCohesion`)

Domain-based export cohesion score.

---

## Model-Aware Context Tiers

Context budget thresholds are now **calibrated per model tier**, not hardcoded to GPT-4 era values.

```typescript
import {
  CONTEXT_TIER_THRESHOLDS,
  getRecommendedThreshold,
} from '@aiready/core';

// 'compact' | 'standard' | 'extended' | 'frontier'
const thresholds = CONTEXT_TIER_THRESHOLDS['extended'];
// { idealTokens: 15_000, criticalTokens: 50_000, idealDepth: 7 }

const recommended = getRecommendedThreshold(450, 'extended'); // 450 files
// → 68 (medium project, frontier model gives -2 bonus)
```

| Tier       | Models                    | Ideal Tokens | Critical Tokens | Ideal Depth |
| ---------- | ------------------------- | ------------ | --------------- | ----------- |
| `compact`  | GPT-3.5, older Codex      | 3,000        | 10,000          | 4           |
| `standard` | GPT-4, Claude 3 Haiku     | 5,000        | 15,000          | 5           |
| `extended` | GPT-4o, Claude 3.5 Sonnet | 15,000       | 50,000          | 7           |
| `frontier` | Claude 3.7+, Gemini 2.0+  | 50,000       | 150,000         | 10          |

---

## Model Pricing Presets

No more hardcoded GPT-4 pricing. Use presets:

```typescript
import { getModelPreset } from '@aiready/core';

const preset = getModelPreset('claude-sonnet-4');
const monthlyCost = calculateMonthlyCost(tokenWaste, {
  pricePer1KTokens: preset.pricePer1KInputTokens,
  queriesPerDevPerDay: preset.typicalQueriesPerDevPerDay,
  developerCount: 10,
});
```

**Available:** `gpt-4` · `gpt-4o` · `gpt-4o-mini` · `claude-3-5-sonnet` · `claude-3-7-sonnet` · `claude-sonnet-4` · `gemini-1-5-pro` · `gemini-2-0-flash` · `copilot` · `cursor-pro`

---

## Size-Adjusted Thresholds

Large codebases structurally accrue more issues. Use `getRecommendedThreshold()`:

| Size         | Files     | Recommended Threshold |
| ------------ | --------- | --------------------- |
| `xs`         | < 50      | 80                    |
| `small`      | 50–200    | 75                    |
| `medium`     | 200–500   | 70                    |
| `large`      | 500–2,000 | 65                    |
| `enterprise` | 2,000+    | 58                    |

---

## Acceptance Rate Prediction (v0.12 — re-calibrated)

Old baseline `0.65` was fiction. New baseline `0.30` aligns with GitHub Copilot's ~30% industry average.

Confidence ranges: 1 tool → 0.35 · 2 tools → 0.50 · 3 tools → 0.65 · 4+ tools → 0.75

---

## Roadmap: Planned Metric Spokes

| Spoke                 | Priority | Description                                              |
| --------------------- | -------- | -------------------------------------------------------- |
| `doc-drift`           | High     | Detect stale comments, README drift, outdated JSDoc      |
| `testability`         | High     | Full AST-driven spoke: DI, purity, test ratio            |
| `hallucination-risk`  | High     | Full AST spoke: overloads, magic literals, boolean traps |
| `agent-grounding`     | Medium   | Full spoke: directory/naming analysis                    |
| `deps`                | Medium   | Dependency age, security, API stability                  |
| `change-blast-radius` | Low      | Estimate propagation cost of modifications               |

## The Problem with Traditional Metrics

Traditional code metrics are often tied to specific technologies:

- **Token cost** - Changes with model context windows (32k → 100k → 1M)
- **Import depth** - Language-specific (ES6, Python, Java)
- **Jaccard similarity** - May miss semantic equivalence

## Future-Proof Metrics

### 1. Cognitive Load (`CognitiveLoad`)

Replaces "token cost" with a multi-dimensional cognitive assessment.

```typescript
import { calculateCognitiveLoad } from '@aiready/core';

const load = calculateCognitiveLoad({
  linesOfCode: 500,
  exportCount: 10,
  importCount: 15,
  uniqueConcepts: 20,
});

// Returns: { score: 45, rating: 'moderate', factors: [...], rawValues: {...} }
```

**Factors:**

- Size Complexity (30%) - Lines of code
- Interface Complexity (25%) - Number of exports
- Dependency Complexity (25%) - Number of imports
- Conceptual Density (20%) - Unique concepts per line

### 2. Semantic Distance (`SemanticDistance`)

Replaces "import depth" with concept-based distance measurement.

```typescript
import { calculateSemanticDistance } from '@aiready/core';

const distance = calculateSemanticDistance({
  file1: 'src/users/service.ts',
  file2: 'src/auth/service.ts',
  file1Domain: 'users',
  file2Domain: 'auth',
  file1Imports: ['db', 'utils'],
  file2Imports: ['db', 'utils', 'crypto'],
  sharedDependencies: ['db'],
});

// Returns: { distance: 0.3, relationship: 'cross-domain', ... }
```

### 3. Pattern Entropy (`PatternEntropy`)

Replaces "fragmentation" with information-theoretic measurement (Shannon entropy).

```typescript
import { calculatePatternEntropy } from '@aiready/core';

const entropy = calculatePatternEntropy([
  { path: 'src/users/model.ts', domain: 'users' },
  { path: 'src/users/service.ts', domain: 'users' },
  { path: 'src/auth/model.ts', domain: 'auth' },
]);

// Returns: { entropy: 0.5, rating: 'moderate', giniCoefficient: 0.4, ... }
```

### 4. Concept Cohesion (`ConceptCohesion`)

More rigorous than "export cohesion" using domain analysis.

```typescript
import { calculateConceptCohesion } from '@aiready/core';

const cohesion = calculateConceptCohesion({
  exports: [
    { name: 'getUser', inferredDomain: 'users' },
    { name: 'createUser', inferredDomain: 'users' },
    { name: 'deleteUser', inferredDomain: 'users' },
  ],
});

// Returns: { score: 0.85, rating: 'excellent', ... }
```

## Business Metrics

### Temporal Tracking

```typescript
import {
  calculateScoreTrend,
  calculateRemediationVelocity,
} from '@aiready/core';

// Load history
const history = loadScoreHistory('./my-project');

// Calculate trend
const trend = calculateScoreTrend(history);
// Returns: { direction: 'improving', change30Days: 5, velocity: 1.2, ... }

// Calculate velocity
const velocity = calculateRemediationVelocity(history, 50);
// Returns: { issuesFixedThisWeek: 3, avgIssuesPerWeek: 2.5, trend: 'stable', ... }
```

### Knowledge Concentration Risk

Measures "bus factor" for AI training continuity.

```typescript
import { calculateKnowledgeConcentration } from '@aiready/core';

const risk = calculateKnowledgeConcentration([
  { path: 'src/core.ts', exports: 50, imports: 5 },
  { path: 'src/utils.ts', exports: 10, imports: 2 },
  // ...
]);

// Returns: { score: 65, rating: 'high', analysis: {...}, recommendations: [...] }
```

### Technical Debt Interest

Models compounding costs over time.

```typescript
import {
  calculateTechnicalDebtInterest,
  getDebtBreakdown,
} from '@aiready/core';

const debt = calculateTechnicalDebtInterest({
  currentMonthlyCost: 100,
  issues: [{ severity: 'critical' }, { severity: 'major' }],
  monthsOpen: 6,
});

// Returns: { monthlyRate: 3.5, annualRate: 51, projections: {...}, monthlyCost: 103.50 }

const breakdown = getDebtBreakdown(500, 300, 100);
// Returns categorized debt by type with priority and fix costs
```

## Migration Guide

### From Token Cost to Cognitive Load

Old:

```typescript
const tokens = file.tokenCost;
const score = tokens > 10000 ? 'high' : 'low';
```

New:

```typescript
const load = calculateCognitiveLoad({
  linesOfCode: file.lines,
  exportCount: file.exports.length,
  importCount: file.imports.length,
  uniqueConcepts: file.concepts.length,
});
// load.rating gives you: trivial, easy, moderate, difficult, expert
```

### From Import Depth to Semantic Distance

Old:

```typescript
const depth = calculateImportDepth(file, graph);
```

New:

```typescript
const distance = calculateSemanticDistance({
  file1: file1Path,
  file2: file2Path,
  file1Domain: file1Domain,
  file2Domain: file2Domain,
  file1Imports: file1.imports,
  file2Imports: file2.imports,
  sharedDependencies: findShared(file1.imports, file2.imports),
});
// distance.relationship: same-file | same-domain | cross-domain | unrelated
```

## Score Calculation

The aggregate score uses future-proof metrics:

```typescript
import { calculateFutureProofScore } from '@aiready/core';

const score = calculateFutureProofScore({
  cognitiveLoad: loadResult,
  patternEntropy: entropyResult,
  conceptCohesion: cohesionResult,
  semanticDistances: [distance1, distance2],
});

// score.toolName = 'future-proof'
// score.score = 0-100
// score.factors shows contribution of each metric
```

## Key Principles

1. **Technology Independence** - Metrics work regardless of AI model architecture
2. **Mathematical Rigor** - Uses information theory (Shannon entropy)
3. **Business Alignment** - Connects technical metrics to ROI
4. **Future-Proof** - Doesn't depend on tokens, context windows, or specific languages
