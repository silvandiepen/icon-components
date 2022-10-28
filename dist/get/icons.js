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
exports.getFileList = exports.getFiles = exports.getData = void 0;
const path_1 = require("path");
const fs = require('fs').promises;
const case_1 = require("@sil/case");
const styles_1 = require("./styles");
const helpers_1 = require("../helpers");
const templates_1 = require("./templates");
const getData = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    settings = yield (0, styles_1.getStyles)(settings);
    settings = yield (0, exports.getFiles)(settings);
    return settings;
});
exports.getData = getData;
const getFiles = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield (0, exports.getFileList)(settings).then((result) => result);
    try {
        const files = yield (0, exports.getFileList)(settings).then((result) => result);
        const templates = yield (0, templates_1.getFileTemplates)(settings).then((result) => result);
        return Object.assign(Object.assign({}, settings), { files: files, templates: templates });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getFiles = getFiles;
const getFileData = (filedata, srcFileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return fs.readFile((0, path_1.join)(filedata.src, srcFileName)).then((file) => {
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
const getFileList = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    let files = yield fs.readdir(settings.src);
    let filelist = [];
    yield (0, helpers_1.asyncForEach)(files, (file) => __awaiter(void 0, void 0, void 0, function* () {
        if ((0, path_1.extname)(file) !== '.svg')
            return;
        const fileData = yield getFileData(settings, file).then(helpers_1.svgOnly);
        const fileData__clean_attrs = yield (0, helpers_1.asyncRemoveAttrs)(settings.svgOnly ? (0, helpers_1.svgOnly)(fileData) : fileData, settings.removeAttrs);
        const fileData__clean_tags = yield (0, helpers_1.asyncRemoveTags)(settings.svgOnly ? (0, helpers_1.svgOnly)(fileData) : fileData, settings.removeTags);
        const fileData__clean_both = yield (0, helpers_1.asyncRemoveTags)(fileData__clean_attrs, settings.removeTags);
        const name = (0, case_1.kebabCase)((0, helpers_1.fileName)(file)).replace(settings.removePrefix, '');
        const style = (0, styles_1.getStyleData)(settings, name, fileData);
        filelist.push({
            og_name: file,
            name,
            title: (0, case_1.PascalCase)((0, path_1.basename)(file)),
            title_lowercase: (0, path_1.basename)(file).toLowerCase(),
            fileName: (0, helpers_1.prefixedName)(file, settings.prefix),
            componentName: (0, case_1.PascalCase)((0, helpers_1.prefixedName)(file, settings.prefix)),
            data: fileData,
            data_clean: {
                attrs: fileData__clean_attrs,
                tags: fileData__clean_tags,
                both: fileData__clean_both
            },
            style
        });
    }));
    return filelist;
});
exports.getFileList = getFileList;
//# sourceMappingURL=icons.js.map