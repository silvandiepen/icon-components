#!/bin/bash


echo "> 01: Prepend Line"

node dist/cli.js \
    --src test/assets/icons/ \
    --dest temp/prependLine/icons/ \
    --prefix icon \
    --template test/template/external-template.js \
    --prependLine //test

exit 0