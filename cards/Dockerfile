FROM openjdk:17-jdk-slim
EXPOSE 9000
RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/*
COPY target/cards-0.0.1-SNAPSHOT.jar cards-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","cards-0.0.1-SNAPSHOT.jar"]