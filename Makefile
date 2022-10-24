.DEFAULT_GOAL := all
MAKEFLAGS += --no-builtin-rules
SHELL         := bash

build-init:
	npm i
	npm run build
	serve -s build

frontend-init:
	npm i
	npm start

integrate:
	pip install pipenv
	pipenv run python ./backend/database_integration/integration.py

api:
	python ./backend/app.py

backend_docker:
	docker build -t backend -f ./backend/dev.Dockerfile ./backend
	docker run -it -v `pwd`:/usr/backend -w /usr/backend -p 5000:5000 backend

unittest:
	python3 ./backend/tests.py
