# Use official Python image
FROM python:3.11

# Set working directory
WORKDIR /app

# Copy Pipenv files and install dependencies
COPY Pipfile Pipfile.lock ./
RUN pip install pipenv && pipenv install --system

# Copy the rest of the app
COPY . .

# Expose Flask port
EXPOSE 5000

# Run Flask app
ENTRYPOINT ["sh", "./entrypoint.sh"]
