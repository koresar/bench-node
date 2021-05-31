#!/usr/bin/env bash

. ~/.nvm/nvm.sh

for node_ver in 0.10 0.12 4 6 8 10 12 14 16
do
  echo using node $node_ver
  nvm use $node_ver --silent && node --expose-gc $1
done
