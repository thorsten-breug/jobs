export $(grep -v '^#' ./.env.local | xargs -d '\n')
mvn clean package