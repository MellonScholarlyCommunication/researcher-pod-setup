import {Command} from 'commander';
import {input, password} from '@inquirer/prompts';
import createSolidPods from './commands/solid-pod-create';

export default function getProgram(): Command {
  console.log('getProgram');
  const program = new Command();

  program
    .name('researcher-pod-setup')
    .description('Library to setup a Researcher Pod based on the Researcher Pod spec for Mellon')
    .version('0.0.1')
    .option('-u, --url <string>', 'URL of the CSS pod hosting service.')
    .option('-n, --name <string>', 'Name for the newly created Solid account.')
    .option('-e, --email <string>', 'Email address for the user. Default to <uname>@test.edu')
    .option('-p, --password <string>', 'User password. Default to <uname>')
    .action(async (options) => {
      // Get necessary input from user if not provided as options
      if (!options.url) {
        options.url = await input({message: 'URL of the CSS pod hosting service'});
      }
      if (!options.name) {
        options.name = await input({message: 'Name for the newly created Solid account'});
      }
      if (!options.email) {
        options.email = await input({message: 'Email address for the user. Default to <uname>@test.edu'});
      }
      if (!options.password) {
        options.password = await password({message: 'User password. Default to <uname>', mask: true});
      }

      // Create the pod
      const accountData = [{
        name: options.name,
        email: options.email,
        password: options.password
      }];
      try {
        await createSolidPods(options.url, accountData);
      } catch (e: any) {
        console.error(`Could not create pod: ${e.message}`);
      }
    });

  return program;
}
