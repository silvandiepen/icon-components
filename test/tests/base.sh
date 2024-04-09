#!/bin/bash

echo "> 01: A base run"

node dist/index.js 
node dist-test/base.test.js


# echo "> 02: A run with alternative destination"

# node dist/index.js \
#     --dest ./temp/dest \


# echo "> 03: A run with alternative destination"

# node dist/index.js \
#     --dest ./temp/foldered \
#     --in-root false \

# echo "> 04: A run with alternative destination"

# node dist/index.js \
#     --dest ./temp/foldered \
#     --in-root false \
#     --componentTemplate src/template/Icon[componentName].js.ejs, src/template/Icon[componentName].css.ejs, src/template/IconIndex.ts.ejs=index.ts \
#     --listTemplate '' \