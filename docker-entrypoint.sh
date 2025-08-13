#!/bin/bash
set -e

# Run migrations at container startup
php artisan migrate --force
php artisan storage:link

# Start Apache in foreground
apache2-foreground
