FROM openjdk:17.0.2
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN ./gradlew build
ENTRYPOINT ["java","-jar","build/libs/App-0.0.1-SNAPSHOT.jar"]

