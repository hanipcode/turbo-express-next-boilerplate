FROM nginx:alpine as base
RUN npm install -g pnpm
RUN npm install -g turbo

FROM base as builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY . .
RUN turbo prune api-docs --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN turbo build --filter api-docs

FROM base as runner
COPY --from=installer /app/apps/api-docs/dist ./
COPY . /usr/share/nginx/html
