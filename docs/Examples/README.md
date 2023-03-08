---
icon: 🚀
---

# Examples

A few examples to kick-start your icon generation.


## A basic version

`package.json`

```json
...
scripts: {
    "build:icons": "npx icon-components --src src/assets/icons --dest src/components/icons --type vue"
}
...
```

## Script in a file

Create a .sh file somewhere in your project:

`build-icons.sh`

```bash
#!/bin/bash

npx icon-components \
    --src src/assets/icons \
    --dest src/components/icons \
    --template src/assets/icons/template/my-template.js.template \
    --remove-old \
    --optimize
```

`package.json`
```json
...
scripts: {
    "build:icons": "sh scripts/build-icon.sh"
}
...
```
