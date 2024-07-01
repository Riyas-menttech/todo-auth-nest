#!/bin/bash

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

if [ -z "$host" ] || [ -z "$port" ]; then
    echo "Error: you need to provide a host and port to test."
    echo "Usage:"
    echo "    $0 host port [-- command args]"
    echo "    -- COMMAND ARGS             Execute command with args after the test finishes"
    exit 1
fi

timeout=15

echo "Waiting for $host:$port..."

wait_for() {
    timeout $timeout sh -c "until nc -z -w5 $host $port; do sleep 1; done"
}

if wait_for; then
    echo "$host:$port is available."
    if [ -n "$cmd" ]; then
        sh -c "$cmd"
    fi
else
    echo "Failed to wait for $host:$port"
    exit 1
fi
