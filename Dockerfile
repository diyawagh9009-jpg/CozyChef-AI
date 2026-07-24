# ---------- Build React Client ----------
FROM node:20-alpine AS client-builder

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install

COPY client ./

RUN npm run build

# Build the server
FROM node:20-alpine AS server-builder
WORKDIR /app/server
COPY server/package.json ./
RUN npm install
COPY server ./

# Final runtime image
FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=client-builder /app/client/dist ./client/dist
COPY --from=server-builder /app/server/node_modules ./server/node_modules
COPY --from=server-builder /app/server/index.js ./server/index.js

ENV NODE_ENV=production
WORKDIR /app/server
EXPOSE 4000
CMD ["node", "index.js"]
