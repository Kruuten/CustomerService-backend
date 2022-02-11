FROM openjdk:17.0.2
ARG JAR_FILE=build/libs/Service_with_search-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

