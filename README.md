# Researcher Pod Setup

This repository contains a NodeJS script that can be used to setup a researcher pod based on the [Researcher Pod spec for the Mellon project](https://mellonscholarlycommunication.github.io/spec-overview/).

First, it will create a new pod for the researcher.
Then, it will set up a [Linked Data Event Stream](https://semiceu.github.io/LinkedDataEventStreams/) in the created Pod automatically using the [LDES in LDP](https://www.npmjs.com/package/@treecg/versionawareldesinldp) library.

## Installation and Usage

First, clone the project and install the dependencies:

```bash
git clone git@github.com:MellonScholarlyCommunication/researcher-pod-setup.git
cd researcher-pod-setup
npm install
```

Then, make sure you have a Solid server running, exposing the ldes:EventStream the script will create on all the resources as a Link Header.
Therefor, you can use the [semi-constant-headers-writer-component](https://github.com/CommunitySolidServer/semi-constant-headers-writer-component) for the [Community Solid Server (CSS)](https://github.com/CommunitySolidServer/CommunitySolidServer/).

A working configuration of the CSS with this component can be found in the [solid-server](/solid-server) folder.
More information about this configuration can be found in the [README](/solid-server/README.md) of that folder.
You can use Docker and docker-compose to run the CSS with this configuration:

```bash
cd solid-server
docker-compose up -d
cd ..
```

Then, you can run the script:

```bash
# To provide the input interactively
node bin/index.js

# Or you can provide the input as arguments
node bin/index.js -u <Solid server URL> -n <name of newly created Solid account> -e <Email address for the user> -p <User password> -i <Relative LDES in LDP identifier>

# For example:
node bin/index.js -u http://localhost:3000 -n researcher-test -e researcher-test@example -p researcher-test -i ldesinldp/

# Only the first 2 arguments are required, the others have defaults, so you could also run:
node bin/index.js -u http://localhost:3000 -n researcher-test
```
