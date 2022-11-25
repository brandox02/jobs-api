## Pacome Api

First of all you need have installed docker & nodejs. Once you have them follow the following steps to run the api:

##### Run the database container process

```bash
docker-compose up
```

##### Install nodejs dependencies

```bash
npm install
```

##### Create and define the .env file:

```bash
JWT_SECRET_TOKEN=your-jwt-secret-token
PORT=9000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=root
DB_DATABASE=pacome
NODE_ENV=DEV

CLOUDINARY_CLOUD_NAME=sffssd
CLOUDINARY_API_KEY=fsdsfd
CLOUDINARY_API_SECRET=asdsdsdf
```

##### Finally launch the api

```bash
npm run start:dev
```
