import ActivateClient from './ActivateClient'

type PageProps = {
  params: {
    token: string
  }
}

export default function ActivatePage({ params }: PageProps) {
  return <ActivateClient token={params.token} />
}
