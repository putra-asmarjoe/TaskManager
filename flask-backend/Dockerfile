# Use Python base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire source code into the container
COPY . .
# Initialize the database (creates migration folder)
RUN flask db init

# Generate the initial migration script
RUN flask db migrate -m "Initial migration."

# Apply the migration to the database
RUN flask db upgrade

# Set environment variable
ENV FLASK_APP=app.py

# Expose the port used by the application
EXPOSE 5000

# Command to run the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
