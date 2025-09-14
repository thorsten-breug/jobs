export $(grep -v '^#' ./.env.local | xargs -d '\n')
mvn spring-boot:run -Dspring-boot.run.profiles=dev