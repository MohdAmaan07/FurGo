from django.db import migrations, models
import uuid

def populate_new_uuid(apps, schema_editor):
    Cart = apps.get_model('store', 'Cart')
    for cart in Cart.objects.all():
        cart.new_id = uuid.uuid4()
        cart.save(update_fields=['new_id'])

class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_auto_20210903_1318'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='new_id',
            field=models.UUIDField(default=uuid.uuid4, null=True, editable=False, unique=True),
        ),
        migrations.RunPython(populate_new_uuid, reverse_code=migrations.RunPython.noop),
        migrations.AlterField(
            model_name='cart',
            name='new_id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
        migrations.RemoveField(
            model_name='cart',
            name='id',
        ),
        migrations.RenameField(
            model_name='cart',
            old_name='new_id',
            new_name='id',
        ),
        migrations.AlterField(
            model_name='cart',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
    ]