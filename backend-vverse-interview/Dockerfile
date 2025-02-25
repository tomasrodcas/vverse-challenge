# Use official Python image
FROM python:3.11

# Set working directory
WORKDIR /app

# Copy Pipenv files and install dependencies
COPY Pipfile Pipfile.lock ./
RUN pip install pipenv && pipenv install --system

COPY . .
COPY entrypoint.sh /app/entrypoint.sh

# Give execution permission
RUN chmod +x /app/entrypoint.sh


# Expose Flask port
EXPOSE 5000

# Run Flask app
ENTRYPOINT ["sh", "entrypoint.sh"]
