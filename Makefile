.DEFAULT_GOAL := help

include .env.local
export  $(shell sed 's/=.*//' .env.local)

ependencies_back:
	docker run -it --rm  -v ${PWD}/src:/app -w /app node:latest npm i

ependencies_front:
	docker run -it --rm  -v ${PWD}/web:/app -w /app node:latest npm i

build:
	docker-compose build --force-rm --no-cache

up:
	docker-compose up --no-build

restart:
	docker-compose restart

stop:
	docker-compose stop

logs:
	docker-compose logs --tail="all" --follow

delete_logs:
	truncate -s 0 $(docker inspect --format='{{.LogPath}}' ${PROJECT_NAME})

bash:
	docker run -it --rm --name ${PROJECT_NAME} -v ${PWD}/src:/app -w /app -p ${PORT}:${PORT} node:latest bash

bash-front:
	docker run -it --rm --name ${PROJECT_NAME} -v ${PWD}/web:/app -w /app node:latest bash

help:
	@printf "\033[31m%-22s %-59s %s\033[0m\n" "Target" " Help"; \
	printf "\033[31m%-22s %-59s %s\033[0m\n"  "------" " ----"; \
	grep -hE '^\S+:.*## .*$$' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-22s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'

