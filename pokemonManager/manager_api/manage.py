# coding: UTF-8
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    # ディレクトリを分けたので階層を一つ深くする
    # runserverの際に --settings を指定しない場合はローカル環境として起動される
    # os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'manager_api.settings.base')
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'manager_api.settings.local')
    try:
        from django.core.management import execute_from_command_line
    except ImportError:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        )
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
