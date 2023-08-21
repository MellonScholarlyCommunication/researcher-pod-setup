# Solid Server

## Custom Community Solid Server configuration

A custom configuration of the Community Solid Server is used for this project.
In particular, the [semi-constant-headers-writer-component](https://github.com/CommunitySolidServer/semi-constant-headers-writer-component) is used to configure the CSS instance to include the extra ldes:EventStream Link Header exposing the LDES that will be created in this script and is used in this project.

At the bottom of the [custom.json](custom.json) file, the configuration for the semi-constant-headers-writer-component is added.
In particular, the `ldes:EventStream` Link Header is added to all resources in the pod. The value of the Link Header is the relative identifier of the LDES in LDP that will be created in this script, being `{storageRoot}ldesinldp/`.

Be aware! If you would choose an identifier different from `ldesinldp/`, you will have to change the value of the `ldes:EventStream` Link Header in the [custom.json](custom.json) file as well.

## Docker

Docker and docker-compose are used to run the Community Solid Server.

Use the following command to start the server:

```bash
docker-compose up -d
```
