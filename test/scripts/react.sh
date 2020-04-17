#!/bin/bash


echo "> 01: React"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/react \
    --prefix react \
    --type react \
    --remove-old --optimize

echo "> 02: React Material"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/react \
    --prefix react_material \
    --type react-material \
    --remove-old --optimize
