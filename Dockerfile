# Use PHP 8.2 with Apache
FROM php:8.2-apache

WORKDIR /var/www/html

# Install system dependencies and PHP extensions required by Laravel
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    curl \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring xml zip \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install Composer globally
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Copy all project files
COPY . .

# Install PHP dependencies (production only)
RUN composer install --no-dev --optimize-autoloader

# Set permissions for Laravel storage and cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Generate app key
RUN php artisan key:generate

# Run migrations automatically
RUN php artisan migrate --force
RUN php artisan storage:link

# Expose Apache port
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
