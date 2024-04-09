# Templates


Here a few example templates which can be used to create your components.



### Lists

Generate an index file for your Icons;

```ejs
<% files.forEach(function(file,index) { %>
export * from "<%= file.meta.fileName %>";<% }); 
-%>
```

Generate a basic JSON list with just the icon names;


```ejs
{
    "icons": [<% files.forEach(function(file,index) { %>
        "<%= file.meta.fileName %>"<% if(index < files.length -1){ %>,<% } %>
    <% }); %>]
}
```


Generate a Types Typescript file `types.ts`

```ejs
export const Icons = {
    <% files.forEach(function(file,index) { %>
     <%= constCase(file.meta.fileName) %>: "<%= file.meta.fileName %>"<% if(index < files.length -1){ %>,<% } %>
    <% }); %>
};
```


Generate a JSON file with all svg data; `allIcons.json`
```ejs
{
    "icons": {<% files.forEach(function(file,index) { %>
        "<%= file.meta.fileName %>": {
            "meta": {
                "width": "<%= file.meta %>",
                "height": "<%= file.meta.height %>",
                "viewBox": "<%= file.meta.viewBox %>"
            },
            "style": "<%= removeNewLines(file.style || '') %>",
            "svg": "<%- removeNewLines(escapeQuotes(file.content)) %>"}<% if(index < files.length -1){ %>,<% } %>
    <% }); %>}
}
```
