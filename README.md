# vverse-challenge

## How to start the apps


### Docker way

Now in the root folder there is a docker-compose.yml, so using docker compose up -d should raise both the front and the backend sides with a postgres instance, so no other work is needed.

Since the db does not have any data after starting, there is also an init.sql file which only contains an insert into notifications table
to run this there are multiple ways, but the easier would be running this command from the root of the project

 docker exec -i postgres_db psql -U postgres -d notifications < init.sql






### Full Manual Way


The excercise uses React + Vite with pnpm and Python with Flask and Pipenv for the backend.

To run you can use the latest lts versions of Node and Python accordingly

in the frontend side, we need a .env file with the variable

VITE_API_BASE_URL=http://127.0.0.1:5000

and then we can do pnpm i to install dependencies and pnpm dev to run the project





On the other hand, for the flask api we need an env with 

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/example

I used PostgreSQL, so a corresponding Postgres instance is needed

then you can run pipenv install

pipenv shell to go in the environment

flask db upgrade

flask run

This will have both sides running and working. There is an example init.sql file to populate some notifications on the db for testing.