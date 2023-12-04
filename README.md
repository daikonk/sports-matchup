# sports-matchup
This website will allow users to connect with others in their area over their love for sports.


## Running frontend
Navigate to frontend directory and run
```
npm start
```

## Running Backend + Database Info
For accessing the database, open the 

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

To prepare the table rows and categories, run the following in the backend directory to start the backend:
```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

To list all data in a table, perform the following in the psql shell:
```
SELECT * FROM public."SportEvent_sportevent";
```

To delete all data from the a desired table in the datatable, perform the following in the psql shell:
```
DELETE FROM public."SportEvent_sportevent";
```
**NOTE:** Replace "SportEvent_sportevent" with the specific table name