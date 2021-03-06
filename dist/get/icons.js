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
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const fs = require('fs').promises;
// import SVGO from 'svgo';
const helpers_1 = require("../helpers");
const str_convert_1 = require("str-convert");
const templates_1 = require("./templates");
exports.getFiles = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield exports.getFileList(settings).then((result) => result);
        const templates = yield templates_1.getFileTemplates(settings).then((result) => result);
        return Object.assign(Object.assign({}, settings), { files: files, templates: templates });
    }
    catch (err) {
        console.log(err);
    }
});
const getFileData = (filedata, srcFileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return fs.readFile(path.join(filedata.src, srcFileName)).then((file) => {
            return file.toString();
        });
    }
    catch (err) {
        console.warn(err);
    }
});
/*
  Get A list of all the files and their data.
*/
exports.getFileList = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    let files = yield fs.readdir(settings.src);
    let filelist = [];
    yield helpers_1.asyncForEach(files, (file) => __awaiter(void 0, void 0, void 0, function* () {
        if (path.extname(file) !== '.svg')
            return;
        const fileData = yield getFileData(settings, file).then(helpers_1.svgOnly);
        const fileData__clean_attrs = yield helpers_1.asyncRemoveAttrs(settings.svgOnly ? helpers_1.svgOnly(fileData) : fileData, settings.removeAttrs);
        const fileData__clean_tags = yield helpers_1.asyncRemoveTags(settings.svgOnly ? helpers_1.svgOnly(fileData) : fileData, settings.removeTags);
        const fileData__clean_both = yield helpers_1.asyncRemoveTags(fileData__clean_attrs, settings.removeTags);
        filelist.push({
            og_name: file,
            name: str_convert_1.kebabCase(helpers_1.fileName(file)),
            title: str_convert_1.pascalCase(path.basename(file)),
            title_lowercase: path.basename(file).toLowerCase(),
            fileName: helpers_1.prefixedName(file, settings.prefix),
            componentName: str_convert_1.pascalCase(helpers_1.prefixedName(file, settings.prefix)),
            data: fileData,
            data_clean: {
                attrs: fileData__clean_attrs,
                tags: fileData__clean_tags,
                both: fileData__clean_both
            }
        });
    }));
    return filelist;
});
//# sourceMappingURL=icons.js.map