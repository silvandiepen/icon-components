"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const fs = require('fs').promises;
const ejs_1 = __importDefault(require("ejs"));
const helpers_1 = require("./helpers");
exports.writeList = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    // Set the default template for lists
    let template = path.join(__dirname, '../src/templates/list.json.template');
    // If the there is a template given. Use that.
    if (typeof settings.list == 'string')
        template = settings.list;
    // Define the filelist.
    const files = settings.files.map((file) => (file = {
        data: file.data,
        data_clean: helpers_1.removeAttrs(file.data, ['id', 'fill']),
        data_stripped: helpers_1.removeAttrs(helpers_1.removeTags(file.data, ['svg', 'title']), [
            'id',
            'fill'
        ]),
        name: file.name,
        title: helpers_1.PascalCase(file.name),
        title_lowercase: file.name.toLowerCase(),
        fileName: helpers_1.prefixedName(file.name, settings.prefix),
        componentName: helpers_1.PascalCase(helpers_1.prefixedName(file.name, settings.prefix))
    }));
    // Get the template
    try {
        const stats = yield fs.lstat(template);
        // if (err) console.log(err);
        if (stats.isFile())
            exports.writeListFile(template, files, settings);
        // If the given template is a folder. Just get all files in the folder and compile them.
        if (stats.isDirectory()) {
            const templates = yield fs.readdir(template);
            templates.forEach((file) => {
                exports.writeListFile(path.join(template, file), files, settings);
            });
        }
    }
    catch (err) {
        console.warn(err);
    }
});
exports.writeListFile = (template, files, settings) => __awaiter(void 0, void 0, void 0, function* () {
    fs.readFile(template).then((file) => __awaiter(void 0, void 0, void 0, function* () {
        // Get the template and create the file with our components.
        const contents = ejs_1.default.render(file.toString(), Object.assign({ files: files }, settings));
        // Write the File
        yield fs.writeFile(path.join(settings.dest, path.basename(template.replace('.template', ''))), contents);
    }));
});
//# sourceMappingURL=list.js.map