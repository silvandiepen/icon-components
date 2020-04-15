#!/usr/bin/env bash

node_modules/icon-components/dist/cli.js \
  --src src/assets/icons/svg \
  --dest src/components/icons/icons \
  --prefix icon \
  --template=scripts/templates/icon/icon.tsx.template \
  --list=scripts/templates/icons/ --in-root --remove-old


node_modules/icon-components/dist/cli.js \
  --src src/assets/icons/svg \
  --dest src/components/icons/icons \
  --prefix icon \
  --template=scripts/templates/icon/icon.tsx.template \
  --list=scripts/templates/icons/ --in-root --remove-old