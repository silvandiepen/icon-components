#!/bin/bash
  
echo "> 01: With a filter"

node dist/index.js \
    --filter '-up' \    


echo "> 01: With multiple filters"

node dist/index.js \
    --filter '-up' \