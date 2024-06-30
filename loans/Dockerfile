FROM openjdk:17-jdk-slim
EXPOSE 8090
RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/*
COPY target/loans-0.0.1-SNAPSHOT.jar loans-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","loans-0.0.1-SNAPSHOT.jar"]