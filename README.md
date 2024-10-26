<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS - Report Generator

## Ejecutar en Dev
1. Clone el repositorio
2. Instale las dependencias con `npm install`
3. Generar el archivo `.env` con las variables de entorno
4. Levantar la base de datos con `docker-compose up -d`
5. Ejecutar `npx prisma db pull` para sincronizar la base de datos
6. Generar el Prisma client con `npx prisma generate`
7. Ejecutar el proyecto con `npm run start:dev`

### Restaurar la base de datos 
1. Abrir `localhost:8080` en el navegador `pgadmin`
2. Ingresar con las credenciales del archivo `.docker-compose.yml`
3. Crear un nuevo servidor con las credenciales del archivo `.docker-compose.yml`
4. Crear una nueva base de datos con el nombre `postgres`
5. Restaurar la base de datos con el archivo `data/employees.sql`