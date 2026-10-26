# rehabhur-api

API REST de rehabilitación construida con Express 5, TypeScript y Zod.

## Requisitos

- Node.js
- npm

## Desarrollo

```sh
npm install
npm run dev
```

El servidor escucha en el puerto `3000` por defecto. Se puede configurar con la
variable de entorno `PORT` (entero entre `1` y `65535`).

## Verificación y producción

```sh
npm test
npm run typecheck
npm run build
npm start
```

## Rutas

- `GET /health`: estado del servidor.
- `GET /api/v1/teachers`, `GET /api/v1/teachers/:id`
- `POST /api/v1/teachers`, `PATCH /api/v1/teachers/:id`, `DELETE /api/v1/teachers/:id`
- `GET /api/v1/patients`, `GET /api/v1/patients/:id`
- `PATCH /api/v1/patients/:id`, `DELETE /api/v1/patients/:id`
- `GET /api/v1/exercises`

La creación y actualización de docentes aceptan `name`, `last_name`, `email`,
`dni` y `commission`. La actualización es parcial y requiere al menos un campo.
La actualización de pacientes también es parcial. Los datos de docentes,
pacientes y ejercicios continúan almacenándose en memoria; se reinician con el
proceso y no constituyen persistencia de producción.

## Imagen de prueba

Al integrar cambios en `develop`, el workflow ejecuta build y tests y, si ambos
finalizan correctamente, publica la imagen en GitHub Container Registry:

```sh
docker pull ghcr.io/rehabhur/rehabhur-api:develop
docker run --rm -p 3000:3000 ghcr.io/rehabhur/rehabhur-api:develop
```

También se publica una etiqueta con el SHA corto del commit para identificar
una versión concreta. El paquete debe tener habilitada la lectura para quienes
vayan a descargar la imagen.