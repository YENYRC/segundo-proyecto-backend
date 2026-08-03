# Segundo Proyecto Backend - The Bridge (Project Break 2)

API REST completa con autenticación, gestión de productos, reseñas, wishlist, carrito y checkout. Desarrollada como proyecto final del módulo de Backend del bootcamp Full Stack Developer de The Bridge.

## 🚀 Demo en producción

- **API:** https://segundo-proyecto-backend.onrender.com
- **Documentación Swagger:** https://segundo-proyecto-backend.onrender.com/api-docs

## 🛠️ Stack tecnológico

- **Runtime:** Node.js + Express (ES Modules)
- **Base de datos relacional:** PostgreSQL (Supabase) vía Prisma ORM con `@prisma/adapter-pg`
- **Base de datos NoSQL:** MongoDB (Atlas) vía Mongoose
- **Autenticación:** JWT + bcrypt
- **Subida de imágenes:** Cloudinary + Multer
- **Documentación:** Swagger (OpenAPI 3.0)
- **Testing:** Jest + Supertest

## 📦 Estructura del proyecto

```
src/
├── config/          # Configuración (Cloudinary, Multer, Swagger, DB)
├── controllers/      # Lógica de manejo de peticiones
├── services/         # Lógica de negocio y acceso a datos
├── routes/           # Definición de rutas y documentación Swagger
├── middlewares/       # Auth (verifyToken, requireRole), manejo de errores
├── models/           # Esquemas de Mongoose (Reviews, Wishlist)
└── tests/            # Tests de integración con Supertest
prisma/               # Esquema de Prisma (modelos SQL)
app.js                # Configuración de la app Express
server.js              # Punto de entrada (arranque del servidor)
```

## ⚙️ Instalación y uso en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/YENYRC/segundo-proyecto-backend.git
cd segundo-proyecto-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DATABASE_URL="postgresql://usuario:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://usuario:password@host:5432/postgres"
MONGO_URI="mongodb+srv://usuario:password@cluster.mongodb.net/?appName=Cluster0"
JWT_SECRET="tu_clave_secreta"
CLOUDINARY_CLOUD_NAME="tu_cloud_name"
CLOUDINARY_API_KEY="tu_api_key"
CLOUDINARY_API_SECRET="tu_api_secret"
```

### 4. Generar el cliente de Prisma

```bash
npx prisma generate
```

### 5. Arrancar el servidor

```bash
npm start
```

El servidor arranca por defecto en `http://localhost:3000`. La documentación Swagger estará disponible en `http://localhost:3000/api-docs`.

### 6. Ejecutar los tests

```bash
npm test
```

Corre la suite de tests de integración (Auth, Products, Cart) con Jest + Supertest.

## 📚 Endpoints principales

### Auth
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Registrar un nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión y obtener token JWT | No |

### Products
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/products` | Listar todos los productos | No |
| GET | `/api/products/:id` | Obtener un producto por ID | No |
| POST | `/api/products` | Crear un producto (con imagen) | Admin |
| PUT | `/api/products/:id` | Actualizar un producto | Admin |
| DELETE | `/api/products/:id` | Eliminar un producto | Admin |

### Reviews
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/reviews/:productId` | Obtener reseñas de un producto | No |
| POST | `/api/reviews/:productId` | Crear una reseña | Sí |
| DELETE | `/api/reviews/:id` | Eliminar una reseña propia | Sí |

### Wishlist
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/wishlist` | Obtener la wishlist del usuario | Sí |
| POST | `/api/wishlist/:productId` | Añadir un producto a la wishlist | Sí |
| DELETE | `/api/wishlist/:productId` | Eliminar un producto de la wishlist | Sí |

### Cart
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/cart` | Ver el carrito actual | Sí |
| POST | `/api/cart` | Añadir un producto al carrito | Sí |
| DELETE | `/api/cart/:productId` | Eliminar un producto del carrito | Sí |

### Checkout
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/checkout` | Generar un pedido a partir del carrito actual | Sí |

> La documentación interactiva completa (incluyendo esquemas de request/response) está disponible en `/api-docs` vía Swagger, tanto en local como en producción.

## 🔐 Autenticación

La API usa JWT. Tras el login, incluye el token en las peticiones protegidas con el header:

```
Authorization: Bearer <tu_token>
```

## 👩‍💻 Autora

Yeny Ruiz — Proyecto desarrollado en el bootcamp Full Stack Developer de The Bridge.
