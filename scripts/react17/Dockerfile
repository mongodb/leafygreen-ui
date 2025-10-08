FROM node:18.20.8

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV PNPM_VERSION=9.15.0

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm with specific version
RUN npm install -g pnpm@${PNPM_VERSION} \
    && npm cache clean --force

# Create workspace directory
WORKDIR /workspace

# Copy the codebase (excluding node_modules and dist)
COPY . /workspace/

# Set default command
CMD ["/bin/bash"]
