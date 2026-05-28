## cmd to run the project
```bash
# install dependencies
npm install

# to start the frontend project 
 cd into frontend folder and run
 yarn dev 
 it will run in http://localhost:5173
 
# Before startig the backend project, make sure you have a local postgres database running
 run docker-compose up -d  to start the database

# to build a backend project
   ./gradlew backend:build 
 
# to run a whole project
 ./gradlew backend:bootRunDev
 it will run in http://localhost:8082

```

cmd execute into docker container
```bash
# to execute into docker container
docker exec -it srmart-postgres psql -U admin -d srmartdb
# to check the tables in the database
\d
# to check the data in the user table
SELECT * FROM users;
# to check the data in the roles table
SELECT * FROM roles;
```