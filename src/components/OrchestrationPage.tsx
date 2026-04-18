import { motion } from 'motion/react';
import { CheckCircle2, Cpu, Link2, Shield, Workflow, Rocket, Lock, Gauge } from 'lucide-react';
import { useMemo, useState } from 'react';

const TOOL_ROWS = [
  {
    tool: 'Codex CLI',
    clientModel: 'Open-source client (Apache-2.0)',
    hosting: 'Typically OpenAI-hosted models',
    notes: 'Terminal-first coding with strict approvals. Best for CLI script generation, regex construction, and shell-integrated workflows.',
  },
  {
    tool: 'Codex Web/App',
    clientModel: 'Proprietary service',
    hosting: 'Cloud agent in isolated sandboxes',
    notes: 'Delegated background tasks. Best for long-running refactors where you do not need live terminal supervision.',
  },
  {
    tool: 'OpenCode',
    clientModel: 'Open-source client',
    hosting: 'Multi-provider + local-model support',
    notes: 'Hybrid champion for bouncing between local Ollama drafts and cloud-model reviews in one flow.',
  },
  {
    tool: 'Claude Code',
    clientModel: 'Managed/proprietary tool',
    hosting: 'Anthropic API, Bedrock, or Vertex setups',
    notes: 'Excels at deep-context tasks: large repository edits, enterprise auth patterns, and cascading architecture changes.',
  },
  {
    tool: 'Gemini CLI',
    clientModel: 'Open-source client (Apache-2.0)',
    hosting: 'Gemini cloud models',
    notes: 'Strong for multimodal workflows, MCP-friendly setups, and high-speed large-context processing.',
  },
  {
    tool: 'Ollama (CLI/API)',
    clientModel: 'Open-source engine',
    hosting: 'Local / on-device',
    notes: 'Total data sovereignty. Ideal for private schemas, proprietary logic, and zero-cost high-iteration loops.',
  },
];

const PLAYBOOK = [
  {
    title: '1) Route Easy Work Local',
    detail:
      'Use Ollama for repetitive transforms, quick drafts, and formatting loops. Start small (`hermes3:8b`, `nous-hermes`) and scale up model size only when quality requires it.',
  },
  {
    title: '2) Escalate Hard Tasks to Cloud',
    detail:
      'Escalate when tasks exceed local context/reasoning limits: architecture design, deep debugging, cross-module state analysis, and multi-integration workflows.',
  },
  {
    title: '3) Use One Master Brief',
    detail:
      'Keep one source of truth with scope, stack constraints, done criteria, and non-negotiables. Reuse that same brief across every agent to eliminate drift.',
  },
  {
    title: '4) Micro-Segment Responsibilities',
    detail:
      'Assign specialized roles: logic builder, UI/styling specialist, and deploy validator. Avoid mixing implementation, styling, and deployment concerns in one pass.',
  },
  {
    title: '5) Track Cost + Rate Limits',
    detail:
      'Treat context windows as scarce. Strip noisy files, summarize logs locally first, and send concise payloads to cloud models for high-value reasoning.',
  },
];

const ROLE_SPLIT = [
  {
    role: 'Agent A - Builder',
    scope: 'Logic, state, structure, and data flow.',
  },
  {
    role: 'Agent B - Stylist',
    scope: 'CSS, responsiveness, visual hierarchy, and accessibility pass.',
  },
  {
    role: 'Agent C - Netlify Deploy Architect',
    scope: 'Predeploy checks: form detection, heading semantics, ARIA, SEO tags, .gitignore hygiene, and build/deploy correctness.',
  },
];

const RULES = [
  'Zero trust on unversioned code: never run full-auto write modes without clean git history.',
  'Define explicit acceptance criteria before generation.',
  'Pin models by task class; avoid auto-selection for critical work.',
  'Keep secrets in ignored env files or server-only function scopes.',
  'Use adversarial review: writer model and reviewer model should be different.',
];

