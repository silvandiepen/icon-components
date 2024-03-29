#!/bin/bash


echo "> 01: External"

node dist/cli.js \
    --src test/assets/icons/ \
    --dest temp/external/icons/ \
    --prefix icon \
    --template test/template/external-template.js \
    --remove-old \
    --optimize

exit 0