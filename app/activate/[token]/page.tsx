import ActivateClient from '@/components/ActivateClient'

export default function Activate({ params }: { params: { token: string } }) {
  return <ActivateClient token={params.token} />
}
