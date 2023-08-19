import {LDESinLDP, SolidCommunication} from '@treecg/versionawareldesinldp';
import {Session} from "@inrupt/solid-client-authn-node";

export async function initializeLDESinLDP(baseUrl: string, identifier: string, session: Session) {
  const ldesInLdpIdentifier = `${baseUrl}${identifier}`; // Base URL of the LDES in LDP
  const communication = new SolidCommunication(session);
  const ldesInLdp = new LDESinLDP(ldesInLdpIdentifier, communication);

  // initialize
  await ldesInLdp.initialise({treePath: 'http://purl.org/dc/terms/created'});
}
