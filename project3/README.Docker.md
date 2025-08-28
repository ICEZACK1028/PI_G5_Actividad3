# Docker Setup para CRUD de Usuarios

Esta aplicación React puede ejecutarse usando Docker tanto en modo desarrollo como producción.

## 🚀 Opciones de Despliegue

### 1. Desarrollo con Docker Compose

Para ejecutar la aplicación en modo desarrollo con hot reload:

```bash
# Construir y ejecutar en modo desarrollo
docker-compose --profile dev up --build

# Ejecutar en segundo plano
docker-compose --profile dev up -d --build
```

La aplicación estará disponible en: http://localhost:5173

### 2. Producción con Docker Compose

Para ejecutar la aplicación optimizada para producción:

```bash
# Construir y ejecutar en modo producción
docker-compose --profile prod up --build

# Ejecutar en segundo plano
docker-compose --profile prod up -d --build
```

La aplicación estará disponible en: http://localhost:80

### 3. Comandos Docker Directos

#### Desarrollo:
```bash
# Construir imagen de desarrollo
docker build -f Dockerfile.dev -t user-crud-dev .

# Ejecutar contenedor de desarrollo
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules user-crud-dev
```

#### Producción:
```bash
# Construir imagen de producción
docker build -t user-crud-prod .

# Ejecutar contenedor de producción
docker run -p 80:80 user-crud-prod
```

## 📁 Estructura de Archivos Docker

```
├── Dockerfile              # Imagen multi-stage para producción
├── Dockerfile.dev          # Imagen para desarrollo
├── docker-compose.yml      # Orquestación de servicios
├── nginx.conf              # Configuración de Nginx para producción
├── .dockerignore           # Archivos excluidos del contexto Docker
└── README.Docker.md        # Esta documentación
```

## 🔧 Configuraciones

### Dockerfile (Producción)
- **Etapa 1**: Build de la aplicación con Node.js
- **Etapa 2**: Servir archivos estáticos con Nginx
- **Optimizaciones**: Compresión gzip, cache de archivos estáticos, configuración SPA

### Dockerfile.dev (Desarrollo)
- Hot reload habilitado
- Volúmenes montados para desarrollo en tiempo real
- Puerto 5173 expuesto (Vite default)

### Nginx Configuration
- Configuración optimizada para SPA
- Compresión gzip habilitada
- Headers de seguridad
- Cache para archivos estáticos

## 🛠️ Comandos Útiles

```bash
# Ver logs de los contenedores
docker-compose logs -f

# Parar todos los servicios
docker-compose down

# Limpiar volúmenes y redes
docker-compose down -v --remove-orphans

# Reconstruir sin cache
docker-compose build --no-cache

# Ver contenedores en ejecución
docker ps

# Acceder al shell del contenedor
docker exec -it <container_name> sh
```

## 🌐 Variables de Entorno

Puedes crear un archivo `.env` para configurar variables específicas:

```env
# .env
NODE_ENV=production
PORT=80
```

## 📊 Optimizaciones Incluidas

- **Multi-stage build**: Reduce el tamaño final de la imagen
- **Nginx optimizado**: Configuración para mejor rendimiento
- **Compresión gzip**: Reduce el tamaño de transferencia
- **Cache de archivos estáticos**: Mejora la velocidad de carga
- **Configuración SPA**: Manejo correcto de rutas del lado cliente

## 🔒 Seguridad

- Headers de seguridad configurados en Nginx
- Exclusión de archivos sensibles con .dockerignore
- Configuración CSP básica
- Usuario no-root en contenedores