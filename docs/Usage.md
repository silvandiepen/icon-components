---
icon: 📘
---

# Usage

### In your package.json

Add a command (script) to your package.json to create the components like;

_package.json_

```json
scripts: {
    ...
    "build:icons": "icon-components --src assets/icons --dest src/components/icons --template react",
    ...
}
```

### As a separate bash script

_package.json_

```json
scripts: {
    ...
    "build:icons": "sh scripts/icon-components",
    ...
}
```

_scripts/icon-components_

```bash
#!/bin/bash

node node_modules/icon-components/dist/cli.js \
    --src assets/icons \
    --dest src/components/icons \
    --type react"
```

### Using your own template file

**Single file**

```bash
#!/bin/bash

node node_modules/icon-components/dist/cli.js \
    --src assets/icons \
    --dest src/components/icons \
    --template templates/templateFile.tsx.template
```

**Multiple files / folder**

```bash
#!/bin/bash

node node_modules/icon-components/dist/cli.js \
    --src assets/icons \
    --dest src/components/icons \
    --template templates/
```
