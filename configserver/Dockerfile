FROM openjdk:17-jdk-slim
EXPOSE 8071
RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/*
COPY target/configserver-0.0.1-SNAPSHOT.jar configserver-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","configserver-0.0.1-SNAPSHOT.jar"]
