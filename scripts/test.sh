# #!/usr/bin/env bash

# echo "> 01: Test creating icons from Stencil template"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/stencil/icons/ \
#     --prefix icon \
#     --template stencil \
#     --remove-old --optimize
    
# echo "> 02: Test don't create icons because of lacking template"
# node cli.js \
#     --prefix icon \
#     --remove-old --optimize
#     --template react \
#     --remove-old --optimize

# echo "> 03: Test creating icons from React template"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/react/icons/ \
#     --prefix icon \
#     --template vue \
#     --remove-old --optimize

# echo "> 04: Test creating icons from Vue template"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/vue/icons/ \
#     --prefix icon \
#     --template vue
    
# echo "> 05: Test creating icons from React Material template"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/react_material/icons/ \
#     --prefix icon \
#     --template react-material \
#     --remove-old --optimize

# echo "> 06: Test creating icons with an external template file"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/external/icons/ \
#     --prefix icon \
#     --template test/external-template.js.template \
#     --remove-old --optimize

# echo "> 07: Test creating icons with an external template folder with files"
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/external_template/icons/ \
#     --prefix icon \
#     --template templates \
#     --remove-old --optimize


echo "> 08: Test creating icons with a list"
node cli.js \
    --src test/assets/icons/ \
    --dest temp/list/icons/ \
    --prefix icon \
    --template test/external-template.js.template \
    --list \
    --remove-old --optimize --log

echo "> 09: Test creating icons with a list from a template"
node cli.js \
    --src test/assets/icons/ \
    --dest temp/list_template/icons/ \
    --prefix icon \
    --template test/external-template.js.template \
    --list templates/list.json.template \
    --remove-old --optimize --log

echo "> 09: Test creating icons with a list from a folder with templates"
node cli.js \
    --src test/assets/icons/ \
    --dest temp/list_template/icons/ \
    --prefix icon \
    --template test/external-template.js.template \
    --list templates/ \
    --remove-old --optimize --log

# echo  ""
# echo "> 10: Test creating icons from multiple folders"
# echo  ""
# node cli.js \
#     --src test/assets/ \
#     --dest temp/list_template/icons/ \
#     --prefix icon \
#     --template test/external-template.js.template \
#     --list templates/list.json.template \
#     --deep --remove-old --optimize


# echo  ""
# echo "> 11: Test creating icons from single folder"
# echo  ""
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/list_template/icons/ \
#     --prefix icon \
#     --template test/external-template.js.template \
#     --list=templates/ \
#     --remove-old --optimize


# echo  ""
# echo "> 12: Test creating with multiple external templates"
# echo  ""
# node cli.js \
#     --src test/assets/icons/ \
#     --dest temp/list_template/icons/ \
#     --prefix icon \
#     --template=templates/ \
#     --list=templates/ \
#     --remove-old --optimize
