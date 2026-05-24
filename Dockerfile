# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependencias (incluye devDeps necesarias para el build: Vite, Tailwind)
COPY package*.json ./
RUN npm ci

# Copia código fuente
COPY . .

# URL del backend — sobreescribir en el pipeline con --build-arg
ARG VITE_API_URL=http://localhost:8080/api
ENV VITE_API_URL=$VITE_API_URL

# Build de producción (genera /app/dist)
RUN npm run build

# ── Stage 2: serve ─────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Elimina config por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copia config personalizada y archivos estáticos
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run exige puerto 8080
EXPOSE 8080

# Corre nginx como no-root (uid 101 = nginx en alpine)
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid
USER nginx

CMD ["nginx", "-g", "daemon off;"]
