import ClawMoreClient from './ClawMoreClient';

export default function ClawMorePage() {
  // Use environment variable which SST correctly injects at runtime
  // This is safer for Next.js build-time and local dev without 'sst dev'
  const apiUrl = process.env.LEAD_API_URL || '';

  return <ClawMoreClient apiUrl={apiUrl} />;
}