const MASTER_BRIEF_TEMPLATE = `# MASTER BRIEF

## Objective
- [Describe the exact business/technical outcome]

## Scope
- In scope:
  - [Item 1]
  - [Item 2]
- Out of scope:
  - [Item 1]

## Stack Constraints
- Use: Astro + Vite + React
- Do not use: Next.js routing/components
- Preserve dark UI consistency and responsive behavior

## Non-Negotiables
- Keep secrets out of prompts and source control
- No destructive migrations or risky rewrites without approval
- Minimal diffs, production-safe edits only

## Acceptance Criteria
- Build succeeds
- Lint/typecheck passes
- No hydration/runtime errors
- SEO metadata/canonical is correct for changed pages
- Netlify deploy path remains valid

## Deliverables
- Changed files list
- Validation command output summary
- Known risks + follow-up actions
`;

const SNIPPETS = [
  {
    title: 'Master Brief Injector',
    content:
      'Use the attached MASTER BRIEF as hard constraints. Do not deviate from stack rules or acceptance criteria. If constraints conflict, stop and report before editing.',
  },
  {
    title: 'Adversarial Reviewer Prompt',
    content:
      'Review this patch as an adversarial gatekeeper. Find regressions in behavior, security, performance, accessibility, and SEO. Provide only concrete findings with file/line references.',
  },
  {
    title: 'Local-to-Cloud Escalation Prompt',
    content:
      'Here is the local model summary. Preserve all validated facts, discard speculation, and propose a minimal-risk cloud-grade fix with exact file edits and validation commands.',
  },
];

