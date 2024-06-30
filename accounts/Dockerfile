FROM openjdk:17-jdk-slim
EXPOSE 8080
RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/*
COPY target/accounts-0.0.1-SNAPSHOT.jar accounts-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","accounts-0.0.1-SNAPSHOT.jar"]