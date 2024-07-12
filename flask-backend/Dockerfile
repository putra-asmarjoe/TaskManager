# Use Python base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt .

RUN python3 -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire source code into the container
COPY . .

RUN rm -rf /app/migrations
RUN rm -rf /app/site.db
 
# Set environment variable
ENV FLASK_APP=app.py
ENV SECRET_KEY=Qyu5y3W2jI6aJO2FIb2D92r5QBXZMsM1xeIeVJo8GA8qJOg7KTjWJurAtph7nUVY
ENV JWT_SECRET_KEY=R5fDijg6iXz2eiaMn4AY4XuNoHxXrJy2XI2B9APZ4m5u0v42p41QTJY39fzIxLZf
ENV JWT_ACCESS_TOKEN_EXPIRES=3600

# Initialize the database (creates migration folder)
RUN flask db init
# # Run migrations
RUN flask db migrate -m "Initial migration." 
# RUN ls /app/
# RUN ls /
RUN flask db upgrade


# Expose the port used by the application
EXPOSE 5000

# Command to run the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
