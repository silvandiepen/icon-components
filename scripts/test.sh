#!/usr/bin/env bash

# echo "> Test creating icons from Stencil template"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/stencil/icons/ \
#     --prefix icon \
#     --template stencil \
#     --remove-old --optimize

# echo "> Test creating icons from React template"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/react/icons/ \
#     --prefix icon \
#     --template react \
#     --remove-old --optimize

# echo "> Test creating icons from Vue template"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/vue/icons/ \
#     --prefix icon \
#     --template vue \
#     --remove-old --optimize

# echo "> Test creating icons from React Material template"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/react_material/icons/ \
#     --prefix icon \
#     --template react-material \
#     --remove-old --optimize

# echo "> Test creating icons with an external template file"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/external/icons/ \
#     --prefix icon \
#     --template test/external-template.js.template
#     --remove-old --optimize

# echo "> Test creating icons with an external template folder with files"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/external_template/icons/ \
#     --prefix icon \
#     --template templates \
#     --remove-old --optimize


# echo "> Test creating icons with a list"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/list/icons/ \
#     --prefix icon \
#     --template test/external-template.js.template \
#     --list \
#     --remove-old --optimize

# echo "> Test creating icons with a list from a template"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/list_template/icons/ \
#     --prefix icon \
#     --template test/external-template.js.template \
#     --list=templates/list.json.template \
#     --remove-old --optimize

echo "> Test creating icons from multiple folders"
node cli.js \
    --src test/assets/ \
    --dest temp/list_template/icons/ \
    --prefix icon \
    --template test/external-template.js.template \
    --list=templates/list.json.template \
    --deep --remove-old --optimize
