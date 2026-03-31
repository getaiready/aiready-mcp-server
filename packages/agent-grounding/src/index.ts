import { ToolRegistry } from '@aiready/core';
import { AGENT_GROUNDING_PROVIDER } from './provider';

// Register with global registry
ToolRegistry.register(AGENT_GROUNDING_PROVIDER);

export * from './types';
export * from './analyzer';
export { AGENT_GROUNDING_PROVIDER };
export { calculateAgentGrounding as calculateGroundingScore } from '@aiready/core';
