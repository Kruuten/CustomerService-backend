FROM gradle:7.4-jdk-alpine
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN gradle build
ENTRYPOINT ["java","-jar","build/libs/App-0.0.1-SNAPSHOT.jar"]

