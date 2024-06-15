
# Repositorio prueba técnica de Konecta Front - Backend


### Librerías Utilizadas Frontend :
- React: Biblioteca principal para construir interfaces de usuario.
- react-router-dom: Librería para el enrutamiento y la navegación en aplicaciones React.
- axios: Cliente HTTP para realizar peticiones a servidores RESTful.
- React Hooks : API introducida en React 16.8 para manejar el estado y los efectos secundarios en componentes funcionales.

### Librerías Utilizadas Backend
- Express: Framework web para Node.js.
- Sequelize: ORM para Node.js.
- PostgreSQL: Sistema de gestión de bases de datos relacional.
- bcrypt: Librería para el hashing de contraseñas.
- jsonwebtoken: Implementación de JWT para autenticación.
- nodemon: Herramienta que reinicia automáticamente el servidor al detectar cambios.

## Estructura 
## Konecta-font
```
konecta-front/
│
├── components/
│ ├── Empleados.js
│ ├── Empleados.css
│ ├── Solicitudes.js
│ ├── Solicitudes.css
│ ├── Login.js
│ ├── Register.js
│ ├── Dashboard.js
│ ├── DashBoard.css
│ ├── ProtectedRoute.js
│ └── App.js
│
├── index.js
├── App.css
└── index.css
```

## Konecta-font
```
konecta-api/
│
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── empleadoController.js
│   └── solicitudController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── Empleado.js
│   ├── Solicitud.js
│   └── Usuario.js
├── routes/
│   ├── auth.js
│   ├── empleado.js
│   └── solicitud.js
├── index.js
└── package.json
```

## Instalación

# Backend
1. Clona el repositorio: `git clone https://github.com/pagutierrezd/empleado-solicitud-app.git`
2. Accede a la Carpeta del Backend  ` cd empleado-solicitud-app/konecta-api`
2. Instala las dependencias: `npm install`
3. Inicia el Servidor Backend  `npm start`
4.  Abre [http://localhost:3000](http://localhost:5000) en tu navegador.


# Frontend

1.  Accede a la Carpeta del Backend  ` cd empleado-solicitud-app/konecta-front `
2. Instala las dependencias: `npm install`
3. Inicia el Servidor Frontend   `npm start`
4.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Requisito 

* Backend: Crear una API REST simple utilizando Node.js.
* Frontend: Desarrollar una interfaz de usuario utilizando React con componentes funcionales y
hooks.
* Base de Datos: Elección libre, preferiblemente Oracle o PostgreSQL.
* Autenticación: Implementar un mecanismo básico de autenticación.
* Pruebas: (Opcional) Incluir algunas pruebas unitarias para el backend.

Relaciones y Consultas:
* Asegurarse de que al consultar solicitudes, se muestre el nombre del empleado y no su ID.
Frontend (Interfaz de Usuario)
* Crear vistas sencillas para las operaciones CRUD mencionadas, enfocándose en funcionalidad
sobre diseño.
* (Seguridad) Implementar medidas básicas para prevenir inyecciones SQL y XSS, como validar
y sanear entradas.
* (Opcional) Evitar librerías externas para el manejo de estado, usando Context API o useState
para ejemplos simples.


## Ejemplos de CURL

Ejemplos de CURL
Registrar un usuario
```sh
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"nombre": "Juan Perez", "email": "juan@example.com", "password": "password123"}'
```
Iniciar sesión
```sh
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "juan@example.com", "password": "password123"}'
```
Obtener empleados
```sh
curl -X GET http://localhost:5000/api/empleados \
-H "Content-Type: application/json" \
-H "x-auth-token: tu_token_aqui"
```
Crear un empleado
```sh
curl -X POST http://localhost:5000/api/empleados \
-H "Content-Type: application/json" \
-H "x-auth-token: tu_token_aqui" \
-d '{"nombre": "Pepito Perez", "email": "pepito@example.com"}'
```
Obtener solicitudes
```sh
curl -X GET http://localhost:5000/api/solicitudes \
-H "Content-Type: application/json" \
-H "x-auth-token: tu_token_aqui"
```
Crear una solicitud
```sh
curl -X POST http://localhost:5000/api/solicitudes \
-H "Content-Type: application/json" \
-H "x-auth-token: tu_token_aqui" \
-d '{"codigo": "SOL001", "descripcion": "Solicitud de vacaciones", "resumen": "Solicitud de 2 semanas de vacaciones", "empleadoId": 1}'
```
Eliminar una solicitud
```sh
curl -X DELETE http://localhost:5000/api/solicitudes/1 \
-H "Content-Type: application/json" \
-H "x-auth-token: tu_token_aqui"```
