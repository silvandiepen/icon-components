#!/bin/bash


echo "> 01: Copy"

node dist/cli.js \
    --src test/assets/icons/ \
    --dest temp/copy/icons/ \
    --prefix icon \
    --template test/template/external-template.js \
    --copy test/scripts/copy.sh=copy.sh

exit 0