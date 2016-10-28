#!/usr/bin/env bash

. ~/.nvm/nvm.sh

for node_ver in 0.10 0.12 4 5 6 7
do
  nvm use $node_ver --silent && node --expose-gc $1
done
