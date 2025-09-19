# JOBS Backend

Example of a Spring Boot Application that exposes a REST API for CRUD operations on Companies, their Job offers and Job Interviews.

## Environment Variables

The following Environment Variables are required in order to connect to the Database Server:
- `DATABASE_URL`<br>JDBC connection string with Database name (e.g. jdbc:postgresql://127.0.0.1:5432/jobs)
- `DATABASE_USER`<br>Database Server's Super User
- `DATABASE_PASSWORD`<br>User's Password

## Local Setup

The Application needs a Database Server that can be obtained from [Docker Hub](https://hub.docker.com/_/postgres).

- Start the Postgres Server. In case a docker image is used run the container with `docker run -itd -e POSTGRES_USER=... -e POSTGRES_PASSWORD=... --net host -v ./data:/var/lib/postgresql/data postgres:16.9
` after replacing `...` with Your credentials (see [Docker Hub](https://hub.docker.com/_/postgres) for more information).

- Run `mvn spring-boot:run -Dspring-boot.run.profiles=dev` after exporting the Environment Variables. Profile `dev` returns CORS Headers suitable for running on your local machine (see Bean `corsConfigurer()` in Class [JobsApplication](./src/main/java/com/example/jobs/JobsApplication.java)).

### Swagger (OpenAPI 3.0)

REST API Specification: http://localhost:8080/swagger-ui/index.html

## Build

- Run `mvn clean package -DskipTests` for building the JAR file in `./target/jobs-1.1.0.jar`.<br>When building the Application with Tests running (`mvn clean package`) make sure the Environment Variables are set.

### Docker

- Build an Image with `docker build --tag jobs-backend:latest .` loading the [Dockerfile](./Dockerfile).

- The Image will run within a Docker container accessing the Database Server on the local Host with the Environment Variables being specified:<br>`docker run -e DATABASE_URL=jdbc:postgresql://127.0.0.1:5432/jobs -e DATABASE_USER=<YOUR USER> -e DATABASE_PASSWORD=<YOUR PASSWORD> --network host jobs-backend:latest`

- In case the Database Server and the Backend Application should run in Containers within a Docker Network run `docker compose -f ./docker-compose.yaml up`.
