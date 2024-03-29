#!/bin/bash


echo "> 01: The default without removes"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/remove/icons \
    --prefix list-icon \
    --template test/template/external-template.js \
    --remove-old \
    --optimize


echo "> 02: Remove a string from strings"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/remove/icons \
    --prefix list-icon \
    --template test/template/external-template.js \
    --remove-old \
    --removeString '-pie' \
    --removePrefix alert- \
    --removeAffix '-left' \
    --optimize

