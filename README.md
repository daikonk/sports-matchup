# sports-matchup
This website will allow users to connect with others in their area over their love for sports.


## Running frontend
Navigate to frontend directory and run
```
npm install --save react-scripts
npm start
```

## Install Postgresql
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

Follow the prompts during installation, providing password where required (remember this password for psql shell later)

## Running Backend + Database Info
For accessing the database, open the SQL Shell (psql) and enter the correct credentials. Once the shell shows `postgres=#` you can enter the commands below.

Alternatively, you can use the psql command in the terminal, but you need to configure PATH to do so.
___
To create the mydb database that is used in the backend, perform the following:
```
CREATE DATABASE mydb;
CREATE USER myuser WITH PASSWORD 'password';
ALTER ROLE myuser SET client_encoding TO 'utf8';
ALTER ROLE myuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE myuser SET timezone TO 'UTC';
ALTER USER myuser CREATEDB;
ALTER DATABASE mydb OWNER TO myuser;
\c mydb;
```
___

To prepare the table rows and categories, run the following in the backend directory to start the backend:
```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
Navigate to http://localhost:8000/api/sportevents/ to see the data table being used
___
To list all data in a table, perform the following in the psql shell:
```
SELECT * FROM public."SportEvent_sportevent";
```
___
To delete all data from the a desired table in the datatable, perform the following in the psql shell:
```
DELETE FROM public."SportEvent_sportevent";
```
___

When using this branch with your own database and docker-compose up add the following DB_CREDS.env to the root of the project:
```
DB_NAME=mydb
DB_USER=myuser
DB_PASSWORD=password
HOST_ENDPOINT=localhost
DB_PORT=5432
```
**NOTE:** Replace "SportEvent_sportevent" with the specific table name
