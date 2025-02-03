#!/bin/bash

echo $1

trivy image -f json -o reports/docker-cis-bench/$2 --severity HIGH,CRITICAL --exit-code 1 --compliance docker-cis-1.6.0 $1

exit_code=$?


if [[ $exit_code -eq 1 ]]; then
    echo "Image scanning failed on $1. HIGH or CRITICAL vulnerabilities found."
    exit 1
else
    echo "Image scanning passed. No HIGH or CRITICAL vulnerabilities found."
fi