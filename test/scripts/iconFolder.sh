#!/bin/bash


echo "> 01: Icon Folder"

node dist/cli.js \
    --src test/assets/icons/ \
    --dest temp/icon-folder/ \
    --template test/template/external-template.js \
    --iconFolder icon

echo "> 01: Icon Folder + in Root"

node dist/cli.js \
    --src test/assets/icons/ \
    --dest temp/icon-folder-in-root/ \
    --template test/template/external-template.js \
    --index true \
    --iconFolder icon \
    --inRoot true

exit 0