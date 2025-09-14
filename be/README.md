# JOBS Backend

Example of a Spring Boot Application that exposes a REST API for CRUD operations on Companies, their Job offers and Job Interviews.

## Environment Variables

The following Environment Variables are required in order to connect to the Database Server:
- `DATABASE_URL`<br>JDBC connection string with Database name (e.g. jdbc:postgresql://127.0.0.1:5432/jobs)
- `DATABASE_USER`<br>Database Server's Super User
- `DATABASE_PASSWORD`<br>User's Password

## Local Setup

The Application needs a Database Server that can be obtained from [Docker Hub](https://hub.docker.com/_/postgres).

- Create a Database named according to the connection string in the Environment Variable `DATABASE_URL`.

- Run `mvn spring-boot:run -Dspring-boot.run.profiles=dev` after exporting the Environment Variables. Profile `dev` disables CORS settings for running on the local host.

### Swagger (OpenAPI 3.0)

REST API Specification: http://localhost:8080/swagger-ui/index.html

## Build

- Run `mvn clean package -DskipTests` for building the JAR file in `./target/jobs-1.1.0.jar`.<br>When building the Application with Tests running (`mvn clean package`) make sure the Environment Variables are set.

### Docker

- Build an Image with `docker build --tag jobs-backend:latest .` loading the [Dockerfile](./Dockerfile).

- The Image will run within a Docker container accessing the Database Server on the local Host with the Environmaent Variables being specified:<br>`docker run -e DATABASE_URL=jdbc:postgresql://127.0.0.1:5432/jobs --net host -e DATABASE_USER=<YOUR USER> -e DATABASE_PASSWORD=<YOUR PASSWORD> jobs-backend:latest`<br>Make sure to create a Database and a User Role before running the container.

- In case the Database Server and the Backen Application should run in Containers within a Docker Network run `docker compose -f ./docker-compose.yaml up`.
