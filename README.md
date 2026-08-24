# Segundo Proyecto Backend - The Bridge (Project Break 2 y 3)

API REST completa con autenticación segura (cookies httpOnly), gestión de productos, reseñas, wishlist, carrito, checkout y pagos con Stripe. Desarrollada como proyecto del módulo de Backend y ampliada en Project Break 3 (bootcamp Full Stack Developer de The Bridge).

## Demo en producción

- API: https://segundo-proyecto-backend.onrender.com
- Documentación Swagger: https://segundo-proyecto-backend.onrender.com/api-docs

## Stack tecnológico

- Runtime: Node.js + Express (ES Modules)
- Base de datos relacional: PostgreSQL (Supabase) vía Prisma ORM con @prisma/adapter-pg
- Base de datos NoSQL: MongoDB (Atlas) vía Mongoose
- Autenticación: JWT en cookie httpOnly + bcrypt
- Subida de imágenes: Cloudinary + Multer
- Pagos: Stripe (modo test)
- Documentación: Swagger (OpenAPI 3.0)
- Testing: Jest + Supertest

## Estructura del proyecto

- src/config — Configuración (Cloudinary, Multer, Swagger, DB)
- src/controllers — Lógica de manejo de peticiones
- src/services — Lógica de negocio y acceso a datos
- src/routes — Definición de rutas y documentación Swagger
- src/middlewares — Auth (verifyToken, requireRole), manejo de errores
- src/models — Esquemas de Mongoose (Reviews, Wishlist)
- src/tests — Tests de integración con Supertest
- prisma — Esquema de Prisma (modelos SQL)
- app.js — Configuración de la app Express
- server.js — Punto de entrada (arranque del servidor)

## Instalación y uso en local

### 1. Clonar el repositorio

    git clone https://github.com/YENYRC/segundo-proyecto-backend.git
    cd segundo-proyecto-backend

### 2. Instalar dependencias

    npm install

### 3. Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto con las siguientes variables:

    DATABASE_URL="postgresql://usuario:password@host:6543/postgres?pgbouncer=true"
    DIRECT_URL="postgresql://usuario:password@host:5432/postgres"
    MONGO_URI="mongodb+srv://usuario:password@cluster.mongodb.net/?appName=Cluster0"
    JWT_SECRET="tu_clave_secreta"
    CLOUDINARY_CLOUD_NAME="tu_cloud_name"
    CLOUDINARY_API_KEY="tu_api_key"
    CLOUDINARY_API_SECRET="tu_api_secret"
    STRIPE_SECRET_KEY="sk_test_..."
    STRIPE_PUBLIC_KEY="pk_test_..."
    FRONTEND_URL="http://localhost:5173"

### 4. Generar el cliente de Prisma

    npx prisma generate

### 5. Arrancar el servidor

    npm start

El servidor arranca por defecto en http://localhost:3000. La documentación Swagger estará disponible en http://localhost:3000/api-docs.

### 6. Ejecutar los tests

    npm test

## Endpoints principales

### Auth
- POST /api/auth/register — Registrar un nuevo usuario
- POST /api/auth/login — Iniciar sesión (crea cookie httpOnly con el token)
- POST /api/auth/logout — Cerrar sesión (elimina la cookie)
- GET /api/auth/me — Obtener el usuario autenticado actual

### Products
- GET /api/products — Listar todos los productos
- GET /api/products/:id — Obtener un producto por ID
- POST /api/products — Crear un producto (Admin, con imagen)
- PUT /api/products/:id — Actualizar un producto (Admin)
- DELETE /api/products/:id — Eliminar un producto (Admin)

### Reviews
- GET /api/reviews/:productId — Obtener reseñas de un producto
- POST /api/reviews/:productId — Crear una reseña
- DELETE /api/reviews/:id — Eliminar una reseña propia

### Wishlist
- GET /api/wishlist — Obtener la wishlist del usuario
- POST /api/wishlist/:productId — Añadir un producto
- DELETE /api/wishlist/:productId — Eliminar un producto

### Cart
- GET /api/cart — Ver el carrito actual
- POST /api/cart — Añadir un producto al carrito
- DELETE /api/cart/:productId — Eliminar un producto del carrito

### Checkout
- POST /api/checkout — Generar un pedido a partir del carrito (sin pago)
- GET /api/checkout/orders — Historial de pedidos del usuario
- POST /api/checkout/session — Crear una sesión de pago con Stripe

Documentación interactiva completa disponible en /api-docs vía Swagger.

## Autenticación

La API usa JWT almacenado en una cookie httpOnly, no en el header Authorization. Tras el login, el navegador envía la cookie automáticamente en cada petición gracias a withCredentials en el cliente y CORS configurado con credentials true en el servidor.

## Pagos con Stripe

El endpoint POST /api/checkout/session crea una sesión de Stripe Checkout a partir del carrito del usuario autenticado y devuelve una URL a la que el frontend redirige para completar el pago en modo test. Tras el pago, Stripe redirige de vuelta al frontend según FRONTEND_URL.

## Autora

Yeny Ruiz — Proyecto desarrollado en el bootcamp Full Stack Developer de The Bridge.