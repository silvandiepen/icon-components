"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileList = exports.getFiles = exports.getData = void 0;
const path_1 = require("path");
const fs = require('fs').promises;
const case_1 = require("@sil/case");
const styles_1 = require("./styles");
const helpers_1 = require("../helpers");
const templates_1 = require("./templates");
const cli_block_1 = require("cli-block");
const getData = async (settings) => {
    settings = await (0, styles_1.getStyles)(settings);
    settings = await (0, exports.getFiles)(settings);
    return settings;
};
exports.getData = getData;
const getFiles = async (settings) => {
    const files = await (0, exports.getFileList)(settings).then((result) => result);
    try {
        const files = await (0, exports.getFileList)(settings).then((result) => result);
        const templates = await (0, templates_1.getFileTemplates)(settings).then((result) => result);
        return { ...settings, files: files, templates: templates };
    }
    catch (err) {
        console.log(err);
    }
};
exports.getFiles = getFiles;
const getFileData = async (filedata, srcFileName) => {
    try {
        return fs.readFile((0, path_1.join)(filedata.src, srcFileName)).then((file) => {
            return file.toString();
        });
    }
    catch (err) {
        console.warn(err);
    }
};
/*
  Get A list of all the files and their data.
*/
const getSizes = (file) => {
    const viewBox = (0, helpers_1.getAttrData)(file, 'viewbox')
        .replace(/[^\d. ]/g, '')
        .split(' ');
    if (viewBox.length !== 4) {
        (0, cli_block_1.blockLineError)('Some file does not have a viewbox');
    }
    return {
        width: parseInt(viewBox[2], 10),
        height: parseInt(viewBox[3], 10)
    };
};
const getFileList = async (settings) => {
    let files = await fs.readdir(settings.src);
    let filelist = [];
    await (0, helpers_1.asyncForEach)(files, async (file) => {
        if ((0, path_1.extname)(file) !== '.svg')
            return;
        const fileData = await getFileData(settings, file).then(helpers_1.svgOnly);
        const fileData__clean_attrs = await (0, helpers_1.asyncRemoveAttrs)(settings.svgOnly ? (0, helpers_1.svgOnly)(fileData) : fileData, settings.removeAttrs);
        const fileData__clean_tags = await (0, helpers_1.asyncRemoveTags)(settings.svgOnly ? (0, helpers_1.svgOnly)(fileData) : fileData, settings.removeTags);
        const fileData__clean_both = await (0, helpers_1.asyncRemoveTags)(fileData__clean_attrs, settings.removeTags);
        const name = (0, case_1.kebabCase)((0, helpers_1.fileName)(file)).replace(settings.removePrefix, '');
        const style = (0, styles_1.getStyleData)(settings, name, fileData);
        const { width, height } = getSizes(fileData);
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
            width,
            height,
            style
        });
    });
    return filelist;
};
exports.getFileList = getFileList;
//# sourceMappingURL=icons.js.map