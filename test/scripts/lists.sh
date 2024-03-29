#!/bin/bash


echo "> 01: No list"

node dist/cli.js \
   --src test/assets/icons/ \
    --dest temp/external/icons/ \
    --remove-old
   

# echo "\n> 02: Basic List generation"

# node dist/cli.js \
#     --src test/assets/icons \
#     --dest temp/external/icons \
#     --template test/template/external-template.js \
#     --list \
#     --remove-old 

# echo "\n> 02b: Basic List generation"

# node dist/cli.js \
#     --src test/assets/icons \
#     --dest temp/external/icons \
#     --template test/template/external-template.js \
#     --list true \
#     --remove-old 


# echo "\n> 03: List from template"

# node dist/cli.js \
#     --src test/assets/icons \
#     --dest temp/external/icons \
#     --template test/template/external-template.js \
#     --listTemplate src/templates/list/alt-list.json.template \
#     --remove-old 
    

# echo "> 04: Lists from multi templates"

# node dist/cli.js \
#     --src test/assets/icons \
#     --dest temp/external/icons \
#     --template test/template/external-template.js \
#     --listTemplate src/templates/list \
#     --remove-old 
    

# echo "\n> 05: Basic Index generation"

# node dist/cli.js \
#     --src test/assets/icons \
#     --dest temp/external/icons \
#     --template test/template/external-template.js \
#     --index \
#     --remove-old \
    
# echo "\n> 06: Basic Index generation : explicit true"

# node dist/cli.js \
#     --src test/assets/icons \
#     --dest temp/external/icons \
#     --template test/template/external-template.js \
#     --index true \
#     --remove-old \

# echo "\n> 07: Basic Index generation : explicit true"

# node dist/cli.js \
#     --src test/assets/icons \
#     --dest temp/external/icons \
#     --template test/template/external-template.js \
#     --indexTemplate src/templates/index \
#     --remove-old \
    
exit 0