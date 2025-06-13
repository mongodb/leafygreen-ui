# Use Node.js 18 as the base image
FROM node:18-alpine
RUN apk add --no-cache py3-pip make g++ git
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy package files and workspace configuration
# COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./

COPY . .

RUN pnpm fetch

# Copy the chatbot-server app
# COPY ./apps/chatbot-server/ chatbot-server/

RUN ls -la ./apps/chatbot-server/

RUN pnpm run build --filter="lg-chatbot-server"

# Set the working directory to the chatbot-server
WORKDIR ./apps/chatbot-server
ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["pnpm", "start"]