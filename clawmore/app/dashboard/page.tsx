import { auth } from '../../auth';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';
import {
  getManagedAccountsForUser,
  getUserMetadata,
  getRecentMutationsForUser,
} from '../../lib/db';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/api/auth/signin');
  }

  const userEmail = session.user.email;

  // 1. Fetch Managed Accounts
  const accounts = await getManagedAccountsForUser(userEmail);

  // 2. Fetch User Metadata (Credits, Settings)
  const metadata = await getUserMetadata(userEmail);

  // 3. Fetch Recent Mutations
  const mutations = await getRecentMutationsForUser(userEmail);

  // 4. Aggregate stats
  const totalSpendCents = accounts.reduce(
    (sum, acc) => sum + (acc.currentMonthlySpendCents || 0),
    0
  );

  const statusData = {
    awsSpendCents: totalSpendCents,
    awsInclusionCents: 1500, // $15.00 base inclusion
    aiTokenBalanceCents: metadata?.aiTokenBalanceCents ?? 0,
    aiRefillThresholdCents: metadata?.aiRefillThresholdCents ?? 100,
    mutationCount: mutations.length, // Total count could be stored in metadata for efficiency later
    coEvolutionOptIn: metadata?.coEvolutionOptIn ?? false,
    autoTopupEnabled: metadata?.autoTopupEnabled ?? true,
    recentMutations: mutations,
  };

  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(',').map((e) => e.trim())
    : ['admin@example.com'];
  const isAdmin = session?.user?.email
    ? adminEmails.includes(session.user.email)
    : false;

  return (
    <DashboardClient
      user={session.user}
      status={statusData as any}
      isAdmin={isAdmin}
    />
  );
}
