#!/usr/bin/env bash
# Exit on error
set -o errexit

# Make media directory if it doesn't exist
mkdir -p /data/media

# More verbose copy to help with debugging
echo "Copying media files to persistent storage..."
cp -rv media/* /data/media/ 2>/dev/null || echo "No media files to copy or directory doesn't exist"

# Set permissions
chmod -R 755 /data/media

# List files to verify (helps with debugging)
echo "Files in persistent storage:"
ls -la /data/media/

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py migrate