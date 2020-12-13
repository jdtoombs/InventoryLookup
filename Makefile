#!/usr/bin/make
SHELL := /usr/bin/env bash

up: ## Runs the local containers (n=service name)
	@echo "$(P) Running client and server..."
	@docker-compose up -d $(n)

down: ## Stops the local containers and removes them
	@echo "$(P) Stopping client and server..."
	@docker-compose down

stop: ## Stops the local containers (n=service name)
	@echo "$(P) Stopping client and server..."
	@docker-compose stop $(n)

build: ## Builds the local containers (n=service name)
	@echo "$(P) Building images..."
	@docker-compose build --no-cache $(n)