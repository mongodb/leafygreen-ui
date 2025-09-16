#!/bin/bash
# Based on https://docs.aws.amazon.com/codeartifact/latest/ug/npm-auth.html#configuring-npm-without-using-the-login-command

# Declare our scope, domain, and repository
DOMAIN="mongodb"
REPOSITORY="leafygreen-ui"
# Define our scopes
SCOPES=(
  "@leafygreen-ui"
  "@lg-charts"
  "@lg-chat" 
  "@lg-tools"
)

# Check if aws command is available
if ! command -v aws &> /dev/null; then
  echo "Error: aws CLI is not installed or not in PATH"
  exit 1
fi

echo "Logging into CodeArtifact repository $REPOSITORY..."

CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain $DOMAIN --query authorizationToken --output text`

# Check if the token retrieval was successful
if [ -z "$CODEARTIFACT_AUTH_TOKEN" ] || [ "$CODEARTIFACT_AUTH_TOKEN" == "None" ]; then
  echo "\nFailed to retrieve authorization token from AWS"
  echo "Ensure that your AWS profile is configured correctly in ~/.aws/config (and has access to CodeArtifact)"
  echo "Login to AWS in OKTA to get your current credentials: https://corp.mongodb.com/"
  exit 1
fi

# Get the endpoint data, and extract the repository URL from the JSON output
CODEARTIFACT_ENDPOINT_JSON=`aws codeartifact get-repository-endpoint --domain $DOMAIN --repository $REPOSITORY --format npm`
CODEARTIFACT_REGISTRY=$(echo $CODEARTIFACT_ENDPOINT_JSON | jq -r '.repositoryEndpoint')

# Check if jq extraction was successful
if [ -z "$CODEARTIFACT_REGISTRY" ] || [ "$CODEARTIFACT_REGISTRY" == "null" ]; then
  echo "Error: Failed to extract repository endpoint from AWS response"
  exit 1
fi

# Remove the https:// prefix from the endpoint URL for npm config
CODEARTIFACT_REGISTRY_URI=$(echo $CODEARTIFACT_REGISTRY | sed 's|^https:||')

echo "CodeArtifact Endpoint: $CODEARTIFACT_REGISTRY"

# Update the user's global npm config (~/.npmrc) with the new registry and auth token

# Configure each scope to use our CodeArtifact registry
for SCOPE in "${SCOPES[@]}"; do
  echo "Configuring $SCOPE to use CodeArtifact registry..."
  npm config set "${SCOPE}:registry" $CODEARTIFACT_REGISTRY
done

npm config set $CODEARTIFACT_REGISTRY_URI:_authToken=$CODEARTIFACT_AUTH_TOKEN
echo "Updated global ~/.npmrc"

# Verify by pinging the registry
npm -d ping --registry=$CODEARTIFACT_REGISTRY

echo "✅ Successfully logged into CodeArtifact repository"
