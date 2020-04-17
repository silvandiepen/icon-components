#!/bin/bash


echo "> 01: No list"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --template test/template/external-template.js \
    --remove-old \
    --optimize


echo "\n> 02: Basic List generation"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --template test/template/external-template.js \
    --list \
    --remove-old \
    --optimize

echo "\n> 02b: Basic List generation"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --template test/template/external-template.js \
    --list true \
    --remove-old \
    --optimize


echo "\n> 03: List from template"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --template test/template/external-template.js \
    --listTemplate src/templates/list/list.json.template \
    --remove-old \
    --optimize


echo "> 04: Lists from multi templates"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --template test/template/external-template.js \
    --listTemplate src/templates/list \
    --remove-old \
    --optimize