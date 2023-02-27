# Clean up

In some cases you don't want certain tags or attributes in your output. In that case you can use the `--removeAttrs` and `--removeTags` to remove certain tags.

The output won't be done on the data output. But on the data_clean and data_stripped. See [Available options](#available-options).

**example**
In this case, all svg's will be stripped from their g (group) and style elements and all elements will be stripped from id, fill and style.

```bash
#!/bin/bash

node node_modules/icon-components/dist/cli.js \
    --src assets/icons \
    --dest src/components/icons \
    --template templates/ \
    --removeAttr id, fill, style \
    --removeTags g, style
```
