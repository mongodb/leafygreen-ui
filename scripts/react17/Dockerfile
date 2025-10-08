FROM ubuntu:latest

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_VERSION=18.20.8
ENV PNPM_VERSION=9.15.0

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js using NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm@${PNPM_VERSION} \
    && npm cache clean --force

# Create workspace directory
WORKDIR /workspace

# Copy the codebase (excluding node_modules and dist)
COPY . /workspace/

# Set default command
CMD ["/bin/bash"]
