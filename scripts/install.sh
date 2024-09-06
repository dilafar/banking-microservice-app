#!/bin/bash

# Install Redis chart
helm install -f values/redis.yaml redis charts/redis

# Install Bank charts
helm install -f values/configserver.yaml configserver charts/bank
helm install -f values/eurekaserver.yaml eurekaserver charts/bank
helm install -f values/gatewayserver.yaml gatewayserver charts/bank
helm install -f values/accountsdb.yaml accountsdb charts/bank
helm install -f values/cardsdb.yaml cardsdb charts/bank
helm install -f values/loansdb.yaml loansdb charts/bank
helm install -f values/accounts.yaml accounts charts/bank
helm install -f values/cards.yaml cards charts/bank
helm install -f values/loans.yaml loans charts/bank
helm install -f values/message.yaml message charts/bank

# Install Kafka and dependencies
cd charts/kafka || exit
helm dependencies build
cd ..
helm install kafka charts/kafka

# Install Kafka UI
helm install -f values/kafka-ui.yaml kafka-ui charts/bank

# Install Prometheus and dependencies
cd charts/kube-prometheus || exit
helm dependencies build
cd ..
helm install prometheus charts/kube-prometheus

# Install Grafana Loki and dependencies
cd charts/grafana-loki || exit
helm dependencies build
cd ..
helm install grafana-loki charts/grafana-loki

# Install Grafana Tempo and dependencies
cd charts/grafana-tempo || exit
helm dependencies build
cd ..
helm install grafana-tempo charts/grafana-tempo

# Install Grafana and dependencies
cd charts/grafana || exit
helm dependencies build
cd ..
helm install grafana charts/grafana

echo "Helm installations completed."
