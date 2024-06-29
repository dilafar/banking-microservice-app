FROM openjdk:17-jdk-slim
EXPOSE 8070
RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/*
COPY target/eurekaserver-0.0.1-SNAPSHOT.jar eurekaserver-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","eurekaserver-0.0.1-SNAPSHOT.jar"]