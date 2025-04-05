#!/usr/bin/env bash
# Exit on error
set -o errexit

# Instead of using /data/media, use a directory inside your project
echo "Setting up media directory..."
mkdir -p media

# Skip the copying step since we'll use this directory directly
# and your product images are already in this directory

# Set permissions on the media directory
echo "Setting media directory permissions..."
chmod -R 755 media

# Install dependencies
pip install -r requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py migrate