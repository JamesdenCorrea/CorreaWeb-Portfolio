#!/bin/bash
set -e

# Run migrations at container startup
# This ensures Postgres env vars are used and avoids SQLite fallback
php artisan migrate --force

# Create storage symbolic link
php artisan storage:link

# Start Apache in foreground
apache2-foreground
