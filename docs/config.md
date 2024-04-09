# Configuration



## Basic

### src

default: `src/icons`

Your source folder for svg files

accepts: `string`

example:

```bash
npx icon-components --src src/icons
```

### dest

default: `temp/icons`

Your destination folder for the generated components 

accepts: `string`

example:

```bash
npx icon-components --dest temp/icons
```

### inRoot

default: `false`

All files will be added to the root dest folder by default, if you want them to be created in folders you can set this to false.

```bash
# Creates a folder in the dest for each component.
npx icon-components --inRoot false
```

## Alter files


### replace

default: `null`

Replace certain strings in your svg files names, example: remove `-icon` from all names.

```bash
# Removes -icon from each file name
npx icon-components --replace '-icon'
```

### filter

default: `null`

When you don't want all the files to be generated as icons. You can filter the list of icons by a part of the filename.

```bash
# Only uses the file which have -icon in their name
npx icon-components --filter '-icon'
```


## prefix

default: `null`

Add a string to the start of every file component.

```bash
# adds icon- add the start of each file
npx icon-components --prefix 'icon-'
```

## affix

default: `null`

Add a string to the end of every file component.

```bash
# adds -icon on the end of each file
npx icon-components --affix '-icon'
```

### removeTags

default: `[]`

Remove tags from the code of all your svg files. 

```bash
# Removes all style tags from the files
npx icon-components --removeTags style 
```

### removeAttributes
 
default: `[]`

Remove attributes from the code of all your svg files.

```bash
# Removes all fill and stroke attributes from the files
npx icon-components --removeTags fill, stroke 
```

### componentTemplate

default: `src/template/Icon[componentName].js.ejs`

Define your component template file.

```bash
# Creates all the components from the file(s) provided.
npx icon-components --componentTemplate /icons/templates/[componentName].vue.ejs 
```


### listTemplate
default: `["src/template/types.ts.ejs", "src/template/list.json.ejs", "src/template/index.js.ejs", "src/template/allIcons.json.ejs"]`,

Define your template files for lists to be used with the icon data.

```bash
# Creates lists from the templates provided
npx icon-components --listTemplate /icons/templates/index.ts.ejs, /icons/templates/types.ts.ejs, 
```

