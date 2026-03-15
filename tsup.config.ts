import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  shims: true,
  // Treat these as external to avoid bundling them (they will be resolved at runtime)
  external: [
    '@aiready/core',
    '@aiready/pattern-detect',
    '@aiready/context-analyzer',
    '@aiready/consistency',
    '@modelcontextprotocol/sdk',
    'path',
    'url',
    'fs',
  ],
  // Ensure we are targeting a modern node version
  target: 'node20',
  // Build to be executable
  banner: {
    js: '#!/usr/bin/env node',
  },
});
