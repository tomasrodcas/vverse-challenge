#!/bin/sh

echo "Waiting for PostgreSQL to start..."
while ! nc -z db 5432; do
  sleep 1
done
echo "PostgreSQL started!"

echo "Running database migrations..."
alembic upgrade head

echo "Starting Flask app..."
exec flask run --host=0.0.0.0 --port=5000
