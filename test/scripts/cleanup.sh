#!/bin/bash


echo "> 01: Remove Attributes and tags"

node dist/cli.js \
    --src test/assets/icons \
    --dest temp/remove-tags/icons \
    --prefix list-icon \
    --removeTags g \
    --removeTags svg \
    --removeAttrs fill, id \
    --remove-old \
    --optimize