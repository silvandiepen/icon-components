#!/bin/bash


echo "> 01: Remove Attributes and tags"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/remove-tags/icons \
    --prefix list-icon \
    --template test/template/external-template.js \
    --removeTags svg \
    --remove-old \
    --optimize