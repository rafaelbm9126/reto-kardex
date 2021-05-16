# Reto Kardex

## Avances Registrados

De las características solicitadas y por el tiempo invertido, se avanzó por backend:

- Registro de Usuarios
- Login con sesión y verificación.
- CRUD de productos
- creación de factura de venta:
    - registro de datos del cliente
    - detalles de los productos
    - datos propios de la venta

Avance por frontend:

- integración del CRUD productos
- adaptación del framework y librerías

## Tecnologías Implementadas

### Backend:

- NodeJS como framework
- ExpressJS framework http
- Graphql lenguaje de datos
- Mongoose ORM conector de MongoDB
- MongoDB motor de base de datos (no relacional)
- TypeScript capa de tipado y primera línea de documentación del código
- Crypto-JS implementado para proteger datos sensibles en base de datos
- JWT se implemento para firmar un token que nos servira como llave de sesion

### Frontend:

- ReactJS framework frontend
- react-admin librería que facilita la interfaz e integración de un sistema
- TypeScript capa de tipado

### Arquitectura:

Se dispuso la implementación de la arquitectura de puertos y adaptadores para el Backend, reconociendo que por temas de tiempo falta pulir la disposición de los componentes funcionales en el codigo.

Por el lado del frontend quedo pendiente aplicar la disposición del código y manejar la arquitectura del proyecto orientada a componentes visuales y separación de la separación.

### Infraestructura

Se implementó una arquitectura en la infraestructura basada en contenedores usando Docker y Docker-Compose para este fin. Todas tas partes del proyecto están Dockerizadas:

- Backend node:latest (imagen)
- Frontend node:latest (imagen)
- MongoDB mongo:latest (imagen)

Esto facilita la puesta en marcha del proyecto en el ambiente local. También se implementó git como control de versiones y GitHub como repositorio remoto.

## Deuda Tecnica

De lo solicitado el proyecto queda a un 40% de realizado (aproximandamente). A continuación se resumirá algunas mejoras que quedaron pendientes y fueren pensadas aplicar:

- módulo de autenticación completo (login, registro, recuperación de cuneta y roles de usuario)
- integración con módulo de envió de correo multi-propocito (autenticación, ventas, notificaciones)
- integración completa con el frontend y persistencia de sesión en el mismo
- CI/CD y despliegue en un ambiente de pruebas para el testing visual, funcional y pruebas de estrés
- aplicar pruebas unitarias tanto en Backend y Frontend con Jest (librería para este fin) y en el caso del Frontend junto a enzyme para pruebas en los componentes
- revision del UX/UI del frontend para mejorar la experiencia de quien usas el sistema
- aplicar reglas semanticas con eslint, tslint y prettier

## Levantar en el local

- instalar dependencias en el backend

        $ make dependencies_back

- instalar dependencias en el frontend

        $ make dependencies_front

***ya con las dependiencias instaladas***

    $ make up

### Donde vemos nuestro proyecto?

- ***graphql playground***

    http://localhost:8080/playground

- ***frontend***

    http://localhost:3000/
