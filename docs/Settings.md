---
icon: ⚙️
---

# Settings

## Base

### src

The source directory for the svg icons

**usage example**

```bash
---src assets/
```

### dest

Destination directory for components

**usage example**

```bash
--dest src/components/icons
```



### template

Choose a template for the icons, or define your own custom template by path

type: `string`
default: ``

**usage example predefined**

```bash
--template vue
```

**usage example custom**

```bash
--template src/icons/templates/component.tsx.template
```

<!--
### templates?: Array<TemplateFileType>;

Choose a predefined template

type: `string`
default: ``

**usage example**

```bash
--template vue
``` -->

## Index

### index

Generate an index file for all components.

type: `boolean`
default: `false`

**usage example**

```bash
--index true
```

### indexTemplate

Specify custom template files for the index.

type: `string[]`
default: `[]`

**usage example**

```bash
--indexTemplate path/to/index.template
```

## List

### list

Generate a list file of all components.

type: `boolean`
default: `false`

**usage example**

```bash
--list true
```

### listTemplate

Specify custom template files for the list.

type: `string[]`
default: `[]`

**usage example**

```bash
--listTemplate path/to/list.template
```

## Types

### types

Generate TypeScript type definitions.

type: `boolean`
default: `false`

**usage example**

```bash
--types true
```

### typesTemplate

Specify custom template files for type definitions.

type: `string[]`
default: `[]`

**usage example**

```bash
--typesTemplate path/to/types.template
```

<!-- ### typesTemplates?: Array<TemplateFileType>; -->

### parentIndex: boolean;

Create a parent index file for every component in it's folder. Will only be generated when `inRoot` is false.

type: `boolean`
default: `false`

**usage example**

```bash
--parentIndex true
```
---

## Options

### optimize

Optimize the SVG

type: `boolean`
default: `false`

**usage example**

```bash
--optimize true
```

### removeOld

Cleans up the folder before creating new icons

type: `boolean`
default: `false`

**usage example**

```bash
--removeOld true
```

### removePrefix:

Files can all have a 'icon-' or any prefix in the filenames, these will automatically be taken over in the icons. You can remove this prefix by setting this.

type: `string`
default: `""`

**usage example**

```bash
--removePrefix 'my-icon-'
```

### inRoot

All components will get their own folder. When you want all icons to be in the base dest folder. Set inRoot to true

type: `boolean`
default: `false`

**usage example**

```bash
--inRoot true
```

### removeTags

Svg's can have certain tags which can be removed automatically.

type: `string | string[]`
default: ``

**usage example**

```bash
--removeTags path, g
```

### removeAttrs

Svg's can have certain attributes which can be removed automatically.

type: `string | string[]`
default: ``

**usage example**

```bash
--removeTags fill, style
```

### svgOnly

Get only the SVG data from a svg file.

type: `boolean`
default: `false`

**usage example**

```bash
--svgOnly true
```

### removeStyle

Remove style attributes from SVG.

type: `boolean`
default: `false`

**usage example**

```bash
--removeStyle true
```

### removeString

Remove a specific string from file names.

type: `string`
default: `""`

**usage example**

```bash
--removeString "unwanted-"
```

### removeAffix

Remove a specific affix from file names.

type: `string`
default: `""`

**usage example**

```bash
--removeAffix "-suffix"
```

### iconFolder

Specify a custom folder name for icons.

type: `string`
default: `""`

**usage example**

```bash
--iconFolder "custom-icons"
```

### filter

Filter icons by name pattern.

type: `string`
default: `""`

**usage example**

```bash
--filter "social-*"
```

<!--
### stripStyle: boolean;

Remove the styles

type: `boolean`
default: `false`

**usage example**

```bash
--stripStyle true
``` -->

### prependLine

Add a line to every generated file

type: `string`
default: `""`

**usage example**

```bash
--prependLine '// This is an automatically generated file, do not modify'
```

### prefix

Add a prefix to every component file

type: `string`
default: `""`

**usage example**

```bash
--prefix 'icon-'
```

<!-- ### styleDir

Get style files to inject into components

type: `string`
default: `""`

**usage example**

```bash
--styleDir src/styles
``` -->

<!-- ### type -->



### copy

Define files to be automatically copied to your destination folder. This can be done, so you can use the removeOld option without losing your files.

type: `string | string[]`
default: ``

**usage example**

```bash
--copy src/somefile.ts src/someotherfile.json
```
