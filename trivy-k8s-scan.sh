#!/bin/bash

echo $1
cache_dir=$2

trivy image -f json -o trivy-k8s-image.json --severity HIGH,CRITICAL --exit-code 1 $1 --cache-dir $cache_dir

exit_code=$?


if [[ $exit_code -eq 1 ]]; then
    echo "Image scanning failed. HIGH or CRITICAL vulnerabilities found."
    exit 1
else
    echo "Image scanning passed. No HIGH or CRITICAL vulnerabilities found."
fi