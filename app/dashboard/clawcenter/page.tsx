import React from 'react';
import ClawCenterClient from './ClawCenterClient';

export const metadata = {
  title: 'ClawCenter | Your Agentic Command',
  description: 'Direct your autonomous serverless swarm.',
};

export default function TenantCenterPage() {
  const tenantData = {
    swarmStatus: 'EVOLVING',
    activeTask: 'Refactoring Lead Persistence',
    currentAgent: 'RefactorAgent',
    pendingMutations: [
      {
        id: 'mut_992',
        title: 'Optimize S3 Lead Storage',
        impact: 'Medium',
        description:
          'Consolidating individual lead JSONs into monthly batch files to reduce S3 GET costs by 40%.',
        diff: '--- lead-api.ts\n+++ lead-api.ts\n- await s3.putObject(...)\n+ await dynamo.batchWrite(...)',
      },
    ],
    agentStats: {
      logicClarity: 82,
      contextEfficiency: 74,
      securityScore: 98,
    },
  };

  return <ClawCenterClient data={tenantData} />;
}
