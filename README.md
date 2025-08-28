## Requisitos previos
Antes de comenzar, asegúrate de tener instalado en tu máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Cómo ejecutar el proyecto

### 1. Levantar el backend (Flask API)
Desde la raíz del proyecto, ingresar a la carpeta del backend y levanta los contenedores:

```bash
cd ..\backend_serverAppCrud
docker-compose up --build
```

### 2. Levantar el frontend
Desde la raíz del proyecto, ingresar a la carpeta del frontend y levanta los contenedores:

```bash
cd ..\project3
docker-compose --profile dev up --build
```

## Acceso a la aplicación
Una vez corriendo los contenedores, puedes ingresar a la app web desde:

http://localhost:5173/

