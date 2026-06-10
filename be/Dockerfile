FROM openjdk:25-ea-1-bullseye
COPY target/jobs-1.0.0.jar jobs-1.0.0.jar
ENTRYPOINT ["java","-jar","/jobs-1.0.0.jar","--spring.profiles.active=develop"]
