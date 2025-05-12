# Use Node.js 20 as the base image
FROM node:20-alpine

# Expects the context `./` to be the root of the monorepo
# and expects the package to be built

COPY ./apps/chatbot-server ./apps/chatbot-server

# Copy the node_modules directory from the root
COPY node_modules ./node_modules

# Install pnpm globally
RUN npm install -g pnpm@9.15.6

# Set the working directory to the chatbot-server
WORKDIR ./apps/chatbot-server

# Expose port 3030
EXPOSE 3030

# Set environment variable to use port 3030
ENV PORT=3030

# Start the server
CMD ["pnpm", "start"]