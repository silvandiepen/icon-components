#!/bin/bash


echo "> 01: Stencil =yeahh"


node dist/cli.js \
    --src test/assets/icons \
    --dest temp/stencil \
    --prefix react_material \
    --type stencil \
    --remove-old --optimize \
    --svg true
