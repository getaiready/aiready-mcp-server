import { Resource } from 'sst';
import ClawMoreClient from './ClawMoreClient';

export default function ClawMorePage() {
  // Access the linked resource URL directly on the server
  // This is robust and guaranteed to be correct in SST v3
  const apiUrl = Resource.LeadApi.url;

  return <ClawMoreClient apiUrl={apiUrl} />;
}
