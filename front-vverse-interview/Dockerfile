# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Copy the rest of the frontend
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite
CMD ["pnpm", "dev", "--host"]
