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

PACKAGE_VERSION := poetry version -s

PACKAGE_NAME = "sappio"

help:
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

clean: clean-test clean-dist ## remove all test coverage

clean-test: ## remove test and coverage artifacts
	rm -fr coverage/

clean-dist: ## remove dist artifacts
	rm -fr dist/

build: clean-dist ## remove all test coverage
	npm run build

test: clean-test ## run tests with jest
	npm run test:run

test-watch: clean-test  ## run tests on watchdog mode
	npm run test:watch

lint: clean ## perform inplace lint fixes
	npm run format 

install: clean ## install the packages
	npm install

