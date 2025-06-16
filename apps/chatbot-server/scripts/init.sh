echo "Initializing the Kanopy OIDC cluster..."
echo "This script should open your browser to log in to the Kanopy OIDC cluster."
echo "If you cannot authenticate, please follow the instructions here: https://kanopy.corp.mongodb.com/docs/"

# Source the .env file to get the PORT and NAMESPACE
if [ -f ".env" ]; then
  export $(grep -v '^#' ".env" | xargs)
else
  echo "Error: .env file not found"
  exit 1
fi


CLUSTER=staging
export KUBECONFIG=~/.kube/config.$CLUSTER
mkdir -p $(dirname $KUBECONFIG)
kanopy-oidc kube setup $CLUSTER > $KUBECONFIG
kanopy-oidc kube login
kubectl config set-context $(kubectl config current-context) --namespace=$NAMESPACE
