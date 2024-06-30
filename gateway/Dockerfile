FROM openjdk:17-jdk-slim
EXPOSE 8072
RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/*
COPY target/gateway-0.0.1-SNAPSHOT.jar gateway-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","gateway-0.0.1-SNAPSHOT.jar"]