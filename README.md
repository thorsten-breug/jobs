# Jobs

Example of a _Spring Boot Application_ with a _React Frontend_ managing Company Jobs and Interviews.

## Database

The Application needs a Database Server that can be obtained from [Docker Hub](https://hub.docker.com/_/postgres).

- Start the Postgres Server. In case a docker image is used run the container with
```shell
docker run -itd -e POSTGRES_USER=... -e POSTGRES_PASSWORD=... --net host -v ./data:/var/lib/postgresql/data postgres:16.9
```
after replacing `...` with Your credentials (see [Docker Hub](https://hub.docker.com/_/postgres) for more information).

## Frontend

Folder [fe](./fe/)

## Backend

Folder [be](./be/)