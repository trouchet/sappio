.PHONY: help clean test coverage install
.DEFAULT_GOAL := help

define PRINT_HELP_PYSCRIPT
import re, sys

regex_pattern = r'^([a-zA-Z_-]+):.*?## (.*)$$'

for line in sys.stdin:
	match = re.match(regex_pattern, line)
	if match:
		target, help = match.groups()
		print("%-20s %s" % (target, help))
endef

export PRINT_HELP_PYSCRIPT

PACKAGE_NAME = "sappio"

help:
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

clean: clean-test clean-dist ## remove all test coverage

clean-test: ## remove test and coverage artifacts
	rm -fr coverage/

clean-dist: ## remove dist artifacts
	rm -fr dist/

init: clean ## Initializes the environment with hooks install build and audit fix 
	npm run init

start: clean ## Starts an application with nodemon
	npm start

update: clean ## Updates dependencies to latest and commit-push changes
	npm run update

list: clean ## Lists packages used on pattern `package_name:num_occurrences:is_used` 
	npm run list

test: clean-test ## Runs tests with jest
	npm run test

test-watch: clean-test ## Runs tests on watchdog mode
	npm run test:watch

lint: clean ## Performs inplace lint fixes
	npm run format

install: clean ## Install the packages
	npm install
