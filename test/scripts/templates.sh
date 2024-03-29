#!/bin/bash


echo "> 01: Icons with external template"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --template test/template/external-template.js \
    --remove-old \
    --optimize


echo "> 01B: Icons with External Templates"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --remove-old \
    --optimize


echo "> 02: Icons with internal template"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --remove-old \
    --optimize


echo "> 02B: Icons with Multiple Internal Templates"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --remove-old \
    --optimize