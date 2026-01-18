nest g module mail
nest g service mail --no-spec
nest g controller mail --no-spec

bpos soop zhmf injo


# Proyecto Integrador - Backend
## Descripción
Sistema de gestión de tickets de soporte técnico desarrollado con 
NestJS** y TypeORM
Permite la gestión de usuarios, tickets, categorías, comentarios y asignaciones de técnicos, con autenticación basada en JWT y manejo completo de errores.
-----------------------------------------------------------------------------------
Tecnologías
 Node.js >= 18  
 NestJS  
 TypeORM  
 PostgreSQL  
 `nestjs-typeorm-paginate` para paginación  
 `class-validator` y `class-transformer` para validación de DTOs  
 dotenv para configuración de variables de entorno  

Requisitos previos
- Node.js >= 18  
- npm o yarn  
- PostgreSQL  

**Instalación**
Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd proyecto_integrador


1_Instalar dependencia
npm install

2_Configurar variables de entorno
Crear un archivo .env en la raíz del proyecto con las siguientes variables:

3_Inicializar la base de datos

Asegúrate de crear la base de datos en PostgreSQL y que coincida con DATABASE_NAME.
Si hay migraciones de TypeORM, ejecutarlas:

4_npm run typeorm migration:run

1_Ejecución del backend
Modo desarrollo

2_npm run start:dev
El servidor iniciará en http://localhost:3000 con hot-reload.

Modo producción
npm run build
npm run start:prod

Endpoints principales

/auth → Autenticación y login

/users → Gestión de usuarios

/categories → Gestión de categorías

/tickets → Gestión de tickets

/comments → Comentarios en tickets

/asignacionTicket → Asignación de técnicos

/logsTicket → Historial de tickets

Si se incluyen pruebas unitarias:

**npm run test**

1_Cómo funciona la API

La API está hecha con NestJS y sigue el patrón REST, lo que significa que cada recurso (usuarios, tickets, comentarios, etc.) tiene rutas para crear, leer, actualizar y eliminar (CRUD).

La autenticación se maneja con JWT (JSON Web Token):
El usuario envía su correo y contraseña a /auth/login.
El servidor valida y responde con un token JWT.
Ese token se envía en el header Authorization de las demás solicitudes para acceder a rutas protegidas

--------------------------------------------------------------------------------------
Resumen de nuestro tickets soporte tecnico:
Para instalar y ejecutar el backend, primero debes asegurarte de tener instalados Node.js y npm, así como la base de datos que vayas a usar (por ejemplo PostgreSQL). Luego, clona o descarga el proyecto y entra en la carpeta del mismo. Una vez allí, instala todas las dependencias con npm install o yarn install. Después, crea un archivo .env a partir de .env.example y configura tus variables de entorno, como los datos de conexión a la base de datos y la clave secreta para JWT. Si usas TypeORM con migraciones, ejecuta las migraciones con npm run typeorm:migration:run para crear las tablas en la base de datos. Finalmente, puedes ejecutar el backend en modo desarrollo con npm run start:dev para que se levante en http://localhost:3000 y tenga hot reload, o en modo producción usando npm run build seguido de npm run start:prod. Una vez levantado, la API estará lista para recibir solicitudes desde Postman, Thunder Client o cualquier cliente HTTP, utilizando tu token JWT para acceder a las rutas protegidas.