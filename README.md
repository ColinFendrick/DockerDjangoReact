# Docker-Django-Tensorflow-React

First, run create a conda environment. You may make one locally or globally. Once in the environment, `pip install -r ./backend/requirements.txt` to install the latest of all required packages.

## Run locally

To run locally, you will need a postgres db active. Then in `frontend/react_app` use `npm run start`.
In `backend/django_app` run `python manage.py runserver`. You may need to `python manage.py migrate` first.
__You must be in the local env shell.__ To enable this, use `source localPythonEnv/bin/active`.

-------  

## Run Docker

Far easier is just to have Docker running on your machine. Then `docker-compose up` from the root of the project. Boom!

![BOOM](https://media.giphy.com/media/3oz8xsRKgCWlzkqT7y/giphy.gif)
