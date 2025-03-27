from celery import shared_task
import subprocess

@shared_task
def refresh_pet_data():
    """Runs 'python3 manage.py refresh' to update pet data."""
    result = subprocess.run(["python3", "manage.py", "refresh"], capture_output=True, text=True)
    return result.stdout
