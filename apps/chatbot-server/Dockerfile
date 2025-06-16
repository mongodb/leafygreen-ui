# Use Node.js 18 as the base image
FROM node:18-alpine as base
ENV PORT=8080
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm add -g turbo@2.0.6

WORKDIR /app

FROM base as setup
  COPY . .
  RUN turbo prune lg-chatbot-server --docker

FROM base as build
  RUN apk add --update --no-cache py3-pip make g++ libc6-compat
  COPY .npmrc .npmrc
  COPY --from=setup /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
  COPY --from=setup /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
  COPY --from=setup /app/out/json/ .

  RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile 
    # Docker runs pnpm as root and then pnpm won't run package scripts unless we pass unsafe-perm
  RUN pnpm rebuild --filter="lg-chatbot-server"
  
  COPY --from=setup /app/out/full/ ./
  COPY turbo.json turbo.json
  
  # Ensure .bin is in the PATH (lg-build)
  RUN pnpm install -w --prefer-offline --unsafe-perm
  ENV PATH="/app/node_modules/.bin:/app/tools/build/node_modules/.bin:${PATH}"

  # Build the server app project
  RUN pnpm run build --filter="lg-chatbot-server"

  # Set the working directory to the chatbot-server
  WORKDIR ./apps/chatbot-server

  EXPOSE $PORT

  # Start the server
  CMD ["pnpm", "start"]