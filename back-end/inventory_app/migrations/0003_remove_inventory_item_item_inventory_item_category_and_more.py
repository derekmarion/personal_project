# Generated by Django 5.0 on 2023-12-05 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_app', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inventory_item',
            name='item',
        ),
        migrations.AddField(
            model_name='inventory_item',
            name='category',
            field=models.CharField(default='category'),
        ),
        migrations.AddField(
            model_name='inventory_item',
            name='name',
            field=models.CharField(default='name'),
        ),
        migrations.AddField(
            model_name='inventory_item',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AddField(
            model_name='inventory_item',
            name='proof_of_purchase',
            field=models.CharField(default='path'),
        ),
        migrations.AddField(
            model_name='inventory_item',
            name='serial_num',
            field=models.CharField(default='#'),
        ),
    ]