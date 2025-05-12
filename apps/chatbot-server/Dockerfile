# Use Node.js 20 as the base image
FROM node:20-alpine

# Expects the context `./` to be the root of the monorepo
# and expects the package to be built

COPY ./apps/chatbot-server/ apps/chatbot-server/

# Copy package files and workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy all required directories with their content
COPY tools/ tools/
COPY packages/ packages/

# Ensure the build scripts are executable
RUN chmod +x tools/build/scripts/build.sh
RUN chmod +x tools/build/scripts/build-ts.sh
RUN ls -la tools/build/scripts/

# Install pnpm globally
RUN npm install -g pnpm@9.15.6

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the server
RUN pnpm build --filter "lg-chatbot-server"

# Set the working directory to the chatbot-server
WORKDIR ./apps/chatbot-server

# Expose port 3030
EXPOSE 3030

# Set environment variable to use port 3030
ENV PORT=3030

# Start the server
CMD ["pnpm", "start"]