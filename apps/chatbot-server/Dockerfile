# Use Node.js 18 as the base image
FROM node:18-alpine AS base
RUN apk add --no-cache py3-pip make g++ git
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy package files and workspace configuration
COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./

RUN pnpm fetch --prod

# Copy the chatbot-server app
COPY ./apps/chatbot-server/ chatbot-server/
COPY ./.env chatbot-server/.env.local

RUN ls -la chatbot-server/

# Set the working directory to the chatbot-server
WORKDIR ./chatbot-server
ENV PORT=3030
EXPOSE 3030

# Start the server
CMD ["pnpm", "start"]