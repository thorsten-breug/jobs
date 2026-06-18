# Jobs

Example of a _Spring Boot Application_ with a _React Frontend_ managing Company Jobs and Interviews.

## Prerequisites

### Database

The Application needs a Database Server that can be obtained from [Docker Hub](https://hub.docker.com/_/postgres).

- Start the Postgres Server. In case a docker image is used run the container with
```shell
docker run -itd -e POSTGRES_USER=... -e POSTGRES_PASSWORD=... --net host -v ./data:/var/lib/postgresql/data postgres:16.9
```
after replacing `...` with Your credentials (see [Docker Hub](https://hub.docker.com/_/postgres) for more information).

### Keycloak Identity management

You may pull a Keycloak image by running 
```shell
docker pull quay.io/keycloak/keycloak
```

Run the Container on http://localhost:8090 with
```shell
docker run --name mykeycloak -p 127.0.0.1:8090:8080 \
    -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
    quay.io/keycloak/keycloak:latest \
    start-dev
``` 
Setup Keycloak by creating 
- Realm named `test`
- Client with ID `jobs`
- User with credentials

## Frontend

Folder [fe](./fe/)

## Backend

Folder [be](./be/)