#!/usr/bin/env bats

load "../../node_modules/bats-support/load"
load "../../node_modules/bats-assert/load"

@test "It Works" {
    # Given scenario with such conditions,
    # we prepare "the world" for your test

    # we build the process by code run
    result="$(echo 2+2 | bc)"

    # Then the expectet result
    # makes assertions to ensure that
    # the code does what it should
    assert_equal "$result" 4
}
