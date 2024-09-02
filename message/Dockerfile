FROM openjdk:17-jdk-slim
EXPOSE 8080
RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/*
COPY target/message-0.0.1-SNAPSHOT.jar message-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","message-0.0.1-SNAPSHOT.jar"]