#!/bin/bash

# Ensure filePath is provided
if [[ -z $1 ]]; then
    echo "Usage: $0 <filePath>"
    exit 1
fi

filePath=$1

# Check if file exists
if [[ ! -f $filePath ]]; then
    echo "Error: File '$filePath' does not exist."
    exit 1
fi

# Extract Docker image name from the file
dockerImageName=$(awk 'NR==1 {print $2}' "$filePath")
if [[ -z $dockerImageName ]]; then
    echo "Error: Could not extract Docker image name from '$filePath'."
    exit 1
fi

echo "Docker Image: $dockerImageName"

trivy image -f json -o trivy.json --severity HIGH,CRITICAL --exit-code 1 $dockerImageName

exit_code=$?


if [[ $exit_code -eq 1 ]]; then
    echo "Image scanning failed on $dockerImageName. HIGH or CRITICAL vulnerabilities found."
    exit 1
else
    echo "Image scanning passed. No HIGH or CRITICAL vulnerabilities found."
fi