#!/bin/bash

helm uninstall redis
helm uninstall configserver
helm uninstall eurekaserver
helm uninstall gatewayserver
helm uninstall accountsdb
helm uninstall cardsdb
helm uninstall loansdb
helm uninstall accounts
helm uninstall cards
helm uninstall message
helm uninstall kafka
helm uninstall kafka-ui
helm uninstall prometheus
helm uninstall grafana-loki
helm uninstall grafana-tempo
helm uninstall grafana