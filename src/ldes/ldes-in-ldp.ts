import {LDESinLDP, SolidCommunication} from '@treecg/versionawareldesinldp';
import {Session} from "@inrupt/solid-client-authn-node";

export async function initializeLDESinLDP(baseUrl: string, identifier: string, session: Session) {
  const ldesInLdpIdentifier = `${baseUrl}${identifier}`; // Base URL of the LDES in LDP
  const communication = new SolidCommunication(session);
  const ldesInLdp = new LDESinLDP(ldesInLdpIdentifier, communication);

  // initialize
  await ldesInLdp.initialise({treePath: 'http://purl.org/dc/terms/created'});
}

export async function makeLdesPubliclyReadable(ldesInLdpIdentifier: string, session: Session) {
  const acl = `# Root ACL resource for the LDES
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.

# The LDES is readable by the public
<#public>
    a acl:Authorization;
    acl:agentClass foaf:Agent;
    acl:accessTo <./>;
    acl:default <./>;
    acl:mode acl:Read.
  `;

  await session.fetch(ldesInLdpIdentifier + '.acl', {
    method: 'PUT',
    headers: {
      'Content-Type': 'text/turtle',
      'If-None-Match': '*',
    },
    body: acl,
  });
}
