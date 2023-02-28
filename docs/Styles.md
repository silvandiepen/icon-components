---
icon: 🎨
---

# Styles

The style attribute will automatically be stripped from the svg data, but it will be passed back as an option in the template.

```js
{
    data: "[css from style tag]",
    extension: "css"
}
```

### External style

You can also define external style file to be automatically get picked up and get passed in the style attribute from the template. This creates the ability to not touch your svg file and add external css animations or styling without overriding svg from exports without the styling.

Accepted style files: `.css`, `.scss`, `.sass`, `.less`, `.stylus`. The data from thes style attribute and data from the style file will be merged and passed back as template data.

::: warn
Style attribute data is usually valid css, sass, stylus and less (partially) files do not parse css. Make sure your file does not have inner style.
:::

Style from style files can be added by adding the style file in the same directory with the same name as the .svg file.

You can alter the directory where style files can be found by defining the `styleDir` in your arguments.
