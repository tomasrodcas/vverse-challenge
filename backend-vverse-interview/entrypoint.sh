#!/bin/sh

echo "Running database migrations..."
flask db upgrade

echo "Starting Flask app..."
exec flask run --host=0.0.0.0 --port=5000
