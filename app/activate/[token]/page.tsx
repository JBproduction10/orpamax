import ActivateClient from './ActivateClient';

type Params = Promise<{token: string}>
export default function ActivatePage(props: {params: Params}) {
  return <ActivateClient token={props.params} />;
}
