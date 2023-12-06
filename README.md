# ![sappio_title](https://user-images.githubusercontent.com/13961685/198166716-c03d22bd-220e-42d4-a036-95fa9e21407f.png)

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)
[![codecov](https://codecov.io/gh/trouchet/sappio/branch/main/graph/badge.svg?token=9UP6CDA1WC)](https://codecov.io/gh/trouchet/sappio)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d95460fdcdba4269b71053f4435a657b)](https://www.codacy.com/gh/trouchet/sappio/dashboard?utm_source=github.com&utm_medium=referral&utm_content=trouchet/sappio&utm_campaign=Badge_Grade)

A sappio looking somewhere over rainbow. It means, a simple logging NodeJS template app.

You may access the [wiki](https://github.com/web-needle/sappio/wiki/How-to-sappio) to learn about it.

# How to operate

Run the commands below on `sappio` root path:


## Install

  - What: Install the required packages:

  ```
  make install
  ```

## Prepare

  - What: updates dependencies to latest and commit-push changes:

  ```
  make update
  ```

## Clean

  - What: remove all unnecessary assets:

  ```
  make update
  ```

## List

  - What: Lists packages used on pattern `package_name:num_occurrences:is_used`:

  ```
  make list
  ```

## Lint

  - What: Performs inplace lint fixes:

   ```
   make lint
   ```

## Test

  - What: run the test batch

  ```
  make test
  ```

## Test watch

  - What: watch the test batch

  ```
  make watch
  ```

## Run

  - What: run the application:

  ```
  make start
  ```

## Deploy

  - What: Runs docker up:

  ```
  make deploy
  ```
