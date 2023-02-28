---
icon: 🖼️
---

# Templates

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
| style            | returns an object with { data, extension }             |

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
