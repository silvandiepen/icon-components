import { Settings } from "@/types"


export const defaultSettings: Settings = {
    src: "src/icons",
    dest: "temp/icons",
    inRoot: true,
    replace: "",
    filter: [],
    prefix: "",
    affix: "",
    removeTags: [],
    removeAttributes: [],
    componentTemplate: "src/template/Icon[componentName].js.ejs",
    listTemplate: "src/template/list.json.ejs",
}
