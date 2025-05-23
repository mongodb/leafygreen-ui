#!/bin/bash

# Configuration
FUNCTION_NAME="ragCrawl"
ZIP_FILE="./dist/lambda.zip"

# Check if the zip file exists
if [ ! -f "$ZIP_FILE" ]; then
    echo "Error: $ZIP_FILE does not exist. Please build the Lambda package first."
    exit 1
fi

echo "Deploying $ZIP_FILE to Lambda function: $FUNCTION_NAME"


aws lambda update-function-code \
  --function-name $FUNCTION_NAME \
  --zip-file fileb://$ZIP_FILE \


if [ $? -eq 0 ]; then
    echo "Successfully updated Lambda function: $FUNCTION_NAME"
    
    # Optional: Wait for function to be updated and then publish a new version
    echo "Waiting for function update to complete..."
    aws lambda wait function-updated --function-name $FUNCTION_NAME 
    
    # Print the function details
    echo "Getting updated function details..."
    aws lambda get-function \
        --function-name $FUNCTION_NAME \
        --query 'Configuration.[FunctionName,Version,LastModified]'
else
    echo "Failed to update Lambda function"
    exit 1
fi
