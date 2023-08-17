# Solid Server

## Custom Community Solid Server configuration

A custom configuration of the Community Solid Server is used for this project.
In particular, the `LinkRelMetadataWriter` component's `linkRelMap` is configured to include the extra link relation
used in this project.

The first two objects in the `linkRelMap` are the default objects from
the [Community Solid Server's `link-rel.json` file](https://github.com/CommunitySolidServer/CommunitySolidServer/blob/main/config/ldp/metadata-writer/writers/link-rel.json)
.

## Docker

Docker and docker-compose are used to run the Community Solid Server.

Use the following command to start the server:

```bash
docker-compose up -d
```
