#!/bin/bash


echo "> 01: Icons with external template"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --template test/external-template.js \
    --remove-old \
    --optimize


echo "> 01B: Icons with External Templates"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --template src/templates/stencil \
    --remove-old \
    --optimize


echo "> 02: Icons with internal template"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --type react \
    --remove-old \
    --optimize


echo "> 02B: Icons with Multiple Internal Templates"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/external/icons \
    --prefix list-icon \
    --type stencil \
    --remove-old \
    --optimize