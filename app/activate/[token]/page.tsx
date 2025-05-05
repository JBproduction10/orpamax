import ActivateClient from './ActivateClient';

export default function ActivatePage({ params }: { params: { token: string } }) {
  return <ActivateClient token={params.token} />;
}
