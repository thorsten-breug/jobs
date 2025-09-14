FROM openjdk:17-jdk-alpine
COPY target/jobs-1.0.0.jar jobs-1.0.0.jar
ENTRYPOINT ["java","-jar","/jobs-1.0.0.jar","--spring.profiles.active=dev"]
