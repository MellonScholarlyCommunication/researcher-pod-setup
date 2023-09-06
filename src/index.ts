import {Command} from 'commander';
import {input, password} from '@inquirer/prompts';
import createSolidPods from './commands/solid-pod-create';
import {initializeLDESinLDP, makeLdesPubliclyAccessible} from "./ldes/ldes-in-ldp";
import {createSession} from "./authentication";

export default function getProgram(): Command {
  const program = new Command();

  program
    .name('researcher-pod-setup')
    .description('Library to setup a Researcher Pod based on the Researcher Pod spec for Mellon')
    .version('0.0.1')
    .option('-u, --url <string>', 'URL of the CSS pod hosting service.')
    .option('-n, --name <string>', 'Name for the newly created Solid account.')
    .option('-e, --email <string>', 'Email address for the user. Default to <uname>@test.edu')
    .option('-p, --password <string>', 'User password. Default to <uname>')
    .option('-i, --identifier <string>', 'Relative LDES in LDP identifier (without podBase). Default to <podBase>ldesinldp/')
    .action(async (options) => {
      // Get necessary input from user if not provided as options
      if (!options.url) {
        while (!options.url) {
          options.url = await input({message: 'URL of the CSS pod hosting service'});
        }
      }
      if (!options.name) {
        while (!options.name) {
          options.name = await input({message: 'Name for the newly created Solid account'});
        }
      }
      if (!options.email) {
        options.email = await input({message: 'Email address for the user. Default to <uname>@test.edu'});
        if (!options.email) {
          options.email = `${options.name}@test.edu`;
        }
      }
      if (!options.password) {
        options.password = await password({message: 'User password. Default to <uname>', mask: true});
        if (!options.password) {
          options.password = options.name;
        }
      }
      if (!options.identifier) {
        options.identifier = await input({message: 'Relative LDES in LDP identifier (without podBase). Default to <podBase>ldesinldp/'});
        if (!options.identifier) {
          options.identifier = 'ldesinldp/';
        }
      }

      // Make sure the base URL and identifier ends with a slash
      if (!options.url?.endsWith('/')) {
        options.url += '/';
      }
      if (!options.identifier?.endsWith('/')) {
        options.identifier += '/';
      }

      // Create the pod
      const accountData = [{
        name: options.name,
        email: options.email,
        password: options.password
      }];
      let responses;
      try {
        responses = await createSolidPods(options.url, accountData);
      } catch (e: any) {
        console.error(`Could not create pod: ${e.message}`);
        return;
      }

      // Create authenticated session
      for (let response of responses) {
        const session = await createSession(options.url, accountData.filter(account => response.email === account.email)[0]);

        // Set up the LDES in the created pod
        await initializeLDESinLDP(response.podBaseUrl, options.identifier, session);

        // Make the LDES in the created pod public readable
        await makeLdesPubliclyAccessible(response.podBaseUrl + options.identifier, session);
      }

      // Force exit to prevent hanging - see https://github.com/MellonScholarlyCommunication/researcher-pod-setup/issues/1
      process.exit(0);
    });

  return program;
}
