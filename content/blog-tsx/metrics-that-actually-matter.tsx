import meta from './metrics-that-actually-matter.meta';
import React from 'react';
import CodeBlock from '../../components/CodeBlock';

const Post = () => (
  <>
    <p>
      For decades, software teams have relied on metrics like cyclomatic
      complexity, code coverage, and lint warnings to measure code quality.
      These tools were designed for human reviewers. But as AI-assisted
      development becomes the norm, these old metrics are no longer enough. AI
      models don’t “see” code the way humans do. They don’t care about your
      coverage percentage or how many branches your function has. What matters
      is how much context they can fit, how consistent your patterns are, and
      how much semantic duplication lurks beneath the surface.
    </p>
    <p>
      That’s why we built <strong>AIReady</strong>: to measure the 9 core
      dimensions of AI-readiness.
    </p>

    <h2>Why Traditional Metrics Fall Short</h2>
    <p>
      Traditional tools answer &quot;Is this code maintainable for a
      human?&quot; AIReady answers &quot;Is this code understandable for an
      AI?&quot;
    </p>
    <p>
      An AI&apos;s &quot;understanding&quot; is limited by its{' '}
      <strong>context window</strong> and its ability to{' '}
      <strong>predict patterns</strong>. When your codebase is fragmented,
      inconsistent, or full of boilerplate, you are essentially
      &quot;blinding&quot; the AI, leading to hallucinations, broken
      suggestions, and subtle bugs.
    </p>

    <div className="my-12 max-w-2xl mx-auto">
      <img
        src="/series-3-metrics-that-matters.png"
        alt="The Nine Dimensions of AI-Readiness"
        className="rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-800 w-full"
      />
      <p className="text-center text-sm text-slate-500 mt-4 italic">
        We&apos;ve identified 9 critical metrics that determine how well an AI
        agent can navigate, understand, and modify your codebase.
      </p>
    </div>

    <h2>The 9 Dimensions of AI-Readiness</h2>

    <div className="space-y-8 my-8">
      <section>
        <h3 className="text-xl font-bold mb-2">1. Semantic Duplicates</h3>
        <p className="mb-2">
          <strong>What it is:</strong> Logic that is repeated but written in
          different ways.
        </p>
        <p>
          <strong>Why it matters:</strong> Traditional linters miss logic
          duplication. AI models get confused when the same logic exists in
          multiple places, often updating only one and leaving the others as
          &quot;logic debt.&quot;
        </p>
        <CodeBlock lang="typescript">{`
// File 1
function validateUser(u) { return u.id && u.email.includes('@'); }

// File 2
const isValidUser = (user) => user.id && user.email.indexOf('@') !== -1;
        `}</CodeBlock>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-2">2. Context Fragmentation</h3>
        <p className="mb-2">
          <strong>What it is:</strong> Analyzes how scattered related logic is
          across the codebase.
        </p>
        <p>
          <strong>Why it matters:</strong> AI has a limited context window. If a
          single feature is spread across 15 folders, the AI cannot
          &quot;see&quot; the whole picture at once, leading to incomplete
          refactors.
        </p>
        <CodeBlock lang="typescript">{`
// src/api/users.ts
import { getUserById } from '../services/user-service'; // +2,100 tokens
import { validateUser } from '../utils/user-validation'; // +1,800 tokens
// ...
        `}</CodeBlock>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-2">3. Naming Consistency</h3>
        <p className="mb-2">
          <strong>What it is:</strong> Measures how consistently variables,
          functions, and classes are named.
        </p>
        <p>
          <strong>Why it matters:</strong> AI predicts code based on patterns.
          Inconsistent naming (e.g., mixing <code>getUser</code> and{' '}
          <code>fetchAccount</code>) breaks these patterns and reduces
          suggestion accuracy.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-2">4. Dependency Health</h3>
        <p className="mb-2">
          <strong>What it is:</strong> Measures the stability, security, and
          freshness of your dependencies.
        </p>
        <p>
          <strong>Why it matters:</strong> AI models often suggest outdated or
          insecure packages if your project is stuck on old versions. A clean
          dependency graph keeps AI suggestions modern and safe.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-2">5. Change Amplification</h3>
        <p className="mb-2">
          <strong>What it is:</strong> Tracks how many places need to change
          when a single requirement evolves.
        </p>
        <p>
          <strong>Why it matters:</strong> AI struggles with high coupling. If
          one change requires 10 files to be updated, the AI is significantly
          more likely to miss a spot or introduce a regression.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-2">6. AI Signal Clarity</h3>
        <p className="mb-2">
          <strong>What it is:</strong> Measures the ratio of &quot;signal&quot;
          (actual logic) to &quot;noise&quot; (boilerplate, dead code).
        </p>
        <p>
          <strong>Why it matters:</strong> Excess boilerplate wastes the
          AI&apos;s context window. More &quot;signal&quot; means the AI can
          spend its tokens on the logic that actually matters.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-2">7. Documentation Health</h3>
        <p className="mb-2">
          <strong>What it is:</strong> Checks for missing, outdated, or
          misleading documentation.
        </p>
        <p>
          <strong>Why it matters:</strong> AI relies heavily on docstrings to
          understand intent. Outdated docs lead to &quot;hallucinations&quot;
          where the AI assumes behavior that no longer exists.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-2">8. Agent Grounding</h3>
        <p className="mb-2">
          <strong>What it is:</strong> Assesses how easily an AI agent can
          navigate your project structure.
        </p>
        <p>
          <strong>Why it matters:</strong> Standard structures allow AI agents
          to navigate autonomously. Confusing layouts make agents &quot;get
          lost&quot; during multi-file operations.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-2">9. Testability Index</h3>
        <p className="mb-2">
          <strong>What it is:</strong> Quantifies how easy it is for an AI to
          write and run tests for your code.
        </p>
        <p>
          <strong>Why it matters:</strong> AI-generated tests are the best way
          to verify AI-generated code. Code that is hard to test is inherently
          harder for an AI to maintain safely.
        </p>
      </section>
    </div>

    <h2>How to Start Measuring</h2>
    <p>
      AIReady provides a unified CLI to scan your codebase against all 9
      dimensions:
    </p>

    <CodeBlock lang="bash">{`
npx @aiready/cli scan --score
`}</CodeBlock>

    <p>
      This command gives you an overall{' '}
      <strong>AI Readiness Score (0-100)</strong> and a detailed breakdown of
      where your biggest &quot;AI Debt&quot; lies.
    </p>

    <h2>Conclusion</h2>
    <p>
      If you&apos;re still measuring code quality with tools built for humans,
      you&apos;re missing the real blockers to AI productivity. AIReady gives
      you the metrics that actually matter—so you can build codebases that are
      ready for the future.
    </p>

    <p>
      <strong>Try it yourself:</strong>
    </p>
    <CodeBlock lang="bash">{`
npx @aiready/cli scan . --score
`}</CodeBlock>

    <p>
      <strong>
        Have questions or want to share your AI code quality story?
      </strong>{' '}
      Drop them in the comments. I read every one.
    </p>

    <p>
      <strong>Resources:</strong>
    </p>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>
        GitHub:{' '}
        <a href="https://github.com/caopengau/aiready-cli">
          github.com/caopengau/aiready-cli
        </a>
      </li>
      <li>
        Docs: <a href="https://aiready.dev">aiready.dev</a>
      </li>
      <li>
        Report issues:{' '}
        <a href="https://github.com/caopengau/aiready-cli/issues">
          github.com/caopengau/aiready-cli/issues
        </a>
      </li>
    </ul>

    <hr className="my-12 border-slate-200 dark:border-zinc-800" />

    <p>
      <strong>Read the full series:</strong>
    </p>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>
        <a href="/blog/ai-code-debt-tsunami">
          Part 1: The AI Code Debt Tsunami is Here (And We&apos;re Not Ready)
        </a>
      </li>
      <li>
        <a href="/blog/invisible-codebase">
          Part 2: Why Your Codebase is Invisible to AI (And What to Do About It)
        </a>
      </li>
      <li>
        <strong>
          Part 3: AI Code Quality Metrics That Actually Matter ← You are here
        </strong>
      </li>
      <li>
        <a href="/blog/semantic-duplicate-detection">
          Part 4: Deep Dive: Semantic Duplicate Detection with AST Analysis
        </a>
      </li>
      <li>
        <a href="/blog/hidden-cost-import-chains">
          Part 5: The Hidden Cost of Import Chains
        </a>
      </li>
      <li>
        <a href="/blog/visualizing-invisible">
          Part 6: Visualizing the Invisible: Seeing the Shape of AI Code Debt
        </a>
      </li>
    </ul>

    <hr className="my-12 border-slate-200 dark:border-zinc-800" />

    <p className="text-sm italic text-slate-500">
      *Peng Cao is the founder of{' '}
      <a href="https://receiptclaimer.com">receiptclaimer</a> and creator of{' '}
      <a href="https://github.com/caopengau/aiready-cli">aiready</a>, an
      open-source suite for measuring and optimizing codebases for AI adoption.*
    </p>
  </>
);

export default Post;
