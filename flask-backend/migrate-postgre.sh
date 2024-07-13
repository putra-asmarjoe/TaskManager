#!/bin/sh

rm -rf /app/migrations
rm -rf /app/site.db 

until pg_isready -h db -U postgres; do
  echo "Waiting PostgreSQL ready..."
  sleep 7
done

flask db init
flask db migrate -m "Initial migration."
flask db upgrade

touch /app/migrationdone.txt

exec gunicorn --bind 0.0.0.0:5000 app:app