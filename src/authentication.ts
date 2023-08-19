import {IAccountData} from "./commands/solid-pod-create";
import {Session} from "@inrupt/solid-client-authn-node";

export async function createSession(url: string, accountData: IAccountData): Promise<Session> {
  const response = await fetch(`${url}idp/credentials/`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      email: accountData.email,
      password: accountData.password,
      name: 'LDES-orchestrator'
    }),
  });
  const {id, secret} = await response.json();

  const session = new Session();
  await session.login({
    clientId: id,
    clientSecret: secret,
    oidcIssuer: url,
  })

  return session;
}
