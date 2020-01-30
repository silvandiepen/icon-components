# Stencil Icon Components

A design system can also incorporate a full set of Icons. Preferably those icons can also be web-components just like the rest of the design system set up using Stencil.

To automatically create the source code for icon web components for a full folder of SVG files, this plugin comes in handy. Just add it to your stencil project and generate the icons.

### Install

```bash
npm install stencil-icon-components
```

Add a command (script) to your package.json to create the components like;

```json
scripts: {
    ...
    "stencil:icons": "stencil-icon-components --src assets/icons --dest src/components/icons",
    ...
}
```

### Options

| option         | description                                                                                                                                                                                                | default                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `--src`        | Source folder with SVG files                                                                                                                                                                               | `/src/assets/icons`     |
| `--dest`       | Destination folder for components                                                                                                                                                                          | `/src/components/icons` |
| `--prefix`     | Add a prefix to all files, ex; social-network.svg becomes icon-social-network                                                                                                                              | `false`                 |
| `--remove-old` | Remove the whole destionation folder as set. In order to be sure to not have any old files and create everything new. Don't set this if your destination folder also includes files which arent generated. | `false`                 |

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

**stencil-icon-components** © [Sil van Diepen](https://github.com/silvandiepen), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Sil van Diepen with help from contributors ([list](https://github.com/silvandiepen/stencil-icon-components/contributors)).

[github.com/silvandiepen](https://github.com/silvandiepen) · GitHub [@Sil van Diepen](https://github.com/silvandiepen) · Twitter [@silvandiepen](https://twitter.com/silvandiepen)
