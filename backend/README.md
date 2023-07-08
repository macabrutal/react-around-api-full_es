# Around the U.S. Back End

Proyecto 14: 

## Descripción general

- Este proyecto es la creación de mi propio servidor para el proyecto "Alrededor de los EE. UU."
- Trabajé en una API RESTful para el proyecto "Alrededor de los EE. UU." y lo conecté a una base de datos.
- Está construido en Node.js y utilicé Express.
- El objetivo es crear un servidor con una API y autenticación del usuario


## Funcionalidad

- Se creó un servidor con una API
- Puedes obtener un usuario por medio de su id
- Puedes obtener todos los usuarios 
- Puedes publicar un avatar del usuario
- Puedes actualizar el perfil del usuario
- Puedes actualizar el avatar del usuario
- Puedes obtener todas las cards 
- Puedes dar like a una card
- Puedes eliminar el like a una card
- Puedes eliminar una card
- Desplega el backend en una máquina remota.
- Se agregó una excepción para \_id


## Tecnologias Utilizadas

- Node.js
- Express.js
- Linter: para encontrar errores
- nodemon: La aplicación debe iniciarse con hot reload cuando se ejecuta el comando npm run dev
- MMongoDB
- Mongoose

## Directorios

`/controllers` — Carpeta de controladores para users y cards

`/routes` — Carpeta de rutas para users y cards

`/models` — Carpeta de esquemas para user y card


All other directories are optional and may be created by the developer if necessary.

## Rutas

- GET localhost:3000/users — responde con JSON desde el archivo users.json
- GET localhost:3000/card — responde con JSON desde el archivo cards.json
- GET localhost:3000/users/8340d0ec33270a25f2413b69 — responde con un JSON que tiene datos del usuario con un id que coincide con el identificador que se pasó después de /users

## Ejecuta el Proyecto

`npm run start` — inicia el servidor en localhost:3000

`npm run dev` — inicia el servidor en localhost:3000 con el hot reload habilitado.

- Cuando la aplicación se inicia, se conecta al servidor MongoDB en: mongodb://localhost:27017/aroundb


## LINT: Para encontrar posibles Errores en el código 

`npx eslint . --fix` 
