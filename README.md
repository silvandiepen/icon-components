# Icon Components

A design system can also incorporate a full set of Icons.

To automatically create the source code for icon web components for a full folder of SVG files, this plugin comes in handy. Just add it to your stencil project and generate the icons.

## Install

```bash
npm install icon-components
```

## Usage

#### In your package.json

Add a command (script) to your package.json to create the components like;

_package.json_

```json
scripts: {
    ...
    "build:icons": "icon-components --src assets/icons --dest src/components/icons --template react",
    ...
}
```

#### As a separate bash script

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

## Options

| option            | description                                                                                                                                                                                                | default                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `--src`           | Source folder with SVG files                                                                                                                                                                               | `/src/assets/icons`     |
| `--dest`          | Destination folder for components                                                                                                                                                                          | `/src/components/icons` |
| `--type`          | Choose output type. Options; stencil, react, material                                                                                                                                                      |                         |  | `--template` | Path to a template file or folder to be used as templates |  |
| `--prefix`        | Add a prefix to all files, ex; social-network.svg becomes icon-social-network                                                                                                                              | `false`                 |
| `--remove-old`    | Remove the whole destionation folder as set. In order to be sure to not have any old files and create everything new. Don't set this if your destination folder also includes files which arent generated. | `false`                 |
| `--list`          | In many cases it can come in handy to also create a list of all components. This can be created by setting --list. If set, it will create a default list.                                                  | `false`                 |
| `--listTemplate`  | You can use your own template(s) for lists                                                                                                                                                                 | `null`                  |
| `--index`         | In many cases it can come in handy to also create a list of all components. This can be created by setting --index. If set, it will create a default index..js with exports.                               | `false`                 |
| `--indexTemplate` | You can use your own template(s) for indexes                                                                                                                                                               | `null`                  |
| `--in-root`       | By default there a folders created for every component. In case you want all files just to be in the root dest. You can enable `--in-root`                                                                 | `false`                 |

## Clean up files

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

## Using a custom template

At the moment, one command can have one custom template file. The template file can be created in your own project and be used in the CLI.

In the template you can use EJS template strings. The file which will be written will have the same extension as your template file and be written in the set `--dest`.

#### Available options

| Option           | description                                            |
| ---------------- | ------------------------------------------------------ |
| og_name          | Original name of the file                              |
| name             | Name of the Svg Icon                                   |
| title            | Title of the Svg Icon in PascalCase                    |
| title_lowercase  | A lowercase version of the title                       |
| componentName    | A PascalCase version of the title                      |
| data             | The svg icon file data                                 |
| data_clean.attrs | Data with all (specified) attributes removed.          |
| data_clean.tags  | Data with all (specified) tags removed.                |
| data_clean.both  | Data with all (specified) attributes and tags removed. |

#### Extension .template

You can, if you want. Add `.template` at the end of the file, because it won't be a valid javascript file anyway. The `.template` part will be automatically removed.

For instance; your template file is called. `my-icon-template.js.template` In this case. The files will have `.js` extension.

## Creating lists

In many cases it can come in handy to also create a list of all components. This can be created by setting `--list`. If set, it will create a default list. It can also contain a path to a template, in that case the template will be used for the list.

Default template for list;

```ejs
{
    "icons": [<% files.forEach(function(file,index) { %>
        "<%= file %>"<% if(index < files.length -1){ %>,<% } %>
    <% }); %>]
}
```

You can create your own list template by setting the first argument to `--list` a path to the template. In that case that template will be used for the list and written in the default destination folder.

## Wishlist

- Add option to automatically cleanup the svg files.
- Add option to remove fills/colors
- Add option for custom template files.

## Contributing

Any help to make this package better is very welcome! So if you like this idea and have a good idea for refactor, update, write better docs or add features. Please feel free to contact me or just make a PR.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**icon-components** © [Sil van Diepen](https://github.com/silvandiepen), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Sil van Diepen with help from contributors ([list](https://github.com/silvandiepen/icon-components/contributors)).

[github.com/silvandiepen](https://github.com/silvandiepen) · GitHub [@Sil van Diepen](https://github.com/silvandiepen) · Twitter [@silvandiepen](https://twitter.com/silvandiepen)
