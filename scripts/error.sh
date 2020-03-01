    
echo "> 01: Test don't create icons because of lacking template"
node cli.js \
    --src test/assets/icons/ \
    --dest temp/stencil/icons/ \
    --prefix icon \
    --remove-old --optimize
    
echo "> 02: Test don't create icons because of lacking src"
node cli.js \
    --dest temp/stencil/icons/ \
    --template react \
    --prefix testprefix \
    --remove-old --optimize

echo "> 03: Test don't create icons because of lacking dest"
node cli.js \
    --src test/assets/icons/ \
    --template react \
    --prefix testprefix \
    --remove-old --optimize

echo "> 03: Test don't create icons because of lacking everything"
node cli.js 

echo "> 03: Test don't create icons because of lacking dest and source"
node cli.js \
    --template react \
    --prefix testprefix \
    --remove-old --optimize

echo "> 04: Test don't create icons because of empty src"
node cli.js \
    --src test/assets/emptyfolder/ \
    --dest temp/stencil/icons/ \
    --template react \
    --prefix testprefix \
    --remove-old --optimize