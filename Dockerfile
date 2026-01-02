ARG NODE_VERSION=22

# node:22-slim (bookworm)
ARG FROM_IMAGE=node@sha256:7378f5a4830ef48eb36d1abf4ef398391db562b5c41a0bded83192fbcea21cc8
ARG FROM_IMAGE_RUNTIME=${FROM_IMAGE}
ARG FROM_IMAGE_DEV=build

ARG DEBIAN_FRONTEND=noninteractive

# ==============================================================================
# Build Stage
# ==============================================================================
FROM $FROM_IMAGE AS build
ARG DEBIAN_FRONTEND
ARG NODE_VERSION

LABEL maintainer="Evans Doe Ocansey <evans@aims.ac.za>"

# Setup directory structure
RUN rm -rf /workspace

# prepare workspace and dependencies
WORKDIR /workspace

# Copy package files for dependency installation
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies
RUN npm ci --prefer-offline --no-audit

# Copy the rest of the source code
COPY . .

# Build the Next.js application
RUN npm run build

# ==============================================================================
# Runtime Stage
# ==============================================================================
FROM $FROM_IMAGE_RUNTIME AS runtime
ARG DEBIAN_FRONTEND

WORKDIR /workspace

# Copy built assets from build stage
COPY --from=build /workspace/.next ./.next
COPY --from=build /workspace/node_modules ./node_modules
COPY --from=build /workspace/public ./public
COPY --from=build /workspace/package.json ./package.json

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]

# ==============================================================================
# Development Stage
# ==============================================================================
FROM $FROM_IMAGE_DEV AS dev
ARG DEBIAN_FRONTEND

RUN apt-get update && apt-get install -yq \
    git \
    tmux \
    zsh \
    htop \
    glances \
    tree \
    curl \
    neovim \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set timezone
ARG TZ=Europe/Vienna
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install tmux, vim and oh-my-zsh
RUN set -ex \    
    && cd \
    && git clone https://github.com/gpakosz/.tmux.git \
    && ln -s -f .tmux/.tmux.conf && cp .tmux/.tmux.conf.local . \
    && curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | bash
ENV SHELL=/bin/zsh
CMD ["zsh"]
