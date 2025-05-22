echo "Initializing the Kanopy OIDC cluster..."
echo "This script should open your browser to log in to the Kanopy OIDC cluster."
echo "If you cannot authenticate, please follow the instructions here: https://kanopy.corp.mongodb.com/docs/"

CLUSTER=staging
NAMESPACE=skunkworks
KOLD=$KUBECONFIG
export KUBECONFIG=~/.kube/config.$CLUSTER
mkdir -p $(dirname $KUBECONFIG)
kanopy-oidc kube setup $CLUSTER > $KUBECONFIG
kanopy-oidc kube login
kubectl config set-context $(kubectl config current-context) --namespace=$NAMESPACE
export KUBECONFIG=$KOLD

# set the staging cluster as the default
cp ~/.kube/config.$CLUSTER ~/.kube/config

kubectl get pods