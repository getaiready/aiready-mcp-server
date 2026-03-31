import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RemediationSwarm } from '../workflows/remediation-swarm';
import { Agent } from '@mastra/core/agent';

// Mock Mastra Agent
vi.mock('@mastra/core/agent', () => {
  const MockAgent = vi.fn();
  MockAgent.prototype.generate = vi.fn().mockResolvedValue({
    text: JSON.stringify({
      status: 'success',
      diff: 'test-diff',
      prUrl: 'https://github.com/test/repo/pull/1',
      prNumber: 1,
      explanation: 'Fixed duplication in auth.ts',
    }),
  });
  return { Agent: MockAgent };
});

// Mock Octokit to prevent real GitHub API calls
vi.mock('@octokit/rest', () => {
  class MockOctokit {
    git = {
      getRef: vi
        .fn()
        .mockResolvedValue({ data: { object: { sha: 'abc123' } } }),
      createRef: vi.fn().mockResolvedValue({}),
    };
    pulls = {
      create: vi.fn().mockResolvedValue({
        data: { number: 1, html_url: 'https://github.com/test/repo/pull/1' },
      }),
    };
  }
  return { Octokit: MockOctokit };
});

// Mock isomorphic-git to prevent real git operations
vi.mock('isomorphic-git', () => ({
  branch: vi.fn().mockResolvedValue(undefined),
  checkout: vi.fn().mockResolvedValue(undefined),
  add: vi.fn().mockResolvedValue(undefined),
  commit: vi.fn().mockResolvedValue('commit-sha'),
  push: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('isomorphic-git/http/node', () => ({
  default: {},
}));

// Mock fs/promises to prevent real filesystem access
vi.mock('fs/promises', () => ({
  readFile: vi.fn().mockResolvedValue('file content'),
  writeFile: vi.fn().mockResolvedValue(undefined),
  mkdir: vi.fn().mockResolvedValue(undefined),
  readdir: vi.fn().mockResolvedValue([
    { name: 'file.ts', isDirectory: () => false },
    { name: 'src', isDirectory: () => true },
  ]),
}));

describe('RemediationSwarm (Direct Tools)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should execute agent with direct tools and parse JSON response', async () => {
    const input = {
      remediation: { id: 'rem-1', type: 'consolidation' },
      repo: { url: 'https://github.com/test/repo' },
      rootDir: '/tmp/test-repo',
      config: {
        githubToken: 'gh-token-123',
        openaiApiKey: 'oa-key-456',
      },
    };

    const result = await RemediationSwarm.execute(input);

    // Verify Agent was created (direct tools, no MCP)
    expect(Agent).toHaveBeenCalledTimes(1);

    const agentCall = vi.mocked(Agent).mock.calls[0];
    const agentConfig = agentCall[0];

    // Verify tools were passed directly (not via MCP)
    expect(agentConfig.tools).toBeDefined();
    expect(agentConfig.tools).toHaveProperty('read-file');
    expect(agentConfig.tools).toHaveProperty('write-file');
    expect(agentConfig.tools).toHaveProperty('create-branch');
    expect(agentConfig.tools).toHaveProperty('create-pr');
    expect(agentConfig.tools).toHaveProperty('commit-and-push');
    expect(agentConfig.tools).toHaveProperty('checkout-branch');
    expect(agentConfig.tools).toHaveProperty('list-files');

    // Verify no MCPAdapter was used (tools are direct)
    expect(agentConfig.id).toBe('refactor-agent');

    // Verify result structure
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.status).toBe('success');
      expect(result.value.prUrl).toBe('https://github.com/test/repo/pull/1');
      expect(result.value.diff).toBe('test-diff');
    }
  });

  it('should handle agent failures and return error status', async () => {
    const MockAgent = vi.mocked(Agent);
    (MockAgent.prototype.generate as any).mockResolvedValueOnce({
      text: JSON.stringify({
        status: 'failure',
        explanation: 'Could not find the duplicated files',
      }),
    });

    const input = {
      remediation: { id: 'rem-2' },
      repo: { url: 'https://github.com/test/repo' },
      rootDir: '/tmp/test',
      config: { githubToken: 'token' },
    };

    const result = await RemediationSwarm.execute(input);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.status).toBe('failure');
      expect(result.value.explanation).toBe(
        'Could not find the duplicated files'
      );
    }
  });

  it('should fallback to raw text if agent fails to return valid JSON', async () => {
    const MockAgent = vi.mocked(Agent);
    (MockAgent.prototype.generate as any).mockResolvedValueOnce({
      text: 'Applied fixes manually. PR created at https://github.com/test/repo/pull/99',
    });

    const input = {
      remediation: { id: 'rem-3' },
      repo: { url: 'https://github.com/test/repo' },
      rootDir: '/tmp/test',
      config: { githubToken: 'token' },
    };

    const result = await RemediationSwarm.execute(input);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.status).toBe('failure');
      expect(result.value.explanation).toContain(
        'Agent failed to return a structured JSON response'
      );
    }
  });

  it('should inject expert feedback into agent instructions', async () => {
    const MockAgent = vi.mocked(Agent);

    const input = {
      remediation: { id: 'rem-4' },
      repo: { url: 'https://github.com/test/repo' },
      rootDir: '/tmp/test',
      config: {
        githubToken: 'token',
        expertFeedback: 'Please also update the test file',
        previousDiff: '--- a/file.ts\n+++ b/file.ts',
      },
    };

    await RemediationSwarm.execute(input);

    // Verify expert feedback was included in agent instructions
    const agentCall = MockAgent.mock.calls[MockAgent.mock.calls.length - 1];
    const instructions = agentCall[0].instructions as string;
    expect(instructions).toContain('EXPERT FEEDBACK ON YOUR PREVIOUS ATTEMPT');
    expect(instructions).toContain('Please also update the test file');
    expect(instructions).toContain('--- a/file.ts\n+++ b/file.ts');
  });

  it('should use MiniMax model when configured', async () => {
    const input = {
      remediation: { id: 'rem-5' },
      repo: { url: 'https://github.com/test/repo' },
      rootDir: '/tmp/test',
      config: {
        githubToken: 'token',
        model: 'MiniMax-M2.7',
        anthropicApiKey: 'mm-key',
        anthropicBaseUrl: 'https://api.minimax.io/anthropic',
      },
    };

    await RemediationSwarm.execute(input);

    const agentCall =
      vi.mocked(Agent).mock.calls[vi.mocked(Agent).mock.calls.length - 1];
    expect(agentCall[0].model).toBe('anthropic/MiniMax-M2.7');
  });
});
