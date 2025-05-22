#!/bin/bash
# Script to port-forward to the lg-chatbot-server pod in Kubernetes

# Source the .env file to get the PORT and NAMESPACE
if [ -f ".env" ]; then
  export $(grep -v '^#' ".env" | xargs)
else
  echo "Error: .env file not found"
  exit 1
fi

# Make sure we have a PORT value
if [ -z "$PORT" ]; then
  echo "Error: PORT not defined in .env"
  exit 1
fi

# Set KUBECONFIG path from .env if available
if [ -n "$KUBECONFIG" ]; then
  export KUBECONFIG=$KUBECONFIG
fi

echo "Using KUBECONFIG: $KUBECONFIG"
echo "Looking for latest lg-chatbot-server pod in "$NAMESPACE"..."

# Get the latest pod starting with lg-chatbot-server
# POD_NAME=$(kubectl get pods -n $NAMESPACE | grep "^lg-chatbot-server" | sort -k1 | tail -n1 | awk '{print $1}')
POD_NAME=$(KUBECONFIG=~/.kube/config.staging kubectl get pods -n $NAMESPACE | grep "^lg-chatbot-server" | sort -k1 | tail -n1 | awk '{print $1}')

if [ -z "$POD_NAME" ]; then
  echo "Error: No pod starting with 'lg-chatbot-server' found"
  exit 1
fi

echo "Found pod: $POD_NAME"
echo "Setting up port forwarding on port $PORT..."

# Set up port forwarding
KUBECONFIG=~/.kube/config.staging kubectl port-forward --namespace=$NAMESPACE $POD_NAME 3333:$PORT