export default function OrchestrationPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const masterBriefHref = useMemo(
    () => `data:text/markdown;charset=utf-8,${encodeURIComponent(MASTER_BRIEF_TEMPLATE)}`,
    [],
  );

  const copySnippet = async (key: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1400);
  };

  return (
    <main className="pt-24 sm:pt-32 pb-24">
      <section className="px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight leading-tight mb-4">
            Orchestration <span className="text-bullseye">Conductor</span> Guide V2
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg">
            Run the right coding agent for the right job. Modern development is a hybrid swarm:
            local environments for private iterative loops, cloud-native agents for deep architectural reasoning and massive context.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <div className="max-w-6xl mx-auto border border-tactical-border bg-tactical-gray/60 overflow-hidden">
          <div className="px-5 sm:px-7 py-4 border-b border-tactical-border flex items-center gap-2">
            <Cpu className="w-4 h-4 text-bullseye" />
            <h2 className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-gray-300">
              Open-Source Client vs Hosted Model Matrix (Expanded)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left">
              <thead>
                <tr className="border-b border-tactical-border text-[10px] uppercase tracking-widest text-gray-500 font-mono">
                  <th className="px-5 sm:px-7 py-3">Tool</th>
                  <th className="px-5 sm:px-7 py-3">Client Status</th>
                  <th className="px-5 sm:px-7 py-3">Model/Compute</th>
                  <th className="px-5 sm:px-7 py-3">Optimal Use Case & Workflows</th>
                </tr>
              </thead>
              <tbody>
                {TOOL_ROWS.map((row) => (
                  <tr key={row.tool} className="border-b last:border-b-0 border-tactical-border/80">
                    <td className="px-5 sm:px-7 py-4 text-white font-semibold">{row.tool}</td>
                    <td className="px-5 sm:px-7 py-4 text-gray-300">{row.clientModel}</td>
                    <td className="px-5 sm:px-7 py-4 text-gray-300">{row.hosting}</td>
                    <td className="px-5 sm:px-7 py-4 text-gray-300">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-tactical-border bg-tactical-gray/60 p-6 sm:p-7"
          >
            <div className="flex items-center gap-2 mb-3">
              <Workflow className="w-4 h-4 text-bullseye" />
              <h2 className="font-display text-xl sm:text-2xl">Hybrid Quick Start Stack</h2>
            </div>
            <p className="text-gray-300 mb-4">
              For maximum value and minimal waste, run a strict three-pass pipeline:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-bullseye mt-1 shrink-0" />
                <span>
                  <strong className="text-white">Sandbox (Local Pass):</strong> run <code>ollama serve</code>, then
                  <code> ollama run hermes3:8b</code> or <code>ollama run nous-hermes</code> for boilerplate and local iteration.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-bullseye mt-1 shrink-0" />
                <span>
                  <strong className="text-white">Architect (Cloud Pass):</strong> escalate to Codex/OpenCode/Claude/Gemini for multi-file routing, deep debugging, and architecture decisions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-bullseye mt-1 shrink-0" />
                <span>
                  <strong className="text-white">Gatekeeper (Final Pass):</strong> enforce lint/tests/build + adversarial review prompt before merge/deploy.
                </span>
              </li>
            </ul>
          </motion.article>

          <article className="border border-tactical-border bg-tactical-gray/60 p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="w-4 h-4 text-bullseye" />
              <h2 className="font-display text-xl sm:text-2xl">Context Economy Tactics</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>Exclude <code>node_modules/</code>, <code>dist/</code>, and local model binaries from context payloads.</li>
              <li>Use local models to summarize large logs before escalation.</li>
              <li>Escalate only distilled context + precise acceptance criteria.</li>
              <li>Save paid context windows for high-impact reasoning tasks.</li>
              <li>Keep low-risk edit loops on local models whenever possible.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto border border-tactical-border bg-tactical-gray/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-5">
            <Link2 className="w-4 h-4 text-bullseye" />
            <h2 className="font-display text-2xl sm:text-3xl">Conductor Playbook (Deep Dive)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {PLAYBOOK.map((item) => (
              <div key={item.title} className="border border-tactical-border/80 bg-carbon/40 p-4">
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="border border-tactical-border bg-tactical-gray/60 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-bullseye" />
              <h2 className="font-display text-2xl">Micro-Segmentation Roles</h2>
            </div>
            <div className="space-y-3">
              {ROLE_SPLIT.map((item) => (
                <div key={item.role} className="border border-tactical-border/70 bg-carbon/40 p-4">
                  <h3 className="text-white font-semibold mb-1">{item.role}</h3>
                  <p className="text-gray-300">{item.scope}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="border border-tactical-border bg-tactical-gray/60 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="w-4 h-4 text-bullseye" />
              <h2 className="font-display text-2xl">Future-Proofing</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                Local-model efficiency is improving quickly. Prepare for a near-term shift where the majority of iterative reasoning can run on-device.
              </p>
              <p>
                Target a &quot;zero-token&quot; workflow: run most drafts, transforms, and extended loops locally, and reserve cloud budget for high-risk architecture decisions.
              </p>
              <p>
                Keep hardware and runtime tuned for local throughput: prioritize RAM headroom, model quantization choices, and low-friction local tool execution.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="max-w-6xl mx-auto border border-tactical-border bg-tactical-gray/60 p-6 sm:p-8 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4 text-bullseye" />
            <h2 className="font-display text-2xl sm:text-3xl">Non-Negotiables (Strict Rules of Engagement)</h2>
          </div>
          <ul className="space-y-3 text-gray-300">
            {RULES.map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-bullseye mt-1 shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <article className="border border-tactical-border bg-tactical-gray/60 p-6 sm:p-8">
            <h2 className="font-display text-2xl mb-3">Operator Assets</h2>
            <p className="text-gray-300 mb-5">
              Download a ready-to-edit brief template and reuse it as the single source of truth across all agents.
            </p>
            <a
              href={masterBriefHref}
              download="MASTER_BRIEF.md"
              className="inline-flex items-center justify-center px-4 py-3 bg-bullseye text-white font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Download MASTER_BRIEF.md
            </a>
          </article>

          <article className="border border-tactical-border bg-tactical-gray/60 p-6 sm:p-8">
            <h2 className="font-display text-2xl mb-3">Copy Snippets</h2>
            <div className="space-y-4">
              {SNIPPETS.map((snippet) => (
                <div key={snippet.title} className="border border-tactical-border/70 bg-carbon/40 p-4">
                  <h3 className="text-white font-semibold mb-2">{snippet.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{snippet.content}</p>
                  <button
                    type="button"
                    onClick={() => copySnippet(snippet.title, snippet.content)}
                    className="px-3 py-2 border border-tactical-border text-xs font-mono uppercase tracking-widest text-gray-200 hover:border-bullseye hover:text-white transition-colors"
                  >
                    {copied === snippet.title ? 'Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
