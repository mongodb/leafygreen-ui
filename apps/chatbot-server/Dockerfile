# Use Node.js 18 as the base image
FROM node:18-alpine AS base
RUN apk add --no-cache py3-pip make g++ git
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy package files and workspace configuration
COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./

RUN pnpm fetch

# Copy the chatbot-server app
COPY ./apps/chatbot-server/ chatbot-server/

# Copy all required directories with their content, excluding unnecessary directories
# COPY tools/ tools/
# COPY packages/ packages/

# WORKDIR ./
# RUN pnpm install --frozen-lockfile

# RUN ls -la ./node_modules
# RUN ls -la ./tools/crawler
RUN ls -la ./chatbot-server/dist

# Build the server
# RUN pnpm run build --filter "lg-chatbot-server" -- --verbose

# Set the working directory to the chatbot-server
WORKDIR ./chatbot-server
ENV PORT=3030
EXPOSE 3030

# Start the server
CMD ["pnpm", "start"]