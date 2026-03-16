import React from 'react';
import HqClient from './HqClient';

export const metadata = {
  title: 'ClawHQ | Platform Orchestrator',
  description:
    'Global multi-tenant management for the ClawMore business empire.',
};

export default function HqPage() {
  const platformStats = {
    totalAccounts: 12,
    activeMutations: 156,
    totalRevenueCents: 185000,
    computeOverageCents: 42000,
    systemHealth: 99.98,
  };

  return <HqClient stats={platformStats} />;
}
