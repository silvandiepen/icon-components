#!/bin/bash


echo "> 01: Stencil"


node dist/cli.js \
    --src test/assets/icons \
    --dest temp/react \
    --prefix react_material \
    --type stencil \
    --remove-old --optimize